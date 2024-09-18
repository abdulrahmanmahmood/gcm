"use client";
import ProjectsManagementNav from "@/app/_components/ProjectsManagementNav";
import React, { useEffect, useState } from "react";
import ProjectsManagementTableHeader from "./ProjectsManagementTableHeader";
import {
  Project,
  ProjectsAxiosResponse,
  User,
  UsersAxiosResponse,
} from "@/app/_interfaces";
import Pagination from "@/app/_utils/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/_utils/fetchUsers";
import { FetchAllData } from "@/app/_utils/general/FetchAllData";
import ProjectsManagementBodyRow from "./ProjectsManagementBodyRow";

function ProjectsManagementTable() {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string[]>(["ID_ASC"]); // Default sort by ID ascending

  const { data, error, isLoading, refetch } = useQuery<ProjectsAxiosResponse>({
    queryKey: ["users", pageNumber, pageSize, searchKeyword, filters, sortBy],
    queryFn: () =>
      FetchAllData(
        "management/project/all",
        pageNumber,
        pageSize,
        searchKeyword,
        filters,
        sortBy,
        "Projects"
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
  }, [searchKeyword, filters, sortBy]);

  // Search Handler

  const handleSearch = (keyword: string, filters: any) => {
    setSearchKeyword(keyword);
    setFilters(filters);
    setPageNumber(0); // Reset to first page when new search is triggered
  };

  // ////////////handle sort

  // Sort Mapping
  const sortMapping: { [key: string]: string } = {
    companyName: "COMPANYNAME",
    id: "ID",
    status: "STATUS",
    industry: "INDUSTRY",
    email: "EMAIL",
    startDate: "START_DATE",
    // enabled: "ENABLED",
    // locked: "LOCKED",
  };
  const handleSort = (column: string) => {
    const mappedColumn = sortMapping[column];
    const currentSort = sortBy.find((sort) => sort.startsWith(mappedColumn));

    let newSortArray = [...sortBy];

    if (currentSort) {
      // If sorting by the same column, toggle between ASC and DESC
      const newSortDirection = currentSort.endsWith("ASC") ? "DESC" : "ASC";
      newSortArray = newSortArray.map((sort) =>
        sort.startsWith(mappedColumn)
          ? `${mappedColumn}_${newSortDirection}`
          : sort
      );
    } else {
      // If sorting by a new column, add it to the array
      newSortArray = [`${mappedColumn}_ASC`, ...newSortArray];
    }

    setSortBy(newSortArray);
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

      {/* component */}
      <div className="overflow-auto h-[72vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white text-sm text-petrol text-center text-nowrap">
          <ProjectsManagementTableHeader sortBy={sortBy} onSort={handleSort} />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 max-h-[60vh]">
            {data?.content?.map((user: Project) => (
              <ProjectsManagementBodyRow key={user.id} project={user} />
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
