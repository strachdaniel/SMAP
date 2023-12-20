import { PrismaClient, Prisma, PairedCategory } from '@prisma/client';

const prisma = new PrismaClient();

export interface PairedCategoryFilter {
  category_id?: number;
  subcategory_id?: number;
}

export const getPairedCategories = async (
  filter?: PairedCategoryFilter
): Promise<PairedCategory[]> => {
  return await prisma.pairedCategory.findMany({ where: filter });
};

export const getPairedCategoryById = async (id: number): Promise<PairedCategory | null> => {
  return await prisma.pairedCategory.findUnique({ where: { paired_category_id: id } });
};

export const createPairedCategory = async (
  pairedCategoryData: Prisma.PairedCategoryCreateInput
): Promise<PairedCategory> => {
    return await prisma.pairedCategory.create({ data: pairedCategoryData });
};

export const updatePairedCategory = async (
  id: number,
  pairedCategoryData: Prisma.PairedCategoryUpdateInput
): Promise<PairedCategory | null> => {
  return await prisma.pairedCategory.update({ where: { paired_category_id: id }, data: pairedCategoryData });
};

export const deletePairedCategory = async (id: number): Promise<PairedCategory | null> => {
  return await prisma.pairedCategory.delete({ where: { paired_category_id: id } });
};

