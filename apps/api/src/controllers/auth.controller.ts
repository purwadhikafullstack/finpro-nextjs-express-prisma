import { NextFunction, Request, Response } from 'express';
import { prisma } from '@/connections/prisma.connections';
import { comparePassword } from '@/helper/hashPassword';
import { createToken } from '@/helper/jwtToken';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // Check user
    if (!user) {
      throw { message: 'Invalid Email', status: 401 };
    }

    // Compare hashed password
    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw { message: 'Invalid Password', status: 401 };
    }

    // Create Token
    const token = createToken({userId: user.id, userRole: user.roleId})

    res.status(201).send({
        error: false,
        message: 'Login Successful',
        data: {
            user,
            token
        }
    })
  } catch (error) {
    next(error)
  }
};
