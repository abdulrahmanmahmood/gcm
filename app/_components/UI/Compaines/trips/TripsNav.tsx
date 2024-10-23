import Link from "next/link";
import React, { useState } from "react";

interface IProps {
  onSearch: (keyword: string, filters: any) => void;
}

const TripsNav = ({ onSearch }: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [finishDateTime, setFinishDateTime] = useState("");
  const [vehicle, setVehicle] = useState("");

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

      filterScheduleDate: scheduleDate || null,
      filterFinishDateTime: finishDateTime || null,
      filterVehicle: vehicle || null,
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
          href="/companymanage/trips/add"
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
              {/* Schedule Date Filter */}
              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">
                  Schedule Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>

              {/* Finish Date/Time Filter */}
              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">
                  Finish Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  value={finishDateTime}
                  onChange={(e) => setFinishDateTime(e.target.value)}
                />
              </div>

              {/* Vehicle Filter */}
              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">Vehicle</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  placeholder="Enter vehicle"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium m-1">
                  Statuses
                </label>
                <div className="flex flex-wrap gap-2">
                  {["IN_PROGRESS", "COMPLETED", "CANCELLED"].map((status) => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-petrol"
                        checked={statuses.includes(status)}
                        onChange={() => handleStatusChange(status)}
                      />
                      <span className="ml-2">{status}</span>
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

export default TripsNav;
