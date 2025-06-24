import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

export const createUser = (data: { name: string; phone: string }) => {
  return prisma.user.create({ data });
};

export const findAllUsers = () => {
  return prisma.user.findMany();
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const removeUser = (id: number) => {
  return prisma.user.delete({ where: { id } });
};

export const modifyUser = (id: number, data: { name?: string; phone?: string }) => {
  return prisma.user.update({ where: { id }, data });
};

export const findUserByNameAndPhone = (name: string, phone: string) => {
  return prisma.user.findFirst({
    where: {
      name,
      phone,
    },
  });
};
