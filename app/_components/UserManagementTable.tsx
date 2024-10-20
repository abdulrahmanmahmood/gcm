"use client";
import React, { useEffect, useState } from "react";
import UserManagmentTableHeader from "./UserManagmentTableHeader";
import UserManagementBodyRow from "./UserManagementBodyRow";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../_utils/fetchUsers";
import { AxiosErrorResponse, User, UsersAxiosResponse } from "../_interfaces";
import Pagination from "../_utils/Pagination";
import UserManagementNav from "./UserManagementNav";
import UserManagementHeader from "./UI/UserManagementHeader";
import { lockUnlockUsers } from "../_utils/LockUnlockUser";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserManagementTable() {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string[]>(["ID_ASC"]); // Default sort by ID ascending
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const { data, error, status, isLoading, refetch } = useQuery<
    UsersAxiosResponse,
    AxiosErrorResponse
  >({
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
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message, {
        autoClose: 2000,
        toastId: "fetchUsersError",
      });
      console.log(error);
    } else {
      toast.error("Failed to add company. Please try again.");
      console.log(error);
    }
  }
  if (isLoading) {
    console.log("isLoading", isLoading);
  }

  if (status) {
    console.log("status", status);
  }

  useEffect(() => {
    refetch();
  }, [searchKeyword, filters, sortBy]);

  // Mutation for locking/unlocking users
  const lockUnlockMutation = useMutation({
    mutationFn: ({ ids, locked }: { ids: number[]; locked: boolean }) =>
      lockUnlockUsers(ids, locked),
    onSuccess: () => {
      refetch(); // Refetch the data after successful lock/unlock
      setSelectedUsers([]); // Clear the selected users
    },
    onError: (error: any) => {
      console.error("Error performing lock/unlock action", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to add company. Please try again.");
      }
    },
  });

  /////////////////////////////////////////////////////////////////////HANDLERS//////////////////////////////////////////////////////////

  /////////////////////////////////// Search Handler

  const handleSearch = (keyword: string, filters: any) => {
    setSearchKeyword(keyword);
    setFilters(filters);
    setPageNumber(0); // Reset to first page when new search is triggered
  };
  /////////////////////////////////////////// Sort Mapping
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

  // Sort Function
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

  //////////////// Pagination HANDLERS //////////////////////////////////
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

  //////////////////////////////////////////////////SELECT USERS HANDLERS FUNCTIONS////////////////////////
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allUserIds = data?.content?.map((user: User) => user.id) || [];
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle Row Checkbox Toggle
  const handleSelectUser = (userId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  // Handle Unlock Button Click
  // Handle Unlock Button Click
  const handleUnlock = () => {
    if (selectedUsers.length > 0) {
      lockUnlockMutation.mutate({ ids: selectedUsers, locked: true });
    }
  };

  // Handle Lock Button Click
  const handleLock = () => {
    if (selectedUsers.length > 0) {
      lockUnlockMutation.mutate({ ids: selectedUsers, locked: false });
    }
  };

  return (
    <div className="flex flex-col justify-between   max-h-[91vh] ">
      <UserManagementNav onSearch={handleSearch} />
      <UserManagementHeader />
      <div className="flex flex-row gap-5 justify-end mx-4 my-2  ">
        <button
          className="bg-greening text-white w-36 py-2 px-3 rounded-lg"
          onClick={handleUnlock}
          disabled={lockUnlockMutation.isLoading} // Disable while mutation is loading
        >
          {lockUnlockMutation.isLoading &&
          lockUnlockMutation.variables?.locked === false
            ? "Unlocking..."
            : "Unlock"}
        </button>
        <button
          className="bg-redd text-white w-36 py-2 px-3 rounded-lg"
          onClick={handleLock}
          disabled={lockUnlockMutation.isLoading} // Disable while mutation is loading
        >
          {lockUnlockMutation.isLoading &&
          lockUnlockMutation.variables?.locked === true
            ? "Locking..."
            : "Lock"}
        </button>
      </div>

      {/* component */}
      <div className="overflow-auto h-auto shadow-md p-1 ">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap overflow-auto ">
          <UserManagmentTableHeader
            sortBy={sortBy}
            onSort={handleSort}
            isChecked={selectedUsers.length === data?.content?.length}
            onSelectAll={handleSelectAll}
          />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100  ">
            {data?.content?.map((user: User) => (
              <UserManagementBodyRow
                key={user.id}
                user={user}
                isChecked={selectedUsers.includes(user.id)}
                onSelect={handleSelectUser}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center my-4 max-h-[100px] pb-4">
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
      <ToastContainer />
    </div>
  );
}

export default UserManagementTable;
