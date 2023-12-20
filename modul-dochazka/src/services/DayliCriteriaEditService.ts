import { PrismaClient, dayli_criteria } from "@prisma/client";

type DayliCriteria = {
  dayli_criteria_id: number;
  day_id: number;
  criteria_id: number;
  value: null | number;
  note: string | null;
  hours: number | null;
};

const DayliCriteriaEditService = () => {
  let _prisma;

  const setPrismaTransaction = (prisma: any) => {
    _prisma = prisma;
  };

  const saveDayliCriteria = async (dayliCriteria: any) => {
    console.log("Entering DayliCriteria service");

    await Promise.all(
      dayliCriteria.map(async (criteria: any) => {
        await _prisma.dayli_criteria
          .upsert({
            where: {
              dayli_criteria_id: criteria.dayli_criteria_id,
            },
            update: {
              value: criteria.value,
              note: criteria.note,
              hours: criteria.hours,
            },
            create: {
              value: criteria.value,
              note: criteria.note,
              hours: criteria.hours,
              criteria: {
                connect: {
                  criteria_id: criteria.criteria_id,
                },
              },
              day: {
                connect: {
                  day_id: criteria.day_id,
                },
              },
            },
          })
          .catch((err) => console.log(err));
      })
    );
  };

  return { saveDayliCriteria, setPrismaTransaction };
};

export default DayliCriteriaEditService;
