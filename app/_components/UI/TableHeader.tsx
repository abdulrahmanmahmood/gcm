import React from "react";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

interface Column {
  label: string; // Column display name
  key: string; // Column key for sorting
  sortable?: boolean; // Indicates if the column is sortable
}

interface Props {
  columns: Column[]; // Array of columns
  sortBy: string[]; // Current sorting state
  onSort: (columnKey: string) => void; // Sorting handler
  allChecked: boolean;
  onToggleAll: (value: any) => void;
}

const TableHeader: React.FC<Props> = ({
  columns,
  sortBy,
  onSort,
  allChecked,
  onToggleAll,
}) => {
  const getSortIcon = (columnKey: string) => {
    // Check if the column is being sorted
    const currentSort = sortBy.find((sort) => sort.startsWith(columnKey));
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
        <th className="px-6 py-4 whitespace-nowrap mx-auto ">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%]  focus:ring-petrol "
              checked={allChecked}
              onChange={onToggleAll}
            />
          </div>
        </th>
        {columns.map((column) => (
          <th
            key={column.key}
            scope="col"
            className="px-6 py-4 font-medium text-petrol text-xl cursor-pointer"
            onClick={() => column.sortable && onSort(column.key)}
          >
            {column.label}
            {column.sortable && getSortIcon(column.key)}
          </th>
        ))}
        {/* Action Column */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
