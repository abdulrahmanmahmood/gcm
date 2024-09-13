import React from "react";

const PermissonTableHeader = () => {
  return (
    <thead className="bg-gray-50 text-petrol">
      <tr>
        {/* Full Name  */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Full Name
        </th>

        {/* Registration Date */}
        <th
          scope="col"
          className="px-6 py-4 font-medium text-petrol text-xl text-nowrap"
        >
          Permissions
        </th>
        {/* Action */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Action
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl" />
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl" />
      </tr>
    </thead>
  );
};

export default PermissonTableHeader;
