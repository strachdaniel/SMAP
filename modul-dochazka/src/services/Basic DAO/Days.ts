import { PrismaClient, day as Day } from "@prisma/client";

const prisma = new PrismaClient();

export class DaysDAO {
  async create(data: Day): Promise<Day> {
    return await prisma.day.create({ data: data });
  }

  async findById(id: number): Promise<Day | null> {
    return await prisma.day.findUnique({
      where: { day_id: id },
    });
  }

  async findAll(): Promise<Day[]> {
    return await prisma.day.findMany();
  }

  async update(id: number, day: Day): Promise<Day | null> {
    return await prisma.day.update({
      where: { day_id: id },
      data: day,
    });
  }

  async delete(id: number): Promise<Day | null> {
    return await prisma.day.delete({
      where: { day_id: id },
    });
  }
}
