import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";

interface IProps<T> {
  data: T; // Generic type for any data
  columns: {
    key: keyof T; // Key that corresponds to the data's properties
    label: string; // Display label
    render?: (value: any) => React.ReactNode; // Optional custom render function for each column
  }[];
  actions?: {
    viewPath: string; // Path for the view action
    editPath: string; // Path for the edit action
  };
  isChecked: boolean;
  onToggle: () => void;
}

const TableBodyRow = <T extends {}>({
  data,
  columns,
  actions,
  isChecked,
  onToggle,
}: IProps<T>) => {
  const [showModal, setShowModal] = useState(false); // State to toggle the modal

  const toggleModal = () => {
    setShowModal((prev: boolean) => !prev); // Toggle modal state
  };

  return (
    <tr key={(data as any).id} className="hover:bg-gray-50">
      {/* Check Box */}
      <td className="px-6 py-4 whitespace-nowrap mx-auto ">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%]  focus:ring-petrol "
            checked={isChecked}
            onChange={onToggle}
          />
        </div>
      </td>

      {/* Dynamic data cells */}
      {columns.map((column) => (
        <td key={column.key.toString()} className="px-6 py-4">
          {/* Type assertion to ensure ReactNode */}
          {column.render
            ? column.render(data[column.key]) // Custom render function, if provided
            : (data[column.key] as React.ReactNode)}{" "}
          {/* Type assertion for safety */}
        </td>
      ))}

      {/* Action Options */}
      {actions && (
        <td className="">
          <button
            className="flex justify-center items-center h-full mx-auto relative"
            onClick={toggleModal}
          >
            <SlOptionsVertical />
          </button>
          {showModal && (
            <div className="absolute right-9 z-10 mt-3 w-20 rounded-md bg-[#6B779A1A] shadow-lg">
              <div className="flex flex-col gap-1">
                <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                  <Link href={actions.viewPath}>View</Link>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                  <Link href={actions.editPath}>Edit</Link>
                </button>
              </div>
            </div>
          )}
        </td>
      )}
    </tr>
  );
};

export default TableBodyRow;
