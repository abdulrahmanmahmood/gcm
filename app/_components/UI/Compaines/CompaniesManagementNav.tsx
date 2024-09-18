"use client";
import Link from "next/link";
import React, { useState } from "react";

interface IProps {
  onSearch: (keyword: string, filters: any) => void;
}

const CompaniesManagementNav = ({ onSearch }: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [registrationDate, setRegistrationDate] = useState<string>("");
  const [businessStatus, setBusinessStatus] = useState<string>(""); // Default to 'Active'

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    const filters = {
      filterCreatedDate: registrationDate ?? null,
      filterBusinessStatus: businessStatus, // Include business status
    };
    onSearch(keyword, filters); // Call the search handler immediately when typing
  };

  // Function to toggle the filter modal
  const toggleFilterModal = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleSearch = () => {
    const filters = {
      filterCreatedDate: registrationDate ?? null,
      filterBusinessStatus: businessStatus, // Include business status in the filters
    };
    onSearch(searchKeyword, filters);
    toggleFilterModal(); // Close the filter modal after applying filters
  };

  // Handle business status change
  const handleStatusChange = (status: string) => {
    setBusinessStatus(status); // Update business status state
  };

  return (
    <div className="w-full flex flex-row space-x-6 my-5 px-10">
      <input
        type="text"
        placeholder="Search here"
        className="bg-[#F5F7FB] w-[80%] px-3 mx-2 rounded-lg focus:border-petrol focus:ring-petrol"
        value={searchKeyword}
        onChange={handleSearchChange}
      />
      <div className="flex flex-row space-x-7">
        <div
          className="w-36 text-center rounded-lg text-white py-3 bg-petrol cursor-pointer"
          onClick={toggleFilterModal}
        >
          Filter
        </div>
        <Link
          href="/companymanage/clientcompanies/addcompany"
          className="w-36 text-center rounded-lg text-white py-3 bg-petrol cursor-pointer"
        >
          Add New
        </Link>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed top-[160px] right-[10%] z-50 w-auto h-auto bg-black bg-opacity-50">
          <div className="relative bg-white p-5 rounded-lg shadow-lg w-[600px]">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-petrol">Filters</h2>
              <button
                onClick={toggleFilterModal}
                className="text-gray-600 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 text-petrol">
              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">
                  Created Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                />
              </div>

              {/* Business Status Filters */}
              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">
                  Business Status
                </label>
                <div className="flex space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="ACTIVE"
                      checked={businessStatus === "ACTIVE"}
                      onChange={() => handleStatusChange("ACTIVE")}
                      className="form-radio text-petrol"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="INACTIVE"
                      checked={businessStatus === "INACTIVE"}
                      onChange={() => handleStatusChange("INACTIVE")}
                      className="form-radio text-petrol"
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="CLOSED"
                      checked={businessStatus === "CLOSED"}
                      onChange={() => handleStatusChange("CLOSED")}
                      className="form-radio text-petrol"
                    />
                    <span className="ml-2">Closed</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer with buttons */}
            <div className="mt-6 flex justify-between space-x-4">
              <button
                onClick={toggleFilterModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                className="bg-petrol text-white px-4 py-2 rounded-lg"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesManagementNav;
