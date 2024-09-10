import { comparePasswords, generateAccessToken, generateHash, generateRefreshToken } from '@/utils/encryption';

import ApiError from '@/utils/api.error';
import EmailAction from '@/actions/email.action';
import prisma from '@/libs/prisma';

export default class AuthAction {
  private emailAction: EmailAction;

  constructor() {
    this.emailAction = new EmailAction();
  }

  login = async (email: string, password: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new ApiError(400, 'Invalid email or password');
      if (!user.password || !user.is_verified) throw new ApiError(400, 'Please verify your email, to login');

      const valid = await comparePasswords(password, user.password);
      if (!valid) throw new ApiError(400, 'Invalid email or password');

      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      });

      const refresh_token = generateRefreshToken({
        user_id: user.user_id,
        email: user.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  };

  profile = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      return user;
    } catch (error) {
      throw error;
    }
  };

  register = async (email: string, fullname: string, phone: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) throw new ApiError(400, 'Email already exists');

      const created = await prisma.user.create({
        data: {
          email,
          fullname,
          phone,
        },
      });

      await this.emailAction.sendVerificationEmail(created);
    } catch (error) {
      throw error;
    }
  };

  verify = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });
      if (!user) throw new ApiError(404, 'User not found');

      user.is_verified = true;
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { is_verified: true },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  setPassword = async (user_id: string, password: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      const hashed = await generateHash(password);
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { password: hashed },
      });

      await prisma.customer.create({
        data: {
          User: {
            connect: {
              user_id: user.user_id,
            },
          },
        },
      });

      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      });

      const refresh_token = generateRefreshToken({
        user_id: user.user_id,
        email: user.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  };

  refresh = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      });

      const refresh_token = generateRefreshToken({
        user_id: user.user_id,
        email: user.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
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
        String(process.env.API_KEY)
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
