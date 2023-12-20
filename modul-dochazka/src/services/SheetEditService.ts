import DaysEditService from "./DaysEditService";

const SheetEditService = () => {
  let _prisma;

  const setPrismaTransaction = (prisma: any) => {
    console.log("Setting prisma transaction for SheetEditService");
    _prisma = prisma;
  };

  const saveSheets = async (sheets: any) => {
    console.log("Entering Sheet service");

    const { saveDays, setPrismaTransaction } = DaysEditService();

    await setPrismaTransaction(_prisma);
    return await Promise.all(
      sheets.map((sheet: any) => {
        return saveDays(sheet.days);
      })
    );
  };

  return { saveSheets, setPrismaTransaction };
};

export default SheetEditService;
