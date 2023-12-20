import { PrismaClient, Prisma, Reader } from '@prisma/client';

const prisma = new PrismaClient();

export interface ReaderFilter {
  reader_id?: number;
  user_id?: number;
}

export const getReaders = async (filter?: ReaderFilter): Promise<Reader[]> => {
  return await prisma.reader.findMany({ where: filter });
};

export const getReaderById = async (id: number): Promise<Reader | null> => {
  return await prisma.reader.findUnique({ where: { reader_id: id } });
};

export const createReader = async (readerData: Prisma.ReaderCreateInput): Promise<Reader> => {
  return await prisma.reader.create({ data: readerData });
};

export const updateReader = async (
  id: number,
  readerData: Prisma.ReaderUpdateInput
): Promise<Reader | null> => {
  return await prisma.reader.update({ where: { reader_id: id }, data: readerData });
};

export const deleteReader = async (id: number): Promise<Reader | null> => {
  return await prisma.reader.delete({ where: { reader_id: id } });
};
