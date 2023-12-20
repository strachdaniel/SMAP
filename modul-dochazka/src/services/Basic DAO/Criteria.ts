import {
  PrismaClient,
  criteria as Criteria,
  contract as contract,
} from "@prisma/client";

const prisma = new PrismaClient();

export class CriteriaDAO {
  async create(data: Criteria): Promise<Criteria> {
    return await prisma.criteria.create({ data: data });
  }

  async findById(id: number): Promise<Criteria | null> {
    return await prisma.criteria.findUnique({
      where: { criteria_id: id },
    });
  }

  async findAll(): Promise<Criteria[]> {
    return await prisma.criteria.findMany();
  }

  async update(id: number, day: Criteria): Promise<Criteria | null> {
    return await prisma.criteria.update({
      where: { criteria_id: id },
      data: day,
    });
  }

  async delete(id: number): Promise<Criteria | null> {
    return await prisma.criteria.delete({
      where: { criteria_id: id },
    });
  }

  async findByEmployeeCategory(id: number): Promise<Criteria[]> {
    return await prisma.criteria.findMany({
      where: { employee_category_id: id },
    });
  }
}
