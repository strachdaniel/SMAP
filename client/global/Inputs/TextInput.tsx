import { forwardRef } from 'react';

type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  disabled?: boolean;
  rest?: any;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, placeholder, value, onChange, error, type, disabled, ...rest }, ref) => {

    return (
      <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-500">{label}</label>
        <input
          ref={ref}
          className="w-full h-10 px-3 mt-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline bg-white"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }
);

export default TextInput;
