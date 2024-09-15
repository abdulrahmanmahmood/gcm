import Link from "next/link";
import React, { useState } from "react";

interface IProps {
  onSearch: (keyword: string, filters: any) => void;
}
const ProjectsManagementNav= ({ onSearch }: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [locked, setLocked] = useState<string | boolean>(""); // Empty string for unset state
  const [enabled, setEnabled] = useState<string | boolean>("");
  const [gender, setGender] = useState<string>("");
  const [authorities, setAuthorities] = useState<string>("");
  const [registrationDate, setRegistrationDate] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [salary, setSalary] = useState<number | "">("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    const filters = {
      filterEnabled: enabled ?? null,
      filterLocked: locked ?? null,
      filterGenders: gender ? [gender] : null,
      filterAuthorities: authorities ? [authorities] : null,
      filterRegistrationDate: registrationDate ?? null,
      filterBirthDate: birthDate ?? null,
      filterSalary: salary ?? null,
    };
    onSearch(keyword, filters); // Call the search handler immediately when typing
  };

  // Function to toggle the filter modal
  const toggleFilterModal = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleSearch = () => {
    const filters = {
      filterEnabled: enabled ?? null,
      filterLocked: locked ?? null,
      filterGenders: gender ? [gender] : null,
      filterAuthorities: authorities ? [authorities] : null,
      filterRegistrationDate: registrationDate ?? null,
      filterBirthDate: birthDate ?? null,
      filterSalary: salary ?? null,
    };
    onSearch(searchKeyword, filters);
    toggleFilterModal(); // Close the filter modal after applying filters
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
          href="/usermanage/users/adduser"
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
            <div className="grid grid-cols-2 gap-4 text-petrol">
              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">Locked</label>
                <select
                  className="select select-bordered w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-petrol focus:border-petrol"
                  value={locked.toString()} // Convert the boolean to a string
                  onChange={(e) => setLocked(e.target.value === "true")} // Convert the string back to a boolean
                >
                  <option value="">Locked</option> {/* Empty option */}
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">Enable</label>
                <select
                  className="select select-bordered w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-petrol focus:border-petrol"
                  value={enabled.toString()} // Convert the boolean to a string
                  onChange={(e) => setEnabled(e.target.value === "true")} // Convert the string back to a boolean
                >
                  <option value="">Enable</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">
                  Registration Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">Gender</label>
                <select
                  className="select select-bordered w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-petrol focus:border-petrol"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">
                  Birth Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium m-1">Salary</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-petrol focus:border-petrol"
                  placeholder="Enter Salary"
                  value={salary}
                  onChange={(e) => setSalary(parseFloat(e.target.value))}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium m-1">
                  Authorities
                </label>
                <select
                  className="select select-bordered w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-petrol focus:border-petrol"
                  value={authorities}
                  onChange={(e) => setAuthorities(e.target.value)}
                >
                  <option value="">Authorities</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
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

export default  ProjectsManagementNav