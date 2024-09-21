import { Project } from "@/app/_interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";

interface Iprops {
  project: Project;
}

const ViewProjectCard = ({ project }: Iprops) => {
  return (
    <div className="w-full my-5 mx-auto  space-y-6 justify-between items-center">
      {/* Back Icon */}
      <IoIosArrowDropleftCircle
        className="text-petrol text-4xl cursor-pointer"
        // onClick={handleBackClick}
      />

      {/* Project Details */}
      <div className="w-full  flex flex-row justify-between">
        <div className="flex items-center space-x-4">
          {/* Project Logo */}
          {project.company.logoExists ? (
            <Image
              src={project?.company?.logo ?? ""} // Use actual logo path if available
              alt={project.name}
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <div className="w-[95px] h-[95px] flex items-center justify-center rounded-full bg-gray-200">
              <span className="text-lg font-semibold text-gray-500 uppercase">
                {project.name.slice(0, 2)}
              </span>
            </div>
          )}

          {/* Project Name and Details */}
          <div className="flex flex-col">
            <h1 className="text-petrol text-3xl font-semibold">
              {project.name}
            </h1>
            <div className="text-gray-600 text-sm">
              <span className="font-semibold">ID: </span> {project.id}
              <span className="ml-4">
                <span className="font-semibold">Status: </span>
                <span className="text-green-600">
                  {project.status.toLowerCase()}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <Link href={`/companymanage/projects/edit/${project.id}`}>
          <button
            // onClick={handleEditClick}
            className="bg-petrol text-white flex items-center px-4 w-[90px] h-[40px] rounded-lg hover:bg-petrol-dark focus:outline-none focus:ring-2 focus:ring-petrol"
          >
            <FaEdit className="mr-2" />
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewProjectCard;
