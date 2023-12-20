import { forwardRef } from 'react';

type SelectInputProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  selected: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
  rest?: any;
};

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ name, label, options, selected, onChange, error, disabled, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-500">{label}</label>
        <select
          ref={ref}
          className="w-full h-10 px-3 mt-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline bg-white"
          name={name}
          value={selected}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }
);

export default SelectInput;