import { atom, selector, useSetRecoilState } from 'recoil';

interface Attendance {
  attendance_id: number;
  employee_id: number;
  employee: any;
  date: string;
  payroll?: string;
  vacation_free_days: number;
  vacation_taken_days: number;
  sickdays: number;
  status: string;
  attendance_sheet: any;
  created_at?: string;
  updated_at?: string;
}

export const attendanceAtom = atom<any>({
  key: 'attendance',
  default: null,
});

export const getEmployeeCategoryId = selector({
  key: 'getEmployeeCategoryId',
  get: ({ get }) => {
    const attendance = get(attendanceAtom);
    return attendance?.employee?.employee_category_id;
  },
});

export const sheetsSelector = selector({
  key: 'sheetsSelector',
  get: ({ get }) => {
    const attendance = get(attendanceAtom);
    return attendance?.attendance_sheet;
  },
});
