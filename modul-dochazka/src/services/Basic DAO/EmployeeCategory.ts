import { PrismaClient, employee_category as EmployeeCategory } from "@prisma/client";

const prisma = new PrismaClient();

export default class EmployeeCategorytDAO {
  static async create(employeeCategory: EmployeeCategory): Promise<EmployeeCategory> {
    return await prisma.employee_category.create({ data: employeeCategory });
  }

  static async findById(id: number): Promise<EmployeeCategory | null> {
    return await prisma.employee_category.findUnique({ where: { employee_category_id: id } });
  }

  static async findAll(): Promise<EmployeeCategory[]> {
    return await prisma.employee_category.findMany();
  }

  static async update(id: number, employeeCategory: EmployeeCategory): Promise<EmployeeCategory | null> {
    return await prisma.employee_category.update({
      where: { employee_category_id: id },
      data: employeeCategory,
    });
  }

  static async delete(id: number): Promise<EmployeeCategory | null> {
    return await prisma.employee_category.delete({ where: { employee_category_id: id } });
  }
}
