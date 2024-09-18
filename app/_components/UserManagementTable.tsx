"use client";
import React, { useEffect, useState } from "react";
import UserManagmentTableHeader from "./UserManagmentTableHeader";
import UserManagementBodyRow from "./UserManagementBodyRow";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../_utils/fetchUsers";
import { User, UsersAxiosResponse } from "../_interfaces";
import Pagination from "../_utils/Pagination";
import UserManagementNav from "./UserManagementNav";
import UserManagementHeader from "./UI/UserManagementHeader";

function UserManagementTable() {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string[]>(["ID_ASC"]); // Default sort by ID ascending

  const { data, error, isLoading, refetch } = useQuery<UsersAxiosResponse>({
    queryKey: ["users", pageNumber, pageSize, searchKeyword, filters, sortBy],
    queryFn: () =>
      fetchUsers(pageNumber, pageSize, searchKeyword, filters, sortBy),
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
  // Sort Mapping
  const sortMapping: { [key: string]: string } = {
    fullName: "FULL_NAME",
    id: "ID",
    gender: "GENDER",
    salary: "SALARY",
    role: "ROLE",
    registrationDate: "CREATED_DATE",
    enabled: "ENABLED",
    locked: "LOCKED",
  };

  // Handle Sort Function
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
      <UserManagementNav onSearch={handleSearch} />
      <UserManagementHeader />
      <div className="flex flex-row gap-5 justify-end mx-4 my-4">
        <button className="bg-greening text-white w-36 py-2 px-3 rounded-lg">
          Unlock
        </button>
        <button className="bg-redd text-white w-36 py-2 px-3 rounded-lg">
          Lock
        </button>
      </div>

      {/* component */}
      <div className="overflow-auto h-[72vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap ">
          <UserManagmentTableHeader sortBy={sortBy} onSort={handleSort} />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100  max-h-[60vh]">
            {data?.content?.map((user: User) => (
              <UserManagementBodyRow key={user.id} user={user} />
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

export default UserManagementTable;
