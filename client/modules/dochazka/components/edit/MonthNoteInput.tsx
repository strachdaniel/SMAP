import React, { useState } from 'react';

const MonthNoteInput = (props: any) => {
  const [note, setNote] = useState(props.note);

  const handleNoteChange = (e: any) => {
    setNote(e.target.value);
    // props.onNoteChange(e.target.value);
  };

  return (
    <textarea
      className="border-[1px] border-input_border rounded-lg w-full h-20 p-1 mt-5"
      value={note}
      onChange={(e) => handleNoteChange(e)}
    />
  );
};

export default MonthNoteInput;
