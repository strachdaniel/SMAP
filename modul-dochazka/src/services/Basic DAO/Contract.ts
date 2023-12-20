import { PrismaClient } from "@prisma/client";
import type { contract as Contract } from "@prisma/client";

const prisma = new PrismaClient();

export class ContractDAO {
  async create(contract: Contract): Promise<Contract> {
    try {
      return await prisma.contract.create({ data: contract });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findById(id: number): Promise<Contract | null> {
    return await prisma.contract.findUnique({ where: { contract_id: id } });
  }

  async findAll(): Promise<Contract[]> {
    return await prisma.contract.findMany();
  }

  async update(id: number, contract: Contract): Promise<Contract | null> {
    return await prisma.contract.update({
      where: { contract_id: id },
      data: contract,
    });
  }

  async delete(id: number): Promise<Contract | null> {
    return await prisma.contract.delete({ where: { contract_id: id } });
  }
}
