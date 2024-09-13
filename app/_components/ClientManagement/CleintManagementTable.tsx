"use client";
import React, { useState } from "react";
import CleintManagmentTableHeader from "./CleintManagmentTableHeader";
import CleintManagementBodyRow from "./CleintManagementBodyRow";
import { Cleint, User, UsersAxiosResponse } from "@/app/_interfaces";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/app/_utils/fetchClients";
import Pagination from "@/app/_utils/Pagination";

const CleintManagementTable = () => {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size

  const { data, error, isLoading } = useQuery<UsersAxiosResponse>({
    queryKey: ["clients", pageNumber, pageSize],
    queryFn: () => fetchClient(pageNumber, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  if (data) {
    console.log("Clients Data", data);
  }
  if (error) {
    console.log("Clients Error", error);
  }
  if (isLoading) {
    console.log("Clients isLoading", isLoading);
  }

  // Pagination//////////////
  // function to handle page changes

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setPageNumber(0);
  };

  return (
    <>
      {/* component */}
      <div className="overflow-auto h-[70vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap ">
          <CleintManagmentTableHeader />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 h-[60vh]">
            {data?.content?.map((client: Cleint) => (
              <CleintManagementBodyRow key={client.id} user={client} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Page Size Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-gray-700">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Pagination */}
        <Pagination
          onPageChange={handlePageChange}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalElementsCount={data?.totalElementsCount ?? 0}
        />

        {/* Displaying Total Users */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">
            Total: {data?.totalElementsCount} users
          </span>
        </div>
      </div>
    </>
  );
};

export default CleintManagementTable;
