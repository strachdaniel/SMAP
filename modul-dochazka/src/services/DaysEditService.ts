import { PrismaClient, day } from "@prisma/client";
import DayliCriteriaEditService from "./DayliCriteriaEditService";

const DaysEditService = () => {
  let _prisma;

  const deleteDays = [];
  const updateDays = [];
  const createDays = [];

  const createdDays = [];
  const updatedDays = [];

  const setPrismaTransaction = (prisma: any) => {
    console.log("Setting prisma transaction for DaysEditService");

    _prisma = prisma;
  };

  const _sortDaysBasedOnOperation = async (days: any) => {
    console.log("Sorting days");

    days.forEach((day: any) => {
      if (day.day_id.toString().includes("temp")) {
        console.log("Creating day", day);

        delete day.day_id;
        createDays.push(day);
      }

      if (day.day_id) {
        if (
          !day.from &&
          !day.to &&
          day.dayli_criteria.length === 0 &&
          !day.note
        ) {
          console.log("Deleting day", day);

          deleteDays.push(day);
        } else {
          updateDays.push(day);
        }
      }
    });
  };

  const _executeOperations = async () => {
    if (deleteDays.length !== 0) {
      await _prisma.day
        .deleteMany({
          where: {
            OR: deleteDays.map((day) => {
              return { day_id: day.day_id };
            }),
          },
        })
        .catch((err) => console.log(err));
    }

    if (updateDays.length !== 0) {
      await Promise.all(
        updateDays.map(async (day) => {
          const stripped_day = { ...day };
          delete stripped_day.dayli_criteria;

          await updatedDays.push(
            await _prisma.day
              .update({
                where: {
                  day_id: day.day_id,
                },
                data: {
                  from: day.from,
                  to: day.to,
                  note: day.note,
                },
              })
              .catch((err) => console.log(err))
          );
        })
      );
    }

    if (createDays.length !== 0) {
      await Promise.all(
        createDays.map(async (day) => {
          const stripped_day = { ...day };
          delete stripped_day.day_id;
          delete stripped_day.dayli_criteria;
          await createdDays.push(
            await _prisma.day
              .create({
                data: {
                  day_id: stripped_day.day_id,
                  attendance_sheet_id: stripped_day.attendance_sheet_id,
                  date: stripped_day.date,
                  from: stripped_day.from,
                  to: stripped_day.to,
                  note: stripped_day.note,
                },
              })
              .catch((err) => console.log(err))
          );
        })
      );
    }
  };

  const prepareDataForDayliCriteria = async (
    input_days: any,
    output_days: any
  ) => {
    const dayli_criteria = [];

    input_days.forEach((input_day: any, index: number) => {
      if (input_day.dayli_criteria.length !== 0) {
        input_day.dayli_criteria.forEach((criteria: any) => {
          dayli_criteria.push({
            ...criteria,
            day_id: output_days[index].day_id,
          });
        });
      }
    });

    return dayli_criteria;
  };

  const saveDays = async (days: any) => {
    console.log("Entering Day service");

    await _sortDaysBasedOnOperation(days);
    await _executeOperations();

    const dayli_criteria_from_updated_days = await prepareDataForDayliCriteria(
      updateDays,
      updatedDays
    );
    const dayli_criteria_from_created_days = await prepareDataForDayliCriteria(
      createDays,
      createdDays
    );

    const dayli_criteria = [
      ...dayli_criteria_from_updated_days,
      ...dayli_criteria_from_created_days,
    ];
    console.log("dayli_criteria", dayli_criteria);

    const { saveDayliCriteria, setPrismaTransaction } = DayliCriteriaEditService();
    setPrismaTransaction(_prisma);

    return await saveDayliCriteria(dayli_criteria);
  };

  return {
    saveDays,
    setPrismaTransaction,
  };
};

export default DaysEditService;
