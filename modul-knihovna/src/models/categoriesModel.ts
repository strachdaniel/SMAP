import { PrismaClient, Prisma, Category } from '@prisma/client';

const prisma = new PrismaClient();

export interface CategoryFilter {
  name?: string;
}

export const getCategories = async (filter?: CategoryFilter): Promise<Category[]> => {
  return await prisma.category.findMany({ where: filter });
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  return await prisma.category.findUnique({ where: { category_id: id } });
};

export const createCategory = async (categoryData: Prisma.CategoryCreateInput): Promise<Category> => {
  return await prisma.category.create({ data: categoryData });
};

export const updateCategory = async (
  id: number,
  categoryData: Prisma.CategoryUpdateInput
): Promise<Category | null> => {
  return await prisma.category.update({ where: { category_id: id }, data: categoryData });
};

export const deleteCategory = async (id: number): Promise<Category | null> => {
  return await prisma.category.delete({ where: { category_id: id } });
};
