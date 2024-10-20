import Link from "next/link";
import React, { useState } from "react";

interface IProps {
  onSearch: (keyword: string, filters: any) => void;
}

const MaintenanceNav = ({ onSearch }: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [year, setYear] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    applyFilters(keyword);
  };

  const toggleFilterModal = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const applyFilters = (keyword: string = searchKeyword) => {
    const filters = {
      filterStatuses: statuses,
      filterTypes: types || null,
      filterYear: year || null,
    };
    onSearch(keyword, filters);
  };

  const handleSearch = () => {
    applyFilters();
    toggleFilterModal();
  };

  const handleStatusChange = (status: string) => {
    setStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleTypeChange = (type: string) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
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
          href="/maintenance/vehicle/add"
          className="w-36 text-center rounded-lg text-white py-3 bg-petrol cursor-pointer"
        >
          Add New
        </Link>
      </div>

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
            <div className="grid grid-cols-2 gap-4 text-petrol">
              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">Year</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  placeholder="Enter year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium m-1">
                  Statuses
                </label>
                <div className="flex flex-wrap gap-2">
                  {["AVAILABLE", "IN_MAINTENANCENav", "IN_USE"].map(
                    (status) => (
                      <label key={status} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-petrol"
                          checked={statuses.includes(status)}
                          onChange={() => handleStatusChange(status)}
                        />
                        <span className="ml-2">{status}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium m-1">Types</label>
                <div className="flex flex-wrap gap-2">
                  {["CAR", "SEMI_TRACTOR"].map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-petrol"
                        checked={types.includes(type)}
                        onChange={() => handleTypeChange(type)}
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
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

export default MaintenanceNav;
