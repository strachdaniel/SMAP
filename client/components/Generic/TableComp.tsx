import React, { ReactNode, useState } from 'react';

type TableProps<T> = {
  data: T[];
  columns: { title: string; key: string }[];
  currentPage: number;
  pageSize: number;
  onChangePage: (page: number) => void;
  actions: (row: T) => ReactNode; 
};

export default function Table<T extends Record<string, ReactNode>>({
  data,
  columns,
  currentPage,
  pageSize,
  onChangePage,
  actions
}: TableProps<T>) {
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / pageSize));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);

  const paginatedData = data.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextPage = () => {
    onChangePage(currentPage + 1);
  };

  return (
    <div className="border-solid bg-white shadow-xl w-full rounded-[5px]">
      <table className="w-full">
        <thead className="h-12 text-left">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="p-2">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className="hover:bg-input_border h-[40px] text-[18px]">
              {columns.map((column) => (
                <td key={column.key} className="p-2">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end py-2">
        <button
          className="px-3 py-1 text-sm rounded-lg mr-2 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 text-sm rounded-lg disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
