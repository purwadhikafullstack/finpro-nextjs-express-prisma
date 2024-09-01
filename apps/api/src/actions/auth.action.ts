import prisma from '@/prisma';
import { HttpException } from '@/exceptions/http.exception';
import userAction from './user.action';
import { genSalt, hash, compare } from 'bcrypt';
import { sendVerificationEmail } from '@/utils/emailUtil';
import { generateToken } from '@/utils/tokenUtil';

interface JwtPayload {
  userId: number;
  email: string;
}

class AuthAction {
  registerAction = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    avatarFilename: string,
  ) => {
    try {
      const isEmailRegisterd = await userAction.findUserByEmail(email);

      if (isEmailRegisterd)
        throw new HttpException(500, 'Email is already registered');

      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);

      const newUser = await prisma.$transaction(async (transaction: any) => {
        return await transaction.user.create({
          data: {
            email,
            password: hashedPass,
            first_name,
            last_name,
            phone_number,
            avatarFilename,
          },
        });
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  loginAction = async (email: string, password: string) => {
    try {
      const user = await prisma.user.findFirst({
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          password: true,
          phone_number: true,
          avatarFilename: true,
          is_verified: true,
        },

        where: {
          email,
        },
      });

      if (!user) throw new HttpException(500, 'Incorrect email or password');

      // Check if the user is verified
      if (!user.is_verified) {
        throw new HttpException(
          400,
          'Please verify your email before logging in',
        );
      }

      const isPassValid = await compare(password, user.password || '');
      if (!isPassValid)
        throw new HttpException(500, 'Incorrect email or password');

      const payload = {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        avatarFilename: user.avatarFilename,
        isVerified: user.is_verified,
      };

      const accessToken = generateToken(
        payload,
        '2h',
        String(process.env.API_KEY),
      );

      return accessToken;
    } catch (error) {
      throw error;
    }
  };

  refreshTokenAction = async (email: string) => {
    try {
      const user = await prisma.user.findFirst({
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          password: true,
          phone_number: true,
          avatarFilename: true,
          is_verified: true,
        },

        where: {
          email,
        },
      });

      if (!user) throw new HttpException(500, 'Incorrect email or password');

      const payload = {
        userId: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        avatarFilename: user.avatarFilename,
        isVerified: user.is_verified,
      };

      const refreshToken = generateToken(
        payload,
        '2h',
        String(process.env.API_KEY),
      );

      return refreshToken;
    } catch (error) {
      throw error;
    }
  };

  activateUserEmail = async (req: any) => {
    try {
      const { userId } = req.user as JwtPayload;

      // checking user apakah udah verified
      const user = await prisma.user.findUnique({
        where: { user_id: userId },
      });

      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      if (user.is_verified) {
        return { message: 'Email has already been verified' };
      }

      // Update status kalau blm verified
      const updatedUser = await prisma.user.update({
        where: { user_id: userId },
        data: { is_verified: true },
      });

      return { user: updatedUser };
    } catch (error) {
      throw new HttpException(
        500,
        `Error during email verification: ${(error as Error).message}`,
      );
    }
  };

  resendVerificationEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      if (user.is_verified) {
        throw new HttpException(400, 'User is already verified');
      }

      await sendVerificationEmail(user);
    } catch (error) {
      throw new HttpException(
        500,
        `Error resending verification email: ${(error as Error).message}`,
      );
    }
  };

  registerWithEmailAction = async (
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
  ) => {
    try {
      const isEmailRegisterd = await userAction.findUserByEmail(email);

      if (isEmailRegisterd)
        throw new HttpException(500, 'Email is already registered');

      const newUser = await prisma.$transaction(async (transaction: any) => {
        return await transaction.user.create({
          data: {
            email,
            first_name,
            last_name,
            phone_number,
            is_verified: false,
          },
        });
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  setPassword = async (userId: number, password: string) => {
    try {
      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);

      const updatedUser = await prisma.user.update({
        where: { user_id: userId },
        data: { password: hashedPass },
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        500,
        `Error setting password: ${(error as Error).message}`,
      );
    }
  };
}

export default new AuthAction();
