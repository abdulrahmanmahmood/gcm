"use client";
import ProjectsManagementNav from "@/app/_components/ProjectsManagementNav";
import React, { useEffect, useState } from "react";
import PrjectsManagementHeader from "./PrjectsManagementHeader";
import ProjectsManagementTableHeader from "./ProjectsManagementTableHeader";
import { User, UsersAxiosResponse } from "@/app/_interfaces";
import Pagination from "@/app/_utils/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/_utils/fetchUsers";

function ProjectsManagementTable() {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const { data, error, isLoading, refetch } = useQuery<UsersAxiosResponse>({
    queryKey: [
      "users",
      pageNumber,
      pageSize,
      searchKeyword,
      filters,
      sortBy,
      sortDirection,
    ],
    queryFn: () =>
      fetchUsers(
        pageNumber,
        pageSize,
        searchKeyword,
        filters,
        sortBy
        // sortDirection
      ),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  if (data) {
    console.log("data", data);
  }
  if (error) {
    console.log("error", error);
  }
  if (isLoading) {
    console.log("isLoading", isLoading);
  }

  useEffect(() => {
    refetch();
  }, [searchKeyword, filters, sortBy, sortDirection]);

  // Search Handler

  const handleSearch = (keyword: string, filters: any) => {
    setSearchKeyword(keyword);
    setFilters(filters);
    setPageNumber(0); // Reset to first page when new search is triggered
  };

  // ////////////handle sort
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc"); // Default to ascending when switching columns
    }
    setPageNumber(0); // Reset to first page when new sorting is triggered
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
      <ProjectsManagementNav onSearch={handleSearch} />
      <PrjectsManagementHeader />

      {/* component */}
      <div className="overflow-auto h-[72vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap ">
          <ProjectsManagementTableHeader
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />{" "}
          <tbody className="divide-y divide-gray-100 border-t border-gray-100  max-h-[60vh]">
            {/* {data?.content?.map((user: User) => (
              <UserManagementBodyRow key={user.id} user={user} />
            ))} */}
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
        <div className="flex items-center space-x-2 mr-5">
          <span className="text-gray-700">
            Total: {data?.totalElementsCount} users
          </span>
        </div>
      </div>
    </>
  );
}

export default ProjectsManagementTable;
