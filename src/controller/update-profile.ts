import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { editProfile, findProfileByUserId } from '../model';
import { validateToken } from './utils';

export const updateProfileController = async (
  req: Request,
  res: Response
) => {
  const id = validateToken(req.headers.authorization!);
  const updateProfile =
    req.body as Prisma.ProfileUpdateInput;

  if (!Object.keys(updateProfile).length)
    return res.json({
      error: true,
      message: 'Body not found'
    });

  const profile = await findProfileByUserId(id);

  if (!profile)
    return res.json({
      error: true,
      message: 'Not profile found for this user'
    });

  try {
    const updated = await editProfile(
      profile.id,
      updateProfile
    );

    return res.json({
      error: false,
      message: 'Success',
      data: updated
    });
  } catch (e) {
    return res.json({
      error: true,
      message: 'Failed',
      data: e
    });
  }
};
