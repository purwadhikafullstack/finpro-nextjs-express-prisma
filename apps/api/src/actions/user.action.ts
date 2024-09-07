import prisma from '@/prisma';
import { sendVerificationEmail } from '@/utils/emailUtil';

class UserAction {
  findUserByEmail = async (email: string) => {
    if (!email) throw new Error('Email must be provided');

    try {
      const user = await prisma.user.findFirst({
        select: {
          user_id: true,
          email: true,
        },

        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  findUsers = async () => {
    try {
      const users = await prisma.user.findMany();

      return users;
    } catch (error) {
      throw error;
    }
  };

  // for self profile only. consume id from jwt then return user profile
  findSelfById = async (user_id: number) => {
    try {
      const user = await prisma.user.findUnique({
        // apa aja yang mau ditampilin untuk user profile
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          phone_number: true,
          avatarFilename: true,
          is_verified: true,
        },
        where: {
          user_id: user_id,
        },
      });

      if (!user) throw new Error('User not found!');

      const payload = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        avatarFilename: user.avatarFilename,
        is_verified: user.is_verified,
      };

      return payload;
    } catch (error) {
      throw error;
    }
  };

  //for self update only! consume id from jwt, data from req.body (each one are optional) then return user data
  updateSelfById = async ({
    user_id,
    first_name,
    last_name,
    phone_number,
    email,
    avatarFilename,
  }: {
    user_id: number;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    avatarFilename?: string;
  }) => {
    try {
      // check if the user id is valid
      const check = await this.findSelfById(user_id);
      if (!check) throw new Error('User not found');

      // fields for email update
      let fields = {};

      // check if the email is taken, add to fields if available
      if (email) {
        const checkEmail = await this.findUserByEmail(email);

        if (checkEmail) throw new Error('Email is already registered');

        fields = { ...fields, email };
      }

      // profile object for firstname, lastname, phone, and avatarFilename
      let profile = {};

      // check if each fields is defined then add to profile object
      if (first_name) profile = { ...profile, first_name };
      if (last_name) profile = { ...profile, last_name };
      if (phone_number) profile = { ...profile, phone_number };
      if (avatarFilename) profile = { ...profile, avatarFilename };

      // update user and profile table
      const result = await prisma.$transaction(async (transaction: any) => {
        const user = await transaction.user.update({
          select: {
            user_id: true,
            first_name: true,
            last_name: true,
            phone_number: true,
            email: true,
            avatarFilename: true,
            updated_at: true,
            is_verified: true,
          },
          where: {
            user_id,
          },
          data: {
            ...fields,
            ...profile,
          },
        });

        // if email updated, update isVerified to false and resend email verification
        if (email) {
          await transaction.user.update({
            where: {
              user_id,
            },
            data: {
              is_verified: false,
            },
          });
          await sendVerificationEmail(user);
        }
        return user;
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserAction();
