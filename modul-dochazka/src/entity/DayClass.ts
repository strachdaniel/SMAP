import DayliCriteria from "./CriteriaClass";

class Day {
  private day_id: number;
  private attendance_sheet_id: number;
  private date: Date;
  private from: Date;
  private to: Date;
  private note: string;
  private criteria: DayliCriteria[];
}

export default Day;
