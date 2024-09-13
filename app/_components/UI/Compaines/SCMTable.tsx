"use client";
import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/app/_utils/Pagination";
import CompaniesManagementNav from "./CompaniesManagementNav";
import CMHeader from "./CMHeader";
import { fetchCompanies } from "@/app/_utils/company/fetchCompanies";
import { Company, CompanyAxiosResponse } from "@/app/_interfaces";
import CMTHeader from "./CMTHeader";
import CMBRow from "./CMBRow";
import { fetchSuberContainerCompanies } from "@/app/_utils/company/SuberContainerCompanies/fetchSuberContainerCompanies";

function SCMTable() {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword

  const { data, error, isLoading, refetch } = useQuery<CompanyAxiosResponse>({
    queryKey: ["users", pageNumber, pageSize, searchKeyword],
    queryFn: () =>
      fetchSuberContainerCompanies(pageNumber, pageSize, searchKeyword),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  if (data) {
    console.log("fetchSuberContainerCompanies data", data);
  }
  if (error) {
    console.log("error", error);
  }
  if (isLoading) {
    console.log("isLoading", isLoading);
  }

  useEffect(() => {
    refetch();
  }, [searchKeyword]);

  // Search Handler

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setPageNumber(0); // Reset to first page when new search is triggered
  };

  //////////////// pagination ///////////////////
  // Function to handle page changes
  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  // Function to handle page size changes
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setPageNumber(0); // Reset to first page when changing page size
  };

  return (
    <>
      <CompaniesManagementNav onSearch={handleSearch} />
      <CMHeader />

      {/* component */}
      <div className="overflow-auto h-[72vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap ">
          <CMTHeader />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100  max-h-[60vh]">
            {data?.content?.map((user: Company) => (
              <CMBRow
                viewLink={`/companymanage/subercontainercompanies/${user.id}`}
                editLink=""
                key={user.id}
                user={user}
              />
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
}

export default SCMTable;
