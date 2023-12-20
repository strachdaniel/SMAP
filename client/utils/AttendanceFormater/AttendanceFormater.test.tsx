// FILEPATH: /Users/danielstrach/Projects/unitiedu/client/utils/AttendanceFormater/AttendanceFormater.test.tsx

import { formatForServer } from './AttendanceFormater';

describe('formatForServer', () => {
  test('formats attendance correctly with tempID (remove from local only)', () => {
    const attendance = {
      attendance_id: '1',
      attendance_sheet: [
        {
          attendance_sheet_id: '1',
          contract_id: '1',
          note: 'note',
          days: [
            {
              from: '09:00',
              to: '17:00',
              dayli_criteria: [],
              note: 'note',
              day_id: '1',
            },
            {
              from: null,
              to: null,
              dayli_criteria: [],
              note: '',
              day_id: 'temp123',
            },
          ],
        },
      ],
    };

    const expected = {
      attendance_id: '1',
      attendance_sheets: [
        {
          attendance_sheet_id: '1',
          contract_id: '1',
          note: 'note',
          days: [
            {
              from: '09:00',
              to: '17:00',
              dayli_criteria: [],
              note: 'note',
              day_id: '1',
            },
          ],
        },
      ],
    };

    expect(formatForServer(attendance)).toEqual(expected);
  });

  // New tests
  test('returns attendance sheets with empty days to be deleted from server', () => {
    const attendance = {
      attendance_id: '1',
      attendance_sheet: [
        {
          attendance_sheet_id: '1',
          contract_id: '1',
          note: 'note',
          days: [
            {
              from: null,
              to: null,
              dayli_criteria: [],
              note: '',
              day_id: '123',
            },
          ],
        },
      ],
    };

    const expected = {
      attendance_id: '1',
      attendance_sheets: [
        {
          attendance_sheet_id: '1',
          contract_id: '1',
          note: 'note',
          days: [
            {
              from: null,
              to: null,
              dayli_criteria: [],
              note: '',
              day_id: '123',
            },
          ],
        },
      ],
    };

    expect(formatForServer(attendance)).toEqual(expected);
  });

  test('handles multiple attendance sheets', () => {
    const attendance = {
      attendance_id: '1',
      attendance_sheet: [
        // First sheet
        {
          attendance_sheet_id: '1',
          contract_id: '1',
          note: 'note',
          days: [
            {
              from: '09:00',
              to: '17:00',
              dayli_criteria: [],
              note: 'note',
              day_id: '1',
            },
          ],
        },
        // Second sheet
        {
          attendance_sheet_id: '2',
          contract_id: '2',
          note: 'note',
          days: [
            {
              from: '10:00',
              to: '18:00',
              dayli_criteria: [],
              note: 'note',
              day_id: '2',
            },
          ],
        },
      ],
    };

    const expected = {
      attendance_id: '1',
      attendance_sheets: [
        // First sheet
        {
          attendance_sheet_id: '1',
          contract_id: '1',
          note: 'note',
          days: [
            {
              from: '09:00',
              to: '17:00',
              dayli_criteria: [],
              note: 'note',
              day_id: '1',
            },
          ],
        },
        // Second sheet
        {
          attendance_sheet_id: '2',
          contract_id: '2',
          note: 'note',
          days: [
            {
              from: '10:00',
              to: '18:00',
              dayli_criteria: [],
              note: 'note',
              day_id: '2',
            },
          ],
        },
      ],
    };

    expect(formatForServer(attendance)).toEqual(expected);
  });
});
