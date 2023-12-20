import { useState } from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  placeholder: string;
  imageUrl?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  height?: number;
  width?: number;
  name: string;
}

const Input: React.FC<Props> = ({
  title,
  placeholder,
  imageUrl,
  type = 'text',
  value,
  onChange,
  onKeyDown,
  height = 50,
  width = 200,
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex flex-col items-start m-2 w-[${width}px]`}>
      <label
        className={`text-sm font-medium ${
          isFocused || value ? 'text-gray-700' : 'text-gray-500'
        } mb-1`}
      >
        {title}
      </label>
      <div
        className={`relative rounded-md shadow-custom ${
          isFocused ? '' : ''
        } flex items-center w-full`}
      >
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`h-[${height}px] w-[${width}px] flex-1 rounded-md appearance-none focus:outline-none py-2 pl-2 pr-10 placeholder-gray-400 text-gray-700 font-light leading-tight bg-white`}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {imageUrl && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {imageUrl && <Image src={imageUrl} alt="" width={20} height={20} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
