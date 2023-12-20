import React, { useMemo, useState } from 'react';
import SwitchPanel from '@/global/UI/Panels/SwitchPanel';
import EditRow from './EditRow/EditRow';
import MonthNoteInput from './MonthNoteInput';
import moment from 'moment';
import { useEffect } from 'react';
import { set } from 'react-hook-form';

const Sheet = (props: any) => {
  const [sheet, setSheets] = useState<any>(props.sheet);

  const onDayUpdate = (day: any) => {
    setSheets((currentSheet: any) => {
      const newDays = currentSheet.days.map((d: any) => (d.day_id === day.day_id ? day : d));

      return { ...currentSheet, days: newDays };
    });
  };

  useEffect(() => {
    //save sheet to attendance in Edit
    props.onSheetIndexChange(sheet);
    setSheets(props.sheet);
  }, [props.sheet, sheet]);

  return (
    <>
      {sheet.days.map((day: any, index: number) => {
        return (
          <EditRow key={day.day_id} data={day} onDayUpdate={onDayUpdate} sheet={sheet}></EditRow>
        );
      })}

      <MonthNoteInput note={sheet?.note}></MonthNoteInput>
    </>
  );
};

export default Sheet;
