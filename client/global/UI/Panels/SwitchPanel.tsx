import React, { ReactNode } from 'react';

interface SwitchPanelProps {
  children?: ReactNode | null;
  sheets?: Array<any> | null;
  activeSheet?: number;
  handleSheetChange?: (sheet: any) => void;
}

const SwitchPanel = ({ children, sheets, handleSheetChange, activeSheet }: SwitchPanelProps) => {
  return (
    <div className="w-full h-full bg-white shadow-md flex-col">
      <div className="flex">
        {sheets &&
          sheets.length > 0 &&
          sheets.map((sheet: any, index: number) => {
            return index === activeSheet ? (
              <button className="p-2 h-12 bg-white font-bold">
                {sheet.contract.employee_category.name}
              </button>
            ) : (
              <button
                onClick={() => (handleSheetChange ? handleSheetChange(index) : null)}
                className="h-12 p-2 bg-white shadow-[inset_0_0px_4px_rgba(0,0,0,0.6)]"
              >
                {sheet.contract.employee_category.name}
              </button>
            );
          })}
      </div>
      {children}
    </div>
  );
};

export default SwitchPanel;
