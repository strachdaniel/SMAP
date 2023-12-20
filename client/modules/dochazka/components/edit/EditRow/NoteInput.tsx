import React, { useState } from 'react';

const NoteInput = (props: any) => {
  const [note, setNote] = useState(props.note);

  const handleNoteChange = (e: any) => {
    setNote(e.target.value);
    props.handler(e.target.name, e.target.value);
  };

  return (
    <input
      type="text"
      name={props.name}
      className="border-[1px] border-input_border rounded-md w-full bg-white text-black"
      value={note}
      onChange={(e) => handleNoteChange(e)}
    />
  );
};

export default NoteInput;
