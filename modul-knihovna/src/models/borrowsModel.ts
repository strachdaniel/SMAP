import { PrismaClient, Prisma, Borrow } from '@prisma/client';

const prisma = new PrismaClient();

export interface BorrowFilter {
  reader_id?: number;
  book_id?: number;
  returned_before?: string;
  returned_after?: string;
  returned_at?: string;
  offset?: number;
  limit?: number;
}

export const getBorrows = async (filter?: BorrowFilter): Promise<Borrow[]> => {
  const where: Prisma.BorrowWhereInput = {
    reader_id: filter?.reader_id,
    book_id: filter?.book_id,
    returned_at: {
      ...(filter?.returned_before && {
        lte: filter.returned_before,
      }),
      ...(filter?.returned_after && {
        gte: filter.returned_after,
      }),
      ...(filter?.returned_at && {
        equals: filter.returned_at,
      }),
    },
  };

  return await prisma.borrow.findMany({
    where,
    skip: filter?.offset,
    take: filter?.limit,
  });
};

export const getBorrowById = async (id: number): Promise<Borrow | null> => {
  return await prisma.borrow.findUnique({ where: { borrow_id: id } });
};

export const createBorrow = async (
  borrowData: Prisma.BorrowCreateInput
): Promise<Borrow> => {
  return await prisma.borrow.create({ data: borrowData });
};

export const updateBorrow = async (
  id: number,
  borrowData: Prisma.BorrowUpdateInput
): Promise<Borrow | null> => {
  return await prisma.borrow.update({
    where: { borrow_id: id },
    data: borrowData,
  });
};

export const deleteBorrow = async (id: number): Promise<Borrow | null> => {
  return await prisma.borrow.delete({ where: { borrow_id: id } });
};

export const returnBorrow = async (id: number): Promise<Borrow | null> => {
  return await prisma.borrow.update({
    where: { borrow_id: id },
    data: { returned_at: new Date() },
  });
};
