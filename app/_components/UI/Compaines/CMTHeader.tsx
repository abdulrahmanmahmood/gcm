import React from "react";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
interface Props {
  sortBy: string[]; // Updated to array of strings
  onSort: (column: string) => void;
  onSelectAll: (checked: boolean) => void;
  isChecked: boolean;
}

const CMTHeader = ({ sortBy, onSort, onSelectAll, isChecked }: Props) => {
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
        {/* CheckBox Input */}
        <th className="px-6 py-4 whitespace-nowrap">
          {" "}
          <input
            type="checkbox"
            className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%]  focus:ring-petrol "
            checked={isChecked}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
        </th>

        {/* Full Name  */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl"
          onClick={() => onSort("Name")}
        >
          Name {getSortIcon("NAME")}
        </th>
        {/* ID */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("id")}
        >
          ID {getSortIcon("ID")}
        </th>

        {/* Email */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl"
          onClick={() => onSort("email")}
        >
          Email {getSortIcon("EMAIL")}
        </th>

        {/* Business status */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl"
          onClick={() => onSort("status")}
        >
          Business status {getSortIcon("STATUS")}
        </th>

        {/* Industry */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl"
          onClick={() => onSort("industry")}
        >
          Industry {getSortIcon("INDUSTRY")}
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

export default CMTHeader;
