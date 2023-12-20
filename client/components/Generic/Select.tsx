import { useState } from 'react';

const Select = (props: any) => {
  const [selectedOption, setSelectedOption] = useState(props.options[0]);

  const handleSelectChange = (event: any) => {
    const option = event.target.value;
    setSelectedOption(option);
    props.onChange(event);
  };

  return (
    <select
      name={props.name}
      className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      {props.options.map((option: any, index: number) => {
        console.log(option);

        return (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
