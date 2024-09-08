import prisma from '@/prisma';
import { HttpException } from '@/exceptions/http.exception';
import userAction from './user.action';
import { genSalt, hash, compare } from 'bcrypt';
import { sendVerificationEmail } from '@/utils/emailUtil';
import { generateToken } from '@/utils/tokenUtil';
import { WorkerType } from '@/types/workerType.enum';

interface JwtPayload {
  user_id: number;
  email: string;
}

interface CreateAgentInput {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  role_id: number;
  outlet_id?: number;
  worker_type?: WorkerType; // Enum yang sudah didefinisikan
}

class AuthAction {
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

  activateUserEmail = async (req: any) => {
    try {
      const { user_id } = req.user as JwtPayload;

      // checking user apakah udah verified
      const user = await prisma.user.findUnique({
        where: { user_id: user_id },
      });

      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      if (user.is_verified) {
        return { message: 'Email has already been verified' };
      }

      // Update status kalau blm verified
      const updatedUser = await prisma.user.update({
        where: { user_id: user_id },
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

      const accessPayload = {
        user_id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        avatarFilename: user.avatarFilename,
        isVerified: user.is_verified,
      };

      const refreshPayload = {
        email: user.email,
      };

      const accessToken = generateToken(
        accessPayload,
        '1h',
        String(process.env.API_KEY),
      );

      const refreshToken = generateToken(
        refreshPayload,
        '7d',
        String(process.env.API_KEY),
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  };

  refreshTokenAction = async (email: string) => {
    console.log('Request hit verifyRefreshToken middleware');
    try {
      const user = await prisma.user.findFirst({ where: { email } });

      if (!user) throw new HttpException(500, 'Something went wrong');

      const accessPayload = {
        user_id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        avatarFilename: user.avatarFilename,
        isVerified: user.is_verified,
      };

      const accessToken = generateToken(
        accessPayload,
        '1h',
        String(process.env.API_KEY),
      );
      const refreshToken = generateToken(
        accessPayload,
        '7d',
        String(process.env.API_KEY),
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
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

  setPassword = async (user_id: number, password: string) => {
    try {
      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);

      const updatedUser = await prisma.user.update({
        where: { user_id: user_id },
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

  changePasswordAction = async (
    user_id: number,
    oldPassword: string,
    newPassword: string,
  ) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) {
        throw new HttpException(404, 'User not found');
      }

      // Verifikasi apakah oldPassword cocok dengan password yang tersimpan
      if (!user.password) {
        throw new HttpException(400, 'Password is missing or invalid');
      }

      const isOldPasswordValid = await compare(oldPassword, user.password);
      if (!isOldPasswordValid) {
        throw new HttpException(400, 'Old password is incorrect');
      }

      // Hashing newPassword
      const salt = await genSalt(10);
      const hashedNewPassword = await hash(newPassword, salt);

      // Update password user
      const updatedUser = await prisma.user.update({
        where: { user_id },
        data: { password: hashedNewPassword },
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        500,
        `Error changing password: ${(error as Error).message}`,
      );
    }
  };

  // ======================================== NON-USER ACTION ========================================

  // action untuk membuat Agent baru (worker, admin, driver)
  createAgent = async ({
    username,
    password,
    first_name,
    last_name,
    phone_number,
    role_id,
    outlet_id,
    worker_type,
  }: CreateAgentInput) => {
    const WORKER_ROLE_ID = 1; // Sesuaikan dengan ID role worker di database
    const ADMIN_ROLE_ID = 2; // Sesuaikan dengan ID role admin di database
    const DRIVER_ROLE_ID = 3; // Sesuaikan dengan ID role driver di database

    try {
      // cek apakah username sudah terdaftar
      const existingAgent = await prisma.agent.findUnique({
        where: { username },
      });

      if (existingAgent) {
        throw new HttpException(400, 'Username is already taken');
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const data: {
        username: string;
        password: string;
        first_name: string;
        last_name: string;
        phone_number: string | undefined;
        role: { connect: { role_id: number } };
        worker_type: WorkerType | undefined;
        outlet_worker?: { connect: { outlet_id: number } };
        outlet_admin?: { connect: { outlet_id: number } };
        outlet_driver?: { connect: { outlet_id: number } };
      } = {
        username,
        password: hashedPassword,
        first_name,
        last_name,
        phone_number,
        role: { connect: { role_id } },
        worker_type: worker_type ?? undefined,
      };

      // Hubungkan dengan outlet sesuai peran
      if (role_id === WORKER_ROLE_ID && outlet_id) {
        data['outlet_worker'] = { connect: { outlet_id } }; // Worker relasi
      } else if (role_id === ADMIN_ROLE_ID && outlet_id) {
        data['outlet_admin'] = { connect: { outlet_id } }; // Admin relasi
      } else if (role_id === DRIVER_ROLE_ID && outlet_id) {
        data['outlet_driver'] = { connect: { outlet_id } }; // Driver relasi
      }

      const newAgent = await prisma.agent.create({
        data,
        include: {
          role: true,
        },
      });

      return newAgent;
    } catch (error) {
      throw error;
    }
  };

  // action untuk login agent
  loginAgent = async (username: string, password: string) => {
    try {
      // Cek apakah username ada di database
      const agent = await prisma.agent.findUnique({
        where: { username },
        include: { role: true },
      });

      if (!agent) {
        throw new HttpException(400, 'Invalid username or password');
      }

      // Cek apakah password cocok
      const isPasswordValid = await compare(password, agent.password);
      if (!isPasswordValid) {
        throw new HttpException(400, 'Invalid username or password');
      }

      // Buat token JWT
      const accessToken = generateToken(
        {
          agent_id: agent.agent_id,
          username: agent.username,
          role: agent.role.name,
        },
        '7h',
        String(process.env.API_KEY),
      );

      return {
        message: 'Login successful',
        accessToken,
        agent: {
          agent_id: agent.agent_id,
          username: agent.username,
          role: agent.role.name,
        },
      };
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthAction();
