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

const ClientContractsTableHeader = ({ sortBy, onSort }: Props) => {
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
        <th className="px-6 py-4 whitespace-nowrap"></th>

        {/* Full Name */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          // onClick={() => onSort("companyName")}
        >
          Company Name
          {/* {getSortIcon("COMPANY_NAME")} */}
        </th>

        {/* ID
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("id")}
        >
          ID {getSortIcon("ID")}
        </th> */}

        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          // onClick={() => onSort("projectName")}
        >
          Project Name
          {/* {getSortIcon("PROJECTNAME")} */}
        </th>

        {/* Salary */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("cost")}
        >
          Cost
          {getSortIcon("COST")}
        </th>

        {/* Start Date */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("startDate")}
        >
          Start Date
          {getSortIcon("START_DATE")}
        </th>

        {/* End Date */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("endDate")}
        >
          End Date
          {getSortIcon("END_DATE")}
        </th>

        {/* Action */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default ClientContractsTableHeader;
