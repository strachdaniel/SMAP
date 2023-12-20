import moment from 'moment';
import TimeInput from './TimeInput';
import NoteInput from './NoteInput';
import { use, useEffect, useMemo, useState } from 'react';
import CriteriaSelectionModal from '../criteria/CriterieSelectionModal';
import rowValidator from './RowValidator/RowValidator';
import CriteriaList from './CriteriaList';
import useSWR from 'swr';
import axios from 'axios';

type Props = {
  data: any;
  onDayUpdate: (data: any) => any;
  sheet: any;
};

const EditRow = ({ data: rowData, onDayUpdate, sheet }: Props) => {
  const [dayData, setDayData] = useState(rowData);
  const [activeCriteria, setActiveCriteria] = useState<any[]>(
    rowData.activeCriteria ? rowData.activeCriteria : []
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (dayData.day_id && !dayData.day_id.toString().includes('temp')) {
      axios
        .get(`${process.env.ATTENDANCE_URL}/dayli-criteria/day/${dayData.day_id}}`)
        .then((res) => {
          setActiveCriteria([...activeCriteria, ...res.data]);
        })
        .catch((err) => {
          console.log('dayli criteria error', err);
        });
    }
  }, []);

  const handleInputChange = (name: string, value: string) => {
    const updatedDayData = { ...dayData, [name]: value };
    setDayData(updatedDayData);
    if (rowValidator(updatedDayData, setErrors)) {
      updatedDayData.dayli_criteria = activeCriteria;
      onDayUpdate(updatedDayData);
    }
  };

  const handleActiveCriteriaChange = (criteria: any) => {
    console.log('criteria', criteria);

    setActiveCriteria((currentCriteria: any) => {
      const data = { ...dayData, dayli_criteria: [...currentCriteria, criteria] };
      onDayUpdate(data);
      return [...currentCriteria, criteria];
    });
  };

  const removeFromActiveCriteria = (array_index: number, dayliCriteria: any) => {
    if (dayliCriteria.dayli_criteria_id) {
      axios
        .delete(`${process.env.ATTENDANCE_URL}/dayli-criteria/${dayliCriteria.dayli_criteria_id}`)
        .then((res) => {
          const newActiveCriteria = [...activeCriteria];
          newActiveCriteria.splice(array_index, 1);
          setActiveCriteria(newActiveCriteria);
          const data = { ...dayData, dayli_criteria: newActiveCriteria };
          onDayUpdate(data);
        })
        .catch((err) => {
          console.log('delete dayli criteria error', err);
        });
    } else {
      const newActiveCriteria = [...activeCriteria];
      newActiveCriteria.splice(array_index, 1);
      setActiveCriteria(newActiveCriteria);
      const data = { ...dayData, dayli_criteria: newActiveCriteria };
      onDayUpdate(data);
    }
  };

  return (
    <div
      className="flex-col w-full my-3"
      style={errors.length > 0 ? { border: '1px solid red' } : { border: 'none' }}
    >
      <div className="grid grid-cols-[repeat(3,150px)_1fr_1fr] w-full">
        <p>{moment(rowData.date).format('DD/MM - ddd')}</p>
        <TimeInput
          name="from"
          time={rowData.from}
          date={rowData.date}
          handler={handleInputChange}
        />
        <TimeInput name="to" time={rowData.to} date={rowData.date} handler={handleInputChange} />
        <NoteInput name="note" note={rowData.note} handler={handleInputChange} />
        <button
          className="text-center bg-minor_button text-white font-bold w-40 rounded-md ml-4 p-1"
          onClick={() => setIsOpen(true)}
        >
          KRITÉRIA
        </button>
      </div>
      <div className="grid grid-cols-[repeat(3,150px)_1fr_1fr]">
        {activeCriteria.length > 0 ? (
          <CriteriaList
            activeCriteria={activeCriteria}
            removeFromActiveCriteria={removeFromActiveCriteria}
          />
        ) : null}

        {isOpen && (
          <CriteriaSelectionModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            day={dayData}
            sheet={sheet}
            handleActiveCriteriaChange={handleActiveCriteriaChange}
          />
        )}
      </div>
    </div>
  );
};

export default EditRow;
