import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { attendanceAtom } from '@/global/stores/attendance/attendanceAtom';
import Sheet from '@/modules/dochazka/components/edit/Sheet';
import SwitchPanel from '@/global/UI/Panels/SwitchPanel';
import generateFillerRows from '@/utils/generateFillerRows';
import { set } from 'react-hook-form';
import { formatForServer } from '@/utils/AttendanceFormater/AttendanceFormater';
import 'moment/locale/cs';

function Edit() {
  //definion of page scope global state

  const [attendance, setAttendance] = useState<any>(undefined);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sheets = attendance?.attendance_sheet;

  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);

  const router = useRouter();

  //ref
  const sheetStateRef = useRef<any>(null);

  const handleActiveSheetChange = (index: any) => {
    setActiveSheetIndex(index);
  };

  const onSheetIndexChange = (sheet: any) => {
    setAttendance((currentAttendance: any) => {
      const newSheets = currentAttendance.attendance_sheet.map((s: any) =>
        s.attendance_sheet_id === sheet.attendance_sheet_id ? sheet : s
      );
      return { ...currentAttendance, attendance_sheet: newSheets };
    });
  };

  const handleSave = () => {
    //save attendance
    const formated_attendance = formatForServer(attendance);

    console.log('formated_attendance', formated_attendance);

    axios
      .post(`${process.env.ATTENDANCE_URL}/attendance/save`, formated_attendance)
      .then((res) => {
        setIsSaving(false);
        const attendance = res.data;
        const sheets = attendance.attendance_sheet;
        const updatedSheets = sheets.map((sheet: any) => {
          return { ...sheet, days: generateFillerRows(sheet) };
        });
        setAttendance({ ...res.data, attendance_sheet: updatedSheets });
      })
      .catch((err) => {
        console.log('save error', err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.ATTENDANCE_URL}/attendance/${router.query.id}`).then((res) => {
      const attendance = res.data;
      const sheets = attendance.attendance_sheet;
      const updatedSheets = sheets.map((sheet: any) => {
        return { ...sheet, days: generateFillerRows(sheet) };
      });
      setAttendance({ ...attendance, attendance_sheet: updatedSheets });
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div className="flex-col">
      <div>
        <Link href={`/dochazka/detail/${router.query.id}`}>ZPET</Link>
      </div>
      <div className="mb-5">
        <PrimaryButton className="w-80" onClick={() => handleSave()} disabled={isSaving}>
          ULOZIT DOCHAZKU
        </PrimaryButton>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SwitchPanel
          activeSheet={activeSheetIndex}
          handleSheetChange={handleActiveSheetChange}
          sheets={sheets}
        >
          <div className="bg-white rounded-md shadow-md p-10">
            <div className="grid grid-cols-[repeat(3,150px)_1fr] grid-rows-1 mb-8">
              <p className="font-bold text-xl">Den</p>
              <p className="font-bold text-xl">Od</p>
              <p className="font-bold text-xl">Do</p>
              <p className="font-bold text-xl">Poznamka</p>
            </div>
            {sheets && (
              <Sheet
                sheet={sheets[activeSheetIndex]}
                sheetStateRef={sheetStateRef}
                onSheetIndexChange={onSheetIndexChange}
              ></Sheet>
            )}
          </div>
        </SwitchPanel>
      )}
    </div>
  );
}

export default Edit;
