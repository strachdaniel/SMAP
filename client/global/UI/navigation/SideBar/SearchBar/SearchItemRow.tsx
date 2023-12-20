import React from 'react';

interface Props {
  title: string;
  selected: boolean;
  onHover: () => void;
}

export default function SearchItemRow(props: Props) {
  const { title, selected, onHover } = props;

  return (
    <div
      className={`flex justify-start items-center h-11 p-5 ${selected ? 'bg-input_border' : ''}`}
      onMouseEnter={onHover}
    >
      <p>{title}</p>
    </div>
  );
}
