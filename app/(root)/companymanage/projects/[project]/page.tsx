"use client";

import CompanyViewCardHeader from "@/app/_components/UI/Compaines/CompanyViewCardHeader";
import ViewProjectCard from "@/app/_components/UI/Compaines/prjects/ViewProjectCard";
import ViewProjectDetCard from "@/app/_components/UI/Compaines/prjects/ViewProjectDetCard";
import { getProject } from "@/app/_utils/company/projects/getProject";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Page = ({ params }: { params: { project: string } }) => {
  const projectId = parseInt(params.project, 10);

  const { data, error, isLoading } = useQuery({
    queryKey: ["viewPrject", projectId], // Query key
    queryFn: () => getProject(projectId), // Fetch function
    select: (data) => data.data,
  });
  if (data) {
    console.log(data);
  }
  const project = data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project data.</div>;
  return (
    <div className="w-[80%] mx-auto p-5 space-y-10 flex flex-col justify-between items-center">
      <ViewProjectCard project={project} />
      <ViewProjectDetCard
        Name={project.name}
        createdDate={project.createdDate}
        endDate={project.endDate}
        remain={project.remainCost}
        startDate={project.startDate}
        total={project.totalCost}
        location={(project.Longitude, project.latitude)}
        modifiedDate={project.modifiedDate}
      />

      <div className="w-full my-10  ">
        <div className="flex flex-row justify-between">
          <h1 className="justify-center mx-auto text-center text-petrol font-bold text-2xl">
            Employee Access
          </h1>
          <button className="justify-end w-[200px] bg-petrol text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
        <input
          type="text"
          placeholder="Search here"
          className="bg-[#F5F7FB] w-[90%] px-3 py-2 my-4 mx-auto border-[#6B779A1A] border-2 rounded-lg focus:border-petrol focus:ring-petrol"
          // value={searchKeyword}
          // onChange={handleSearchChange}
        />
        <table>
          <thead className="bg-gray-50 text-petrol">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="size-5 text-petrol bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                {/* <label htmlFor="checkbox-all" className="sr-only">
            checkbox
          </label> */}
              </th>
              <th className="text-center px-6 py-4 font-medium text-petrol text-xl cursor-pointer">
                Employee Name
              </th>
              <th className="text-center px-6 py-4 font-medium text-petrol text-xl cursor-pointer">
                {" "}
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 max-h-[60vh]">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap mx-auto ">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="size-5 text-petrol bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {/* <label htmlFor="checkbox-all" className="sr-only">
          checkbox
        </label> */}
                </div>
              </td>
              <td className="text-center px-6 py-4 text-petrol text-xl">
                asdfjkasdf
              </td>
              <td className="text-center px-6 py-4 text-petrol text-xl">
                01122880765
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
