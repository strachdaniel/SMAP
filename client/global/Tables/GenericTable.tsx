import React from 'react';
import Link from 'next/link';

interface Col {
  name: string;
  mapping: (item: any) => React.ReactNode;
}

interface Props {
  data: any[];
  cols: Col[];
  id: string;
  actions: (item: any) => React.ReactNode;
}

const GenericTable = ({ data, cols, id, actions }: Props) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {cols.map((col) => (
            <th key={col.name} className="px-4 py-2 text-left">
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {cols.map((col, index) => (
              <td key={index} className="px-4 py-2 border-b">
                {col.mapping(item)}
              </td>
            ))}
            <td className="px-4 py-2 border-b text-right">{actions(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;
