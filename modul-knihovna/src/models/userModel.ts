// import { PrismaClient, Prisma, User } from '@prisma/client';

// const prisma = new PrismaClient();

// interface UserFilter {
//   email?: string;
//   name?: string;
// }

// export const getUsers = async (filter?: UserFilter): Promise<User[]> => {
//     return await prisma.user.findMany({ where: filter });
// };

// export const getUserById = async (id: number): Promise<User | null> => {
//   return await prisma.user.findUnique({ where: { user_id: id } });
// };

// export const createUser = async (userData: Prisma.UserCreateInput): Promise<User> => {
//   return await prisma.user.create({ data: userData });
// };

// export const updateUser = async (
//   id: number,
//   userData: Prisma.UserUpdateInput
// ): Promise<User | null> => {
//   return await prisma.user.update({ where: { user_id: id }, data: userData });
// };

// export const deleteUser = async (id: number): Promise<User | null> => {
//   return await prisma.user.delete({ where: { user_id: id } });
// };

