import NumberSign from '@/global/UI/navigation/InfoGraphics/NumberSign';
import { useRouter } from 'next/router';
import SwitchPanel from '@/global/UI/Panels/SwitchPanel';
import useSWR from 'swr';
import DetailDayRow from '@/modules/dochazka/components/detail/DetailDayRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TopBar from '@/modules/dochazka/components/edit/TopBar';

function Detail() {
  const [attendance, setAttendance] = useState<any>({ attendance_sheet: [] });
  const [activeSheet, setActiveSheet] = useState<any>({ days: [] });
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);

  const router = useRouter();
  const id = router.query.id;

  const { data, error, isLoading }: any = useSWR(
    `${process.env.ATTENDANCE_URL}/attendance/${router.query.id}`,
    axios
  );

  const handleActiveSheetChange = (index: any) => {
    setActiveSheetIndex(index);
    setActiveSheet(attendance.attendance_sheet[index]);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setAttendance(data.data);
      setActiveSheet(data.data.attendance_sheet[0]);
    }
  }, [data, isLoading]);

  return (
    <div className="flex-col">
      <TopBar id={id}></TopBar>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SwitchPanel
          sheets={attendance?.attendance_sheet}
          activeSheet={activeSheetIndex}
          handleSheetChange={handleActiveSheetChange}
        >
          <div className="bg-white rounded-md shadow-md p-10">
            <div className="grid grid-cols-[repeat(3,150px)_1fr] grid-rows-1 mb-8">
              <p className="font-bold text-xl">Den</p>
              <p className="font-bold text-xl">Od</p>
              <p className="font-bold text-xl">Do</p>
              <p className="font-bold text-xl">Poznamka</p>
            </div>
            {activeSheet.days.map((day: any, index: number) => {
              return <DetailDayRow data={day}></DetailDayRow>;
            })}
          </div>
        </SwitchPanel>
      )}
    </div>
  );
}

export default Detail;
