"use client";
import ClientContracktsNav from "@/app/_components/UI/document/client contract/ClientContracktsNav";
import TableBodyRow from "@/app/_components/UI/TableBodyRow";
import TableHeader from "@/app/_components/UI/TableHeader";
import { clientContainer, SubContractors } from "@/app/_interfaces";
import { FetchAllData } from "@/app/_utils/general/FetchAllData";
import Pagination from "@/app/_utils/Pagination";
import { BodyRowDataOfClientContainers } from "@/public/dummy";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Container } from "postcss";
import React, { useEffect, useState } from "react";

const ClientContractTable = () => {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string[]>(["ID_ASC"]); // Default sort by ID ascending
  const [allChecked, setAllChecked] = useState(false); // Track if all rows are checked
  const [checkedRows, setCheckedRows] = useState<{ [key: number]: boolean }>(
    {}
  ); // Track checked rows

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
    cost: "COST",
    industry: "INDUSTRY",
    email: "EMAIL",
    startDate: "START_DATE",
    endDate: "END_DATE",
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

    const updatedCheckedRows = BodyRowDataOfClientContainers.reduce((acc, row) => {
      acc[row.id] = newAllChecked;
      return acc;
    }, {} as { [key: number]: boolean });

    setCheckedRows(updatedCheckedRows);
  };

  const handleToggleRow = (id: number) => {
    setCheckedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // TableBodyRow
  // Columns Configuration
  const Headercolumns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Waste Type", key: "wasteType", sortable: false },
    { label: "Status", key: "status", sortable: false },
    { label: "Volume Value", key: "volumeValue", sortable: false },
    { label: "Weight Value", key: "weightValue", sortable: false },
  ];
  const columns = [
    {
      key: "id" as keyof clientContainer,
      label: "ID",
    },
    {
      key: "wasteType" as keyof clientContainer,
      label: "Waste Type",
    },
    { key: "status" as keyof clientContainer, label: "Status" },
    { key: "volumeValue" as keyof clientContainer, label: "Volume Value" },
    { key: "weightValue" as keyof clientContainer, label: "weight Value" },
  ];

  return (
    <>
      <ClientContracktsNav onSearch={handleSearch} />

      {/* Table */}
      <div className="overflow-auto h-[72vh] shadow-md p-1">
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
            {/* {RealData?.content?.map((contract: ClientContract) => (
              <ClientContractsBodyRow
                key={contract.id}
                contract={contract}
              />
            ))} */}

            {BodyRowDataOfClientContainers?.map((contract: clientContainer) => (
              <TableBodyRow
                key={contract.id}
                data={contract}
                columns={columns}
                isChecked={!!checkedRows[contract.id]}
                onToggle={() => handleToggleRow(contract.id)}
                actions={{
                  viewPath: `/containermanage/clientcontainers/${contract.id}`,
                  editPath: `/documentmanage/subcontractors/edit/${contract.id}`,
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
        {/* <Pagination
          onPageChange={handlePageChange}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalElementsCount={
            BodyRowDataOfClientContainers?.totalElementsCount ?? 0
          }
        /> */}

        {/* Displaying Total Users */}
        <div className="flex items-center space-x-2 mr-5">
          <span className="text-gray-700">
            {/* Total: {BodyRowDataOfClientContainers?.totalElementsCount} users */}
          </span>
        </div>
      </div>
    </>
  );
};

export default ClientContractTable;
