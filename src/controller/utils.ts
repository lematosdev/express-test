import jwt, { JwtPayload } from 'jsonwebtoken';

export const secret = process.env.SECRET || 'example';

export const validateToken = (bearerToken: string) => {
  const token = bearerToken.split(' ')[1];
  try {
    const {
      data: { id }
    } = jwt.verify(token, secret) as JwtPayload;

    return id;
  } catch (_) {
    throw {
      error: true,
      message: 'Invalid token'
    };
  }
};
