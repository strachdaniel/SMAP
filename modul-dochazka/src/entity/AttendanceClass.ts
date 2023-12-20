import { PrismaClient, attendance as AttendanceType } from "@prisma/client";
import Sheet from "./SheetClass";

class Attendance {
  private attendance_id: number;
  private employee_id: number;
  private date: Date;
  private payroll: string;
  private vacation_free_days: number;
  private vacation_taken_days: number;
  private sickdays: number;
  private status: string;
  private sheets: Sheet[];
  private _prisma: PrismaClient;

  constructor(attendance_id: number, prisma: PrismaClient) {
    this._prisma = prisma;
    this.loadData(attendance_id);
  }

  private async loadData(attendance_id: number) {
    const attendanceData: AttendanceType | null = await this._prisma.attendance.findUnique({
      where: {
        attendance_id: attendance_id,
      },
    });

    if (!attendanceData) {
      throw new Error("Attendance not found");
    }

    this.attendance_id = attendanceData.attendance_id;
    this.employee_id = attendanceData.employee_id;
    this.date = attendanceData.date;
    this.payroll = attendanceData.payroll;
    this.vacation_free_days = attendanceData.vacation_free_days;
    this.vacation_taken_days = attendanceData.vacation_taken_days;
    this.sickdays = attendanceData.sickdays;
    this.status = attendanceData.status;
  }
}

export default Attendance;