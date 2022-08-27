import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { createProfile } from '../model';
import { validateToken } from './utils';

export const createProfileController = async (
  req: Request,
  res: Response
) => {
  const profile = req.body as Prisma.ProfileCreateInput;

  if (!Object.keys(profile).length) {
    return res.status(404).json({
      error: true,
      message: 'Body not found'
    });
  }

  if (!profile.dni) {
    return res.json({
      error: true,
      message: 'Please provide your DNI'
    });
  }
  try {
    const id = validateToken(req.headers.authorization!);

    const created = await createProfile({
      age: profile.age,
      dni: Number(profile.dni),
      fullName: profile.fullName,
      birthDate: profile.birthDate,
      gender: profile.gender,
      user: { connect: { id } }
    });

    return res.json({
      error: false,
      message: 'Success',
      data: created
    });
  } catch (e) {
    return res.json(e);
  }
};
