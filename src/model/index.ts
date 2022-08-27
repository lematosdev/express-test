import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createProfile = async (
  payload: Prisma.ProfileCreateInput
) => {
  return await prisma.profile.create({
    data: Prisma.validator<Prisma.ProfileCreateInput>()(
      payload
    )
  });
};

export const createUser = async (
  user: Prisma.UserCreateInput
) => {
  return await prisma.user.create({
    data: Prisma.validator<Prisma.UserCreateInput>()(user)
  });
};

export const editProfile = async (
  id: string,
  payload: Prisma.ProfileUpdateInput
) => {
  return await prisma.profile.update({
    where: Prisma.validator<Prisma.ProfileWhereInput>()({
      id
    }),
    data: payload
  });
};

export const deleteProfile = async (id: string) => {
  return await prisma.profile.delete({
    where: Prisma.validator<Prisma.ProfileWhereInput>()({
      id
    })
  });
};

export const findByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: Prisma.validator<Prisma.UserWhereInput>()({
      username
    })
  });
};

export const findProfileByUserId = async (
  userId: string
) => {
  return await prisma.profile.findUnique({
    where: Prisma.validator<Prisma.ProfileWhereInput>()({
      userId
    })
  });
};
