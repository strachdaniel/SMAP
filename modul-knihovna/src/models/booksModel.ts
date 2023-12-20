import { PrismaClient, Prisma, Book } from '@prisma/client';

const prisma = new PrismaClient();

export interface BookFilter {
  isbn?: string;
  title?: string;
  author?: string;
  category_id?: number;
  subcategory_id?: number;
  offset?: number;
  limit?: number;
}

export const getBooks = async (filter?: BookFilter): Promise<Book[]> => {
  const where: Prisma.BookWhereInput = {
    isbn: filter?.isbn ? { contains: filter.isbn } : undefined,
    title: filter?.title ? { contains: filter.title } : undefined,
    author: filter?.author ? { contains: filter.author } : undefined,
    category_id: filter?.category_id,
    subcategory_id: filter?.subcategory_id,
  };

  return await prisma.book.findMany({ where, skip: filter?.offset, take: filter?.limit });
};

export const getBooksByIsbn = async (isbn: string): Promise<Book[]> => {
  return await prisma.book.findMany({ where: { isbn } });
};

export const getBookById = async (id: number): Promise<Book | null> => {
  return await prisma.book.findUnique({ where: { book_id: id } });
};

export const createBook = async (bookData: Prisma.BookCreateInput): Promise<Book> => {
  return await prisma.book.create({ data: bookData });
};

export const updateBook = async (
  id: number,
  bookData: Prisma.BookUpdateInput
): Promise<Book | null> => {
  return await prisma.book.update({ where: { book_id: id }, data: bookData });
};

export const deleteBook = async (id: number): Promise<Book | null> => {
  return await prisma.book.delete({ where: { book_id: id } });
};
