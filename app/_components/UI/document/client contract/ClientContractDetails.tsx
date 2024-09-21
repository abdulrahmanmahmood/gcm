"use client";

import React from "react";

interface ClientContractDetailsProps {
  projectName: string;
  cost: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  modifiedDate: string;
}

const ClientContractDetails: React.FC<ClientContractDetailsProps> = ({
  projectName,
  cost,
  startDate,
  endDate,
  createdDate,
  modifiedDate,
}) => {
  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-2 gap-10 border-y-2 p-7 shadow-sm">
        {/* Project Name */}
        <div className="flex flex-row justify-between pr-12">
          <p className="text-petrol text-xl font-semibold">Project Name</p>
          <p className="text-gray-500">{projectName}</p>
        </div>

        {/* Cost */}
        <div className="flex flex-row justify-between pr-12">
          <p className="text-petrol text-xl font-semibold">Cost</p>
          <p className="text-gray-500">{cost}</p>
        </div>

        {/* Start Date */}
        <div className="flex flex-row justify-between pr-12">
          <p className="text-petrol text-xl font-semibold">Start Date</p>
          <p className="text-gray-500">{startDate}</p>
        </div>

        {/* End Date */}
        <div className="flex flex-row justify-between pr-12">
          <p className="text-petrol text-xl font-semibold">End Date</p>
          <p className="text-gray-500">{endDate}</p>
        </div>

        {/* Created Date */}
        <div className="flex flex-row justify-between pr-12">
          <p className="text-petrol text-xl font-semibold">Created Date</p>
          <p className="text-gray-500">{createdDate}</p>
        </div>

        {/* Modified Date */}
        <div className="flex flex-row justify-between pr-12">
          <p className="text-petrol text-xl font-semibold">Modified Date</p>
          <p className="text-gray-500">{modifiedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientContractDetails;
