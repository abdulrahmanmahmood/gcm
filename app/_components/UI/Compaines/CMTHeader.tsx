import React from "react";

const CMTHeader = () => {
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
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Name
        </th>
        {/* ID */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          ID
        </th>

        {/* Email */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Email
        </th>

        {/* Business status */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Business status
        </th>

        {/* Industry */}
        <th scope="col" className="px-6 py-4 font-medium text-petrol text-xl">
          Industry
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
