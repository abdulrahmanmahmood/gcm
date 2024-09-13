import { Row } from "@/app/_interfaces";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
interface Iprops {
  row: Row;
  userId: number;
  onPermissionChange: (
    permission: string,
    checked: boolean
  ) => void;
}

const EditPermissionTableBodyRow = ({
  row,
  userId,
  onPermissionChange,
}: Iprops) => {
  const [isChecked, setIsChecked] = useState(row.selected);

  // Handlers

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onPermissionChange(row.permission, e.target.checked);
  };

  return (
    <tr key={row.description} className="hover:bg-gray-50 ">
      {/* CheckBox */}
      <td className="px-6 py-2 whitespace-nowrap mx-auto">
        <div className="flex items-center">
          <input
            id={`checkbox-${row.permission}`}
            type="checkbox"
            className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%]  focus:ring-petrol "
            checked={isChecked}
            onChange={handleChange}
          />
        </div>
      </td>
      {/* Permissions Date */}
      <td className="px-6 py-2">
        <span className="inline-flex items-center text-nowrap">
          {row.permission}
        </span>
      </td>

      {/* desction */}
      <td className="px-6 py-2 max-w-lg text-wrap">
        <div className="">{row.description}</div>
      </td>

      {/* End of the Table body row */}
    </tr>
  );
};

export default EditPermissionTableBodyRow;
