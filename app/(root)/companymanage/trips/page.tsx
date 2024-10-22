"use client";
import ClientContracktsNav from "@/app/_components/UI/document/client contract/ClientContracktsNav";
import TableBodyRow from "@/app/_components/UI/TableBodyRow";
import TableHeader from "@/app/_components/UI/TableHeader";
import { clientContainer, SubContractors } from "@/app/_interfaces";
import { FetchAllData } from "@/app/_utils/general/FetchAllData";
import Pagination from "@/app/_utils/Pagination";
import { BodyRowDataOfClientContainers } from "@/public/dummy";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { updateEntity } from "@/app/_utils/general/Update";
import MaintenanceNav from "@/app/_components/UI/maintenance/MaintenanceNav";
const page = () => {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string[]>(["ID_ASC"]); // Default sort by ID ascending
  const [allChecked, setAllChecked] = useState(false); // Track if all rows are checked
  const [checkedRows, setCheckedRows] = useState<number[]>([]); // Track checked rows

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users", pageNumber, pageSize, searchKeyword, filters, sortBy],
    queryFn: () =>
      FetchAllData(
        "management/vehicle/trip/all",
        pageNumber,
        pageSize,
        searchKeyword,
        filters,
        sortBy,
        "vehicles"
        // sortDirection
      ),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  // Mutation for updating vehicle status
  const statusMutation = useMutation({
    mutationFn: ({
      status,
      vehicleIds,
    }: {
      status: string;
      vehicleIds: number[];
    }) =>
      updateEntity(`management/vehicle/change-status`, {
        vehicleIds: vehicleIds,
        status: status,
      }), // Dynamic endpoint for vehicles
    onSuccess: () => {
      toast.success("Vehicle status updated successfully!");
      setCheckedRows([]);
      refetch();
    },
    onError: (error) => {
      console.error("Error updating  vehicle: status", error);
      toast.error("Failed to update  vehicle status.");
    },
  });

  useEffect(() => {
    refetch();
  }, [searchKeyword, filters, sortBy]);

  // Handle Search
  const handleSearch = (keyword: string, filters: any) => {
    setSearchKeyword(keyword);
    setFilters(filters);
    setPageNumber(0); // Reset to first page when new search is triggered
  };

  // ////////////handle sort

  // Sort Mapping
  const sortMapping: { [key: string]: string } = {
    id: "ID",
    status: "STATUS",
    type: "TYPE",
    // email: "EMAIL",
    manufacturer: "MANUFACTURER",
    createdDate: "CREATED_DATE",
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

  /////////////////////////Make the CheckBox //////////////////////
  const handleToggleAll = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);

    if (newAllChecked) {
      // If checking all, add all vehicle IDs to the array
      setCheckedRows(data?.content.map((vehicle: any) => vehicle.id) || []);
    } else {
      // If unchecking all, clear the array
      setCheckedRows([]);
    }
  };

  const handleToggleRow = (id: number) => {
    setCheckedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // TableBodyRow
  // Columns Configuration
  const Headercolumns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Manufacturer", key: "manufacturer", sortable: true },
    { label: "Status", key: "status", sortable: true },
    { label: "License Plate", key: "licensePlate", sortable: false },
    { label: "Type", key: "type", sortable: false },
  ];
  const columns = [
    {
      key: "id" as keyof clientContainer,
      label: "ID",
    },
    { key: "manufacturer" as keyof clientContainer, label: "Manufacturer" },
    { key: "status" as keyof clientContainer, label: "Status" },
    {
      key: "licensePlate" as keyof clientContainer,
      label: "License Plate",
    },
    { key: "type" as keyof clientContainer, label: "Type" },
  ];
  if (data) {
    console.log("data", data);
  }
  if (error) {
    console.log("error", error);
  }
  if (isLoading) {
    console.log("isLoading", isLoading);
  }

  return (
    <>
      <MaintenanceNav onSearch={handleSearch} />
      {/* Table */}
      <div className="overflow-auto h-[72vh] shadow-md p-1">
        <div className="flex justify-end px-10">
          <button
            onClick={() => {
              if (checkedRows.length > 0) {
                statusMutation.mutate({
                  status: "AVAILABLE",
                  vehicleIds: checkedRows,
                });
              } else {
                toast.warn("No vehicles selected.");
              }
            }}
            className="text-white rounded-lg px-5 py-3 bg-greening m-2"
          >
            AVAILABLE
          </button>

          <button
            onClick={() => {
              if (checkedRows.length > 0) {
                statusMutation.mutate({
                  status: "IN_MAINTENANCE",
                  vehicleIds: checkedRows,
                });
              } else {
                toast.warn("No vehicles selected.");
              }
            }}
            className="text-white rounded-lg px-5 py-3 bg-petrol m-2"
          >
            IN MAINTENANCE
          </button>

          <button
            onClick={() => {
              if (checkedRows.length > 0) {
                statusMutation.mutate({
                  status: "IN_USE",
                  vehicleIds: checkedRows,
                });
              } else {
                toast.warn("No vehicles selected.");
              }
            }}
            className="text-white rounded-lg px-5 py-3 bg-redd m-2"
          >
            IN USE
          </button>
        </div>
        <table className="w-full border-collapse bg-white text-sm text-petrol text-center text-nowrap">
          {/* Use GeneralTableHeader */}
          <TableHeader
            columns={Headercolumns}
            sortBy={sortBy}
            onSort={handleSort}
            allChecked={allChecked}
            onToggleAll={handleToggleAll}
          />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 max-h-[60vh]">
            {data?.content?.map((vehicle: clientContainer) => (
              <TableBodyRow
                key={vehicle.id}
                data={vehicle}
                columns={columns}
                isChecked={checkedRows.includes(vehicle.id)}
                onToggle={() => handleToggleRow(vehicle.id)}
                actions={{
                  viewPath: `/vehicle-management/vehicles/${vehicle.id}`,
                  editPath: `/vehicle-management/vehicles/edit/${vehicle.id}`,
                }}
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
        <div className="flex items-center space-x-2 mr-5">
          <span className="text-gray-700">
            Total: {data?.totalElementsCount} vehicles
          </span>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
