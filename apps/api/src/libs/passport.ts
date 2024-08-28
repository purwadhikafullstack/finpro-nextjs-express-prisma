import passport, { Profile } from 'passport';
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import prisma from '@/prisma';
import { sendEmail, sendVerificationEmail } from '@/utils/emailUtil';

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: (err: any, user?: any) => void) => {
  done(null, obj);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BE_BASE_URL}/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        const email = profile.emails?.[0]?.value || '';
        if (!email) {
          return done(new Error('No email found in Google profile'), undefined);
        }

        const user = await prisma.user.upsert({
          where: { email },
          update: { googleId: profile.id },
          create: {
            email,
            first_name: profile.name?.givenName || '',
            last_name: profile.name?.familyName || '',
            googleId: profile.id,
          },
        });

        // To ensure the email is only sent once
        if (!user.is_verified) {
          await sendVerificationEmail(user);
        }

        return done(undefined, user);
      } catch (error) {
        return done(error, undefined);
      }
    },
  ),
);

export default passport;
