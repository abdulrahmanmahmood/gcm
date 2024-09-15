import React, { useState } from 'react';

interface DropdownCheckboxProps {
  title: string;
  options: { label: string; value: string | boolean }[];
  selectedValue: string | boolean;
  onChange: (value: string | boolean) => void;
}

const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
  title,
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value: string | boolean) => {
    onChange(value);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="relative">
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {title} <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {options.map((option, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedValue === option.value}
                    onChange={() => handleOptionChange(option.value)}
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900">
                    {option.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
