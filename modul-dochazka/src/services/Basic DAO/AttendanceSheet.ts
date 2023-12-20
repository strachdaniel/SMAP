import {
  PrismaClient,
  attendance_sheet as AttendanceSheet,
} from "@prisma/client";

const prisma = new PrismaClient();

export class AttendanceSheetDAO {
  async create(data: AttendanceSheet): Promise<AttendanceSheet> {
    return await prisma.attendance_sheet.create({ data: data });
  }

  async findById(id: number): Promise<AttendanceSheet | null> {
    return await prisma.attendance_sheet.findUnique({
      where: { attendance_sheet_id: id },
      include: { days: true },
    });
  }

  async findAll(): Promise<AttendanceSheet[]> {
    return await prisma.attendance_sheet.findMany();
  }

  async update(
    id: number,
    attendance: AttendanceSheet
  ): Promise<AttendanceSheet | null> {
    return await prisma.attendance_sheet.update({
      where: { attendance_sheet_id: id },
      data: attendance,
    });
  }

  async delete(id: number): Promise<AttendanceSheet | null> {
    return await prisma.attendance_sheet.delete({
      where: { attendance_sheet_id: id },
    });
  }
}
