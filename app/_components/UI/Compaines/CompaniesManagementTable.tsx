"use client";
import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/app/_utils/Pagination";
import CompaniesManagementNav from "./CompaniesManagementNav";
import CMHeader from "./CMHeader";
import { Company, CompanyAxiosResponse } from "@/app/_interfaces";
import CMTHeader from "./CMTHeader";
import CMBRow from "./CMBRow";
import { FetchCCompanies } from "@/app/_utils/company/clienCompany/FetchCCompanies";

function CompaniesManagementTable() {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string[]>(["ID_ASC"]); // Default sort by ID ascending

  const { data, error, isLoading, refetch } = useQuery<CompanyAxiosResponse>({
    queryKey: ["users", pageNumber, pageSize, searchKeyword, filters, sortBy],
    queryFn: () =>
      FetchCCompanies(pageNumber, pageSize, searchKeyword, filters, sortBy),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  if (data) {
    console.log("company data", data);
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
    Name: "NAME",
    id: "ID",
    status: "STATUS",
    industry: "INDUSTRY",
    email: "EMAIL",
    registrationDate: "CREATED_DATE",
    // enabled: "ENABLED",
    // locked: "LOCKED",
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
      <CompaniesManagementNav
        onSearch={handleSearch}
        link="/companymanage/clientcompanies/addcompany"
      />
      <CMHeader />

      {/* component */}
      <div className="flex gap-5 justify-end p-5">
        <button className="p-2 px-5 rounded-md bg-gray-100 text-[#2e7490] text-[18px] flex gap-3 items-center cursor-pointer border border-gray-200">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0001 2C6.48006 2 2.00006 6.48 2.00006 12C2.00006 17.52 6.48006 22 12.0001 22C17.5201 22 22.0001 17.52 22.0001 12C22.0001 6.48 17.5201 2 12.0001 2ZM10.0001 17L5.00012 12L6.41012 10.59L10.0001 14.17L17.5901 6.57999L19.0001 7.99999L10.0001 17Z"
              fill="#0DC30D"
            />
          </svg>
          <span>Active</span>
        </button>
        <button className="p-2 px-5 rounded-md bg-gray-100 text-[#2e7490] text-[18px] flex gap-3 items-center cursor-pointer border border-gray-200 ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_527_4737)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.34357 0.298698C10.9969 -0.0766209 12.7111 -0.0973244 14.373 0.237952C16.035 0.573228 17.607 1.25687 18.9856 2.24384C20.3641 3.23081 21.5179 4.49869 22.3708 5.96395C23.2238 7.42921 23.7566 9.05858 23.9341 10.7447C23.9653 11.0415 23.8774 11.3385 23.6896 11.5704C23.5018 11.8024 23.2296 11.9502 22.9328 11.9814C22.636 12.0127 22.339 11.9247 22.1071 11.737C21.8751 11.5492 21.7273 11.277 21.6961 10.9802C21.5032 9.14813 20.7953 7.40818 19.6543 5.96189C18.5133 4.5156 16.9859 3.42214 15.2491 2.80819C13.5122 2.19423 11.6369 2.0849 9.84048 2.49285C8.04404 2.90081 6.39992 3.80935 5.09858 5.11325C3.79724 6.41715 2.89192 8.06304 2.48749 9.86028C2.08306 11.6575 2.19607 13.5326 2.81343 15.2682C3.43079 17.0039 4.52724 18.5291 5.97576 19.6673C7.42429 20.8055 9.16563 21.51 10.9981 21.6992C11.1461 21.713 11.2899 21.756 11.4212 21.8257C11.5525 21.8955 11.6687 21.9905 11.7631 22.1054C11.8574 22.2203 11.9281 22.3528 11.9709 22.4951C12.0138 22.6375 12.028 22.787 12.0127 22.9348C11.9974 23.0827 11.953 23.2261 11.882 23.3567C11.811 23.4874 11.7148 23.6026 11.5989 23.6958C11.4831 23.789 11.3499 23.8583 11.2072 23.8998C11.0644 23.9412 10.9148 23.9539 10.7671 23.9372C7.93644 23.646 5.30142 22.3583 3.33233 20.3041C1.36323 18.2498 0.188211 15.5627 0.0169934 12.7223C-0.154224 9.88184 0.689503 7.07301 2.39758 4.79711C4.10566 2.52121 6.56692 0.92635 9.34207 0.297198L9.34357 0.298698ZM16.9201 15.3287C16.8162 15.2213 16.6921 15.1357 16.5548 15.0768C16.4175 15.0179 16.2699 14.9869 16.1205 14.9857C15.9711 14.9844 15.823 15.013 15.6847 15.0696C15.5465 15.1262 15.4209 15.2098 15.3154 15.3155C15.2098 15.4212 15.1263 15.5468 15.0698 15.6851C15.0133 15.8234 14.9849 15.9716 14.9863 16.1209C14.9877 16.2703 15.0188 16.4179 15.0778 16.5551C15.1368 16.6924 15.2226 16.8165 15.3301 16.9202L17.9101 19.5002L15.3301 22.0802C15.2195 22.1832 15.1309 22.3074 15.0694 22.4454C15.0079 22.5834 14.9748 22.7324 14.9722 22.8834C14.9695 23.0345 14.9973 23.1845 15.0539 23.3246C15.1105 23.4647 15.1947 23.5919 15.3015 23.6988C15.4083 23.8056 15.5356 23.8898 15.6757 23.9464C15.8158 24.003 15.9658 24.0308 16.1168 24.0281C16.2679 24.0254 16.4169 23.9924 16.5549 23.9309C16.6929 23.8694 16.8171 23.7807 16.9201 23.6702L19.5001 21.0902L22.0801 23.6702C22.1831 23.7807 22.3073 23.8694 22.4453 23.9309C22.5833 23.9924 22.7322 24.0254 22.8833 24.0281C23.0343 24.0308 23.1844 24.003 23.3245 23.9464C23.4645 23.8898 23.5918 23.8056 23.6986 23.6988C23.8055 23.5919 23.8897 23.4647 23.9463 23.3246C24.0028 23.1845 24.0306 23.0345 24.028 22.8834C24.0253 22.7324 23.9922 22.5834 23.9307 22.4454C23.8692 22.3074 23.7806 22.1832 23.6701 22.0802L21.0901 19.5002L23.6701 16.9202C23.7806 16.8172 23.8692 16.693 23.9307 16.555C23.9922 16.417 24.0253 16.268 24.028 16.117C24.0306 15.9659 24.0028 15.8159 23.9463 15.6758C23.8897 15.5357 23.8055 15.4085 23.6986 15.3016C23.5918 15.1948 23.4645 15.1106 23.3245 15.054C23.1844 14.9974 23.0343 14.9696 22.8833 14.9723C22.7322 14.975 22.5833 15.008 22.4453 15.0695C22.3073 15.131 22.1831 15.2197 22.0801 15.3302L19.5001 17.9102L16.9201 15.3287ZM17.2951 9.4202C17.4938 9.20694 17.602 8.92487 17.5968 8.63341C17.5917 8.34196 17.4736 8.06388 17.2675 7.85777C17.0614 7.65165 16.7833 7.53358 16.4918 7.52844C16.2004 7.52329 15.9183 7.63148 15.7051 7.8302L9.75007 13.7852L7.92007 11.9552C7.7068 11.7565 7.42473 11.6483 7.13328 11.6534C6.84183 11.6586 6.56375 11.7766 6.35763 11.9828C6.15151 12.1889 6.03345 12.467 6.0283 12.7584C6.02316 13.0499 6.13135 13.3319 6.33007 13.5452L8.95507 16.1702C9.166 16.3809 9.45194 16.4992 9.75007 16.4992C10.0482 16.4992 10.3341 16.3809 10.5451 16.1702L17.2951 9.4202Z"
                fill="#C32B43"
              />
            </g>
            <defs>
              <clipPath id="clip0_527_4737">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>Inactive</span>
        </button>
        <button className="p-2 px-5 rounded-md bg-gray-100 text-[#2e7490] text-[18px] flex gap-3 items-center cursor-pointer border border-gray-200 ">
          <svg
            width="16"
            height="21"
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 21C1.45 21 0.979333 20.8043 0.588 20.413C0.196666 20.0217 0.000666667 19.5507 0 19V9C0 8.45 0.196 7.97933 0.588 7.588C0.98 7.19667 1.45067 7.00067 2 7H3V5C3 3.61667 3.48767 2.43767 4.463 1.463C5.43833 0.488334 6.61733 0.000667349 8 6.82594e-07C9.38267 -0.000665984 10.562 0.487001 11.538 1.463C12.514 2.439 13.0013 3.618 13 5V7H14C14.55 7 15.021 7.196 15.413 7.588C15.805 7.98 16.0007 8.45067 16 9V19C16 19.55 15.8043 20.021 15.413 20.413C15.0217 20.805 14.5507 21.0007 14 21H2ZM2 19H14V9H2V19ZM8 16C8.55 16 9.021 15.8043 9.413 15.413C9.805 15.0217 10.0007 14.5507 10 14C9.99933 13.4493 9.80367 12.9787 9.413 12.588C9.02233 12.1973 8.55133 12.0013 8 12C7.44867 11.9987 6.978 12.1947 6.588 12.588C6.198 12.9813 6.002 13.452 6 14C5.998 14.548 6.194 15.019 6.588 15.413C6.982 15.807 7.45267 16.0027 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z"
              fill="#C32B43"
            />
          </svg>

          <span>Closed</span>
        </button>
      </div>
      <div className="overflow-auto h-[72vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap ">
          <CMTHeader sortBy={sortBy} onSort={handleSort} />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100  max-h-[60vh]">
            {data?.content?.map((user: Company) => (
              <CMBRow
                key={user.id}
                user={user}
                editLink={`/companymanage/clientcompanies/edit/${user.id}`}
                viewLink={`/companymanage/clientcompanies/${user.id}`}
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

export default CompaniesManagementTable;
