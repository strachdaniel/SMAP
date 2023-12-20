import {
  PrismaClient,
  employment_type as EmploymentType,
} from "@prisma/client";

const prisma = new PrismaClient();

export default class EmployementTypeDAO {
  static async create(employmentType: EmploymentType): Promise<EmploymentType> {
    return await prisma.employment_type.create({ data: employmentType });
  }

  static async findById(id: number): Promise<EmploymentType | null> {
    return await prisma.employment_type.findUnique({
      where: { employment_type_id: id },
    });
  }

  static async findAll(): Promise<EmploymentType[]> {
    return await prisma.employment_type.findMany();
  }

  static async update(
    id: number,
    employeeCategory: EmploymentType
  ): Promise<EmploymentType | null> {
    return await prisma.employment_type.update({
      where: { employment_type_id: id },
      data: employeeCategory,
    });
  }

  static async delete(id: number): Promise<EmploymentType | null> {
    return await prisma.employment_type.delete({
      where: { employment_type_id: id },
    });
  }
}
