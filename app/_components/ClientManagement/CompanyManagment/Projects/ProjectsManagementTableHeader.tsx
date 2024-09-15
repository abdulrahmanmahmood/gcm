import React from "react";
import { TiArrowUnsorted, TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

interface Props {
  sortBy: string;
  sortDirection: string;
  onSort: (column: string) => void;
}
const ProjectsManagementTableHeader: React.FC<Props> = ({ sortBy, sortDirection, onSort }) => {
  const getSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortDirection === "asc" ? <TiArrowSortedUp className="inline-block ml-2" /> : <TiArrowSortedDown className="inline-block ml-2" />;
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
          onClick={() => onSort("fullName")}
        >
          Full Name {getSortIcon("fullName")}
        </th>

        {/* ID */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("id")}
        >
          ID {getSortIcon("id")}
        </th>

        {/* Gender */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("gender")}
        >
          Gender {getSortIcon("gender")}
        </th>

        {/* Salary */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("salary")}
        >
          Salary {getSortIcon("salary")}
        </th>

        {/* Role */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("role")}
        >
          Role {getSortIcon("role")}
        </th>

        {/* Registration Date */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("registrationDate")}
        >
          Registration Date {getSortIcon("registrationDate")}
        </th>

        {/* Enabled */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("enabled")}
        >
          Enabled {getSortIcon("enabled")}
        </th>

        {/* Locked */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
          onClick={() => onSort("locked")}
        >
          Locked {getSortIcon("locked")}
        </th>

        {/* Action */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default ProjectsManagementTableHeader