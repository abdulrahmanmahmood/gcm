import React from "react";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
interface Props {
  sortBy: string[]; // Updated to array of strings
  onSort: (column: string) => void;
}

const CleintManagmentTableHeader = ({ sortBy, onSort }: Props) => {
  const getSortIcon = (column: string) => {
    // Check if the column is being sorted
    const currentSort = sortBy.find((sort) => sort.startsWith(column));
    if (currentSort) {
      return currentSort.endsWith("ASC") ? (
        <TiArrowSortedUp className="inline-block ml-2" />
      ) : (
        <TiArrowSortedDown className="inline-block ml-2" />
      );
    }
    return <TiArrowUnsorted className="inline-block ml-2" />;
  };
  return (
    <thead className="bg-gray-50 text-petrol">
      <tr>
        {/* CheckBox Input */}
        <th className="px-6 py-4 whitespace-nowrap">
          <div className="px-6 py-4 font-medium text-gray-900">
            <div className="flex items-center">
              {/* <input
            id="checkbox-all"
            type="checkbox"
            className="w-4 h-4 text-petrol bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          /> */}
              {/* <label htmlFor="checkbox-all" className="sr-only">
            checkbox
          </label> */}
            </div>
          </div>
        </th>

        {/* Full Name  */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("fullName")}
        >
          Full Name {getSortIcon("FULL_NAME")}
        </th>
        {/* ID */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("id")}
        >
          ID {getSortIcon("ID")}
        </th>

        {/* Gender */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("gender")}
        >
          Gender {getSortIcon("GENDER")}
        </th>

        {/* Company Name */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Company Name
        </th>

        {/* Role */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("role")}
        >
          Role {getSortIcon("ROLE")}
        </th>

        {/* Registration Date */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("registrationDate")}
        >
          Registration Date {getSortIcon("CREATED_DATE")}
        </th>

        {/* Enabled */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("enabled")}
        >
          Enabled {getSortIcon("ENABLED")}
        </th>

        {/* Locked */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("locked")}
        >
          Locked {getSortIcon("LOCKED")}
        </th>

        {/* Action */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Action
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl" />
      </tr>
    </thead>
  );
};

export default CleintManagmentTableHeader;
