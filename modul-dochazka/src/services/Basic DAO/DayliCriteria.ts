import { PrismaClient, dayli_criteria as DayliCriteria } from "@prisma/client";

const prisma = new PrismaClient();

export class DayliCriteriaDAO {
  async create(data: DayliCriteria): Promise<DayliCriteria> {
    return await prisma.dayli_criteria.create({ data: data });
  }

  async findById(id: number): Promise<DayliCriteria | null> {
    return await prisma.dayli_criteria.findUnique({
      where: {
        dayli_criteria_id: id,
      },
    });
  }

  async findAll(): Promise<DayliCriteria[]> {
    return await prisma.dayli_criteria.findMany();
  }

  async update(id: number, day: DayliCriteria): Promise<DayliCriteria | null> {
    return await prisma.dayli_criteria.update({
      where: { dayli_criteria_id: id },
      data: day,
    });
  }

  async delete(id: number): Promise<DayliCriteria | null> {
    return await prisma.dayli_criteria.delete({
      where: { dayli_criteria_id: id },
    });
  }

  async findByDayId(id: number): Promise<DayliCriteria[]> {
    return await prisma.dayli_criteria.findMany({
      where: {
        day_id: id,
      },
      include: {
        criteria: true,
      },
    });
  }
}
