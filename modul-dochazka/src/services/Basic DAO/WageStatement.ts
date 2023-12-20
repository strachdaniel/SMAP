import { PrismaClient, wage_statement as WageStatement } from "@prisma/client";

const prisma = new PrismaClient();

export class WageStatementDAO {
  static async create(data: Omit<WageStatement, "id">): Promise<WageStatement> {
    return prisma.wage_statement.create({ data });
  }

  static async findById(id: number): Promise<WageStatement | null> {
    return prisma.wage_statement.findUnique({ where: { wage_statement_id: id } });
  }

  static async findAll(): Promise<WageStatement[]> {
    return prisma.wage_statement.findMany();
  }

  static async update(
    id: number,
    data: Partial<WageStatement>
  ): Promise<WageStatement> {
    return prisma.wage_statement.update({ where: { wage_statement_id: id }, data });
  }

  static async delete(id: number): Promise<WageStatement> {
    return prisma.wage_statement.delete({ where: { wage_statement_id: id } });
  }
}
