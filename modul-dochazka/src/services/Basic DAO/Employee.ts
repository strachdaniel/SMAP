import { PrismaClient, employee as Employee } from "@prisma/client";

const prisma = new PrismaClient();

export class EmployeeDAO {
  async create(employee: Employee): Promise<Employee> {
    return await prisma.employee.create({ data: employee });
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return await prisma.employee.findUnique({ where: { email: email } });
  }

  async findById(id: number): Promise<Employee | null> {
    return await prisma.employee.findUnique({ where: { employee_id: id } });
  }

  async findAll(): Promise<Employee[]> {
    return await prisma.employee.findMany({
      include: {
        contracts: {
          include: { employment_type: true, employee_category: true },
        },
      },
    });
  }

  async update(id: number, employee: Employee): Promise<Employee | null> {
    return await prisma.employee.update({
      where: { employee_id: id },
      data: employee,
    });
  }

  async delete(id: number): Promise<Employee | null> {
    return await prisma.employee.delete({ where: { employee_id: id } });
  }
}
