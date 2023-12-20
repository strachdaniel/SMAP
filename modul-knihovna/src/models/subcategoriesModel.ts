import { PrismaClient, Prisma, Subcategory } from '@prisma/client';

const prisma = new PrismaClient();

export interface SubcategoryFilter {
  subcategory_id?: number;
  name?: string;
  description?: string;
}

export const getSubcategories = async (filter?: SubcategoryFilter): Promise<Subcategory[]> => {
  return await prisma.subcategory.findMany({ where: filter });
};

export const getSubcategoryById = async (id: number): Promise<Subcategory | null> => {
  return await prisma.subcategory.findUnique({ where: { subcategory_id: id } });
};

export const createSubcategory = async (
  subcategoryData: Prisma.SubcategoryCreateInput
): Promise<Subcategory> => {
  return await prisma.subcategory.create({ data: subcategoryData });
};

export const updateSubcategory = async (
  id: number,
  subcategoryData: Prisma.SubcategoryUpdateInput
): Promise<Subcategory | null> => {
  return await prisma.subcategory.update({ where: { subcategory_id: id }, data: subcategoryData });
};

export const deleteSubcategory = async (id: number): Promise<Subcategory | null> => {
  return await prisma.subcategory.delete({ where: { subcategory_id: id } });
};
