import React, { useState, useEffect } from 'react';
import moment from 'moment';

type TimeInputProps = {
  time: string;
  name: string;
  date: string;
  handler: (name: string, value: string) => void;
};

const TimeInput = (props: TimeInputProps) => {
  const date = moment(props.date);

  const [tempTime, setTempTime] = useState(moment(props.time).format('HH:mm'));

  const isValidTimeFormat = (time: string) => {
    return moment(time, 'HH:mm').isValid();
  };

  const handleTimeChange = (e: any) => {
    setTempTime(e.target.value);
    if (isValidTimeFormat(e.target.value)) {
      const timeParts = e.target.value.split(':');

      const newDate = date.clone().hour(timeParts[0]).minute(timeParts[1]);
      props.handler(e.target.name, newDate.format());
    } else if (e.target.value === '') {
      setTempTime('');
      //@ts-ignore
      props.handler(e.target.name, null);
    }
  };

  useEffect(() => {
    // Update the initial time value when the time prop changes
    setTempTime(moment(props.time).format('HH:mm'));
  }, [props.time]);

  return (
    <input
      type="time"
      name={props.name}
      className="border-[1px] border-input_border rounded-md w-20 bg-white text-black"
      value={moment(tempTime, 'HH:mm').isValid() ? moment(tempTime, 'HH:mm').format('HH:mm') : ''}
      onChange={(e) => handleTimeChange(e)}
    />
  );
};

export default TimeInput;
