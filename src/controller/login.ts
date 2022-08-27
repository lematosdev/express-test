import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { findByUsername } from '../model';
import jwt from 'jsonwebtoken';
import { secret } from './utils';

export const logIn = async (
  req: Request,
  res: Response
) => {
  const user = req.body as Prisma.UserCreateInput;

  if (!user.password)
    return res.json({
      error: true,
      message: 'Password can not be empty'
    });
  if (!user.username)
    return res.json({
      error: true,
      message: 'Username can not be empty'
    });

  const dbUser = await findByUsername(user.username);

  if (!dbUser)
    return res.json({
      error: true,
      message: 'User not found'
    });

  const validPassword = bcrypt.compareSync(
    user.password,
    dbUser.password
  );

  if (!validPassword)
    return res.json({
      error: true,
      message: 'Password is invalid'
    });

  const token = jwt.sign(
    {
      data: {
        id: dbUser.id
      }
    },
    secret
  );

  res.json({
    error: false,
    message: 'Successfully logged in',
    data: { token }
  });
};
