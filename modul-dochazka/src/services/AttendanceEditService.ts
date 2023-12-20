import { PrismaClient } from "@prisma/client";
import Attendance from "../entity/AttendanceClass";
import SheetEditService from "./SheetEditService";

const AttendanceSaveService = () => {
  const _prisma = new PrismaClient();

  const saveAttendance = async (input_data: any, user: any) => {
    const employee_id = user.profile.employee_id;

    //TODO check if user has permission to edit attendance
    const attendance = await _prisma.attendance.findUnique({
      where: {
        attendance_id: input_data.attendance_id,
        employee_id: employee_id,
      },
    });

    if (!attendance) {
      throw new Error("Attendance not found");
    }

    const sheets = await _prisma.attendance_sheet.findMany({
      where: {
        attendance_id: input_data.attendance_id,
      },
    });

    if (!sheets) {
      throw new Error("Sheets not found");
    }

    const sheet_ids = sheets.map((sheet) => {
      return sheet.attendance_sheet_id;
    });

    input_data.attendance_sheets.forEach((sheet) => {
      if (!sheet_ids.includes(sheet.attendance_sheet_id)) {
        throw new Error(
          "Sheet is not belonging to attendance you're trying to edit"
        );
      }

      sheet.days.forEach((day) => {
        if (day.attendance_sheet_id !== sheet.attendance_sheet_id) {
          throw new Error(
            "Day is not belonging to sheet you're trying to edit"
          );
        }

        if (day.dayli_criteria && day.dayli_criteria.length !== 0) {
          day.dayli_criteria.forEach((row) => {
            if (!row.criteria_id) {
              throw new Error("Criteria not found");
            } else {
              row.day_id = day.day_id;
            }
          });
        }
      });
    });

    // Finished checking

    try {
      await _prisma.$transaction(async (prisma) => {
        const { saveSheets, setPrismaTransaction } = SheetEditService();
        await setPrismaTransaction(prisma);
        const data = await saveSheets(input_data.attendance_sheets);
        return data;
      });

      const result = await _prisma.attendance.findUnique({
        where: {
          attendance_id: input_data.attendance_id,
        },
        include: {
          attendance_sheet: {
            include: {
              contract: {
                include: {
                  employee_category: true,
                },
              },
              days: {
                include: {
                  dayli_criteria: true,
                },
              },
            },
          },
        },
      });
      console.log("TRANSACTION WAS COMMITED");
      return result;
      //for each sheet run function from its service
    } catch (error) {
      console.error(error);
    }

    // //Prisma transaction
    // try {
    //   await _prisma.$transaction(async (prisma) => {
    //     const stripped_days = { ...input_data };
    //     for (const sheet of input_data.attendance_sheets) {
    //       // Save days one by one and get the newly generated IDs
    //       const createdDays = [];
    //       const oldIds = [];
    //       for (const day of sheet.days) {
    //         const stripped_day = { ...day };
    //         oldIds.push(stripped_day.day_id);
    //         if (stripped_day.day_id.toString().includes("temp")) {
    //           delete stripped_day.day_id;
    //         }
    //         delete stripped_day.dayli_criteria;
    //         delete stripped_day.criteria;
    //         if (stripped_day.day_id) {
    //           const createdDay = await prisma.day.update({
    //             where: {
    //               day_id: stripped_day.day_id,
    //             },
    //             data: stripped_day,
    //           });
    //           createdDays.push(createdDay);
    //         } else {
    //           console.log(stripped_day);

    //           const createdDay = await prisma.day.create({
    //             data: stripped_day,
    //           });
    //           createdDays.push(createdDay);
    //         }
    //       }

    //       const dayliCriteria = sheet.days.flatMap((day, index) => {
    //         return day.dayli_criteria
    //           ? day.dayli_criteria.map((criteria) => {
    //               const criteriaId = criteria.criteria.criteria_id;
    //               delete criteria.criteria;

    //               criteria.hours = criteria.hours
    //                 ? parseInt(criteria.hours)
    //                 : 0;
    //               return {
    //                 ...criteria,
    //                 criteria_id: criteriaId,
    //                 day_id: createdDays[index].day_id, // Replace with the new day_id returned by the database
    //               };
    //             })
    //           : [];
    //       });

    //       console.log(dayliCriteria);

    //       for (const criteria of dayliCriteria) {
    //         if (criteria.dayli_criteria_id) {
    //           await prisma.dayli_criteria.update({
    //             where: {
    //               dayli_criteria_id: criteria.dayli_criteria_id,
    //             },
    //             data: criteria,
    //           });
    //         } else {
    //           await prisma.dayli_criteria.create({
    //             data: criteria,
    //           });
    //         }
    //       }
    //     }
    //   });

    //   console.log("End of transaction");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return {
    saveAttendance,
  };
};

export default AttendanceSaveService;
