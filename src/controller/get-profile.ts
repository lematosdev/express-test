import { Request, Response } from 'express';
import { findProfileByUserId } from '../model';
import { validateToken } from './utils';


export const getProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const id = validateToken(req.headers.authorization!);
    const profile = await findProfileByUserId(id);

    if (!profile) {
      return res.status(404).send({
        error: true,
        message: 'Profile not found'
      });
    }

    return res.json({
      error: false,
      message: 'Success',
      data: profile
    });
  } catch (e) {
    return res.json(e);
  }
};
