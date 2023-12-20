import moment from 'moment';

const generateFillerRows = (sheet: any) => {
  if (!sheet) {
    return [];
  }
  const date = moment(sheet.date).startOf('month');
  let days = [...sheet.days]; // Create a new array from the days array

  for (let i = 0; i < date.daysInMonth(); i++) {
    const day = date.clone().add(i, 'days');
    if (!days.find((d: any) => moment(d.date).isSame(day, 'day'))) {
      days = [
        ...days,
        {
          // Push the new object into the new array
          attendance_sheet_id: sheet.attendance_sheet_id,
          day_id: `temp-${Date.now()}-${Math.random()}`,
          date: day.format(),
          from: null,
          to: null,
          note: '',
          criteria: [],
        },
      ];
    }
  }

  days.sort((a: any, b: any) => (moment(a.date).isBefore(b.date) ? -1 : 1));

  return days;
};

export default generateFillerRows;
