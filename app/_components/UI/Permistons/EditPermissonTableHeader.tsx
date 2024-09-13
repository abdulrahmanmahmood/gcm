import React from "react";

const EditPermissonTableHeader = () => {
  return (
    <thead className="bg-gray-50 text-petrol">
      <tr>
        {/* CheckBox  */}
        <th className="px-6 py-4 whitespace-nowrap mx-auto">
          <div className="flex items-center">
            <input
              id="checkbox-all"
              type="checkbox"
              className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%]  focus:ring-petrol "
            />
            {/* <label htmlFor="checkbox-all" className="sr-only">
          checkbox
        </label> */}
          </div>
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
          Description
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl" />
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl" />
      </tr>
    </thead>
  );
};

export default EditPermissonTableHeader;
