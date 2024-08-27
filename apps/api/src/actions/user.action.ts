import prisma from '@/prisma';

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
}

export default new UserAction();
