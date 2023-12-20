import { PrismaClient, attendance as Attendance } from "@prisma/client";

const prisma = new PrismaClient();

export class AttendanceDAO {
  async create(attendance: Attendance): Promise<Attendance> {
    return await prisma.attendance.create({ data: attendance });
  }

  async findById(id: number): Promise<Attendance | null> {
    return await prisma.attendance.findUnique({
      where: { attendance_id: id },
      include: {
        attendance_sheet: {
          include: {
            days: {
              include: {
                dayli_criteria: {
                  include: { criteria: true },
                },
              },
            },
            contract: {
              include: { employee_category: { include: { criteria: true } } },
            },
          },
        },
      },
    });
  }

  async findAll(): Promise<Attendance[]> {
    return await prisma.attendance.findMany();
  }

  async findAllByEmployeeId(employee_id: number): Promise<Attendance[]> {
    return await prisma.attendance.findMany({
      where: { employee_id: employee_id },
      include: {
        attendance_sheet: true,
      },
    });
  }

  async update(id: number, attendance: Attendance): Promise<Attendance | null> {
    return await prisma.attendance.update({
      where: { attendance_id: id },
      data: attendance,
    });
  }

  async delete(id: number): Promise<Attendance | null> {
    return await prisma.attendance.delete({ where: { attendance_id: id } });
  }
}
