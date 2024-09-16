import { BACKEND_URL, FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@/config';

import ApiError from '@/utils/error.util';
import EmailAction from '@/actions/email.action';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import prisma from '@/prisma';

const emailAction = new EmailAction();

export const options = {
  scope: ['profile', 'email'],
  session: false,
};

class PassportConfig {
  initialize = () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: `${BACKEND_URL}/api/v1/auth/google/callback`,
          scope: ['email', 'profile'],
        },
        async (accessToken, refreshToken, profile, cb) => {
          try {
            const { id, emails, photos, displayName } = profile;

            const email = emails && emails.length > 0 ? emails[0].value : undefined;
            const avatar_url = photos && photos.length > 0 ? photos[0].value : undefined;
            if (email === undefined) throw new ApiError(400, 'Email not found on Google account');

            const user = await prisma.user.findUnique({
              where: { email },
            });

            if (!user) {
              const upsert = await prisma.user.upsert({
                where: { email },
                update: { google_id: id },
                create: {
                  email,
                  avatar_url,
                  google_id: id,
                  fullname: displayName,
                },
              });

              await emailAction.sendVerificationEmail(upsert);
              return cb(null, upsert);
            }

            if (!user.is_verified) await emailAction.sendVerificationEmail(user);
            return cb(null, user);
          } catch (error) {
            return cb(error);
          }
        }
      )
    );

    passport.serializeUser(function (user, cb) {
      process.nextTick(function () {
        cb(null, user);
      });
    });

    passport.deserializeUser(function (user, cb) {
      process.nextTick(function () {
        return cb(null, user as any);
      });
    });
  };
}

export default PassportConfig;
