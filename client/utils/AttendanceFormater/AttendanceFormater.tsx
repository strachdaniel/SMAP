const isValidDay = (day: any) => {

  const hasFromAndTo = day.from && day.to;

  const hasNoteWithoutOthers = day.note && !(day.from || day.to || day.dayli_criteria);

  const hasCriteriaWithoutOthers =
    day.dayli_criteria && day.dayli_criteria.length !== 0 && !(day.from || day.to || day.note);

  const hasAll =
    day.from &&
    day.to &&
    (day.note ||
      (day.dayli_criteria && day.dayli_criteria.length !== 0) ||
      (day.note && day.dayli_criteria && day.dayli_criteria.length !== 0));
      
  const isEmptyAndNotTemp =
    day.from === null &&
    day.to === null &&
    (day.dayli_criteria === undefined || day.dayli_criteria.length === 0) &&
    day.note === '' &&
    !day.day_id.toString().startsWith('temp');

  return (
    hasFromAndTo || hasNoteWithoutOthers || hasCriteriaWithoutOthers || hasAll || isEmptyAndNotTemp
  );
};

export const formatForServer = (attendance: any) => {
  const formated_attendance = {
    attendance_id: attendance.attendance_id,
    attendance_sheets: attendance.attendance_sheet.map((sheet: any) => {
      return {
        attendance_sheet_id: sheet.attendance_sheet_id,
        contract_id: sheet.contract_id,
        note: sheet.note,
        days: sheet.days.filter(isValidDay),
      };
    }),
  };
  return formated_attendance;
};
