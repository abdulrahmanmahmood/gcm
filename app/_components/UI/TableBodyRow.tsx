import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";

interface ActionFunction {
  name: string;
  handler: (id: number) => void;
}

interface IProps<T> {
  data: T; // Generic type for any data
  columns: {
    key: keyof T; // Key that corresponds to the data's properties
    label: string; // Display label
    render?: (value: any) => React.ReactNode; // Optional custom render function for each column
  }[];
  actions?: {
    viewPath?: string; // Path for the view action
    editPath?: string; // Path for the edit action
    extraActions?: ActionFunction[]; // Array of additional actions
  };
  isChecked: boolean;
  onToggle: () => void;
}

const TableBodyRow = <T extends { id: number }>({
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
  const handleAction = (handler: (id: number) => void) => {
    handler(data.id);
    setShowModal(false);
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
            className={`flex justify-center items-center h-full mx-auto relative ${
              showModal ? "bg-white border-2 p-2 rounded-lg shadow-lg" : ""
            }`}
            onClick={toggleModal}
          >
            <SlOptionsVertical />
          </button>
          {showModal && (
            <div className="absolute bg-white border-petrol border-[1px] right-9 z-10 mt-3 min-w-20 rounded-md bg-[#6B779A1A] shadow-lg text-center">
              <div className="flex flex-col gap-1">
                {actions.viewPath && (
                  <Link href={actions.viewPath}>
                    <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                      View
                    </button>
                  </Link>
                )}
                {actions.editPath && (
                  <Link href={actions.editPath}>
                    <div className="w-full flex items-center">
                      <button className="w-fit text-left px-4 py-2 text-sm mx-auto text-petrol hover:bg-gray-100">
                        Edit
                      </button>
                    </div>
                  </Link>
                )}
                {actions.extraActions?.map((action, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100"
                    onClick={() => handleAction(action.handler)}
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </td>
      )}
    </tr>
  );
};

export default TableBodyRow;
