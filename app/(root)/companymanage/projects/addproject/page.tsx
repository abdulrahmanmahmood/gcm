"use client";
import React, { useState } from "react";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import Image from "next/image";
import MapImage from "@/public/5462573_direction_google_gps_location_map_icon 1map.png";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"; // Optional: for better UX
import "react-toastify/dist/ReactToastify.css";

import { addProject } from "@/app/_utils/company/projects/addProject";

const Page = () => {
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const router = useRouter();

  // Define the mutation hook with the correct type
  const mutation = useMutation({
    mutationFn: (newProjectData) => addProject(newProjectData), // `newProjectData` matches the ProjectData interface
    onSuccess: () => {
      toast.success("Project added successfully!"); // Notify user on success
      setTimeout(() => {
        router.push("/companymanage/projects"); // Redirect to projects page after 2 seconds
      }, 2000);
    },
    onError: (error) => {
      console.error("Error adding project:", error);

      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to add project. Please try again.");
      }
    },
  });

  // Form submit handler
  const handleSave = () => {
    // Ensure the data matches the expected shape
    mutation.mutate({
      name,
      companyId,
      startDate,
      endDate,
      latitude,
      longitude,
    });
  };

  return (
    <div className="w-[80%] px-7 mx-auto p-5">
      <TitleAddAndEdit title="Add a Project" />

      {/* Form */}
      <form className="space-y-9 mt-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="flex flex-col my-4 mx-3">
            <label htmlFor="name" className="text-petrol font-semibold mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter project name"
            />
          </div>

          {/* Company Field */}
          <div className="flex flex-col my-4 mx-3">
            <label htmlFor="company" className="text-petrol font-semibold mb-1">
              Company
            </label>
            <input
              id="company"
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter company name"
            />
          </div>

          {/* Start Date Field */}
          <div className="flex flex-col my-4 mx-3">
            <label
              htmlFor="start-date"
              className="text-petrol font-semibold mb-1"
            >
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
            />
          </div>

          {/* End Date Field */}
          <div className="flex flex-col my-4 mx-3">
            <label
              htmlFor="end-date"
              className="text-petrol font-semibold mb-1"
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
            />
          </div>
        </div>

        <Image
          src={MapImage}
          alt="google map"
          sizes="200px"
          className="mx-auto my-10"
        />

        {/* Latitude and Longitude Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col my-4 mx-3">
            <label
              htmlFor="latitude"
              className="text-petrol font-semibold mb-1"
            >
              Latitude
            </label>
            <input
              id="latitude"
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter latitude"
            />
          </div>

          <div className="flex flex-col my-4 mx-3">
            <label
              htmlFor="longitude"
              className="text-petrol font-semibold mb-1"
            >
              Longitude
            </label>
            <input
              id="longitude"
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter longitude"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-[50%] flex flex-row justify-between">
          <button
            type="button"
            onClick={() => router.push("/projects")}
            className="bg-[#E8E8E8] text-black rounded-md px-6 py-2 hover:bg-petrol-dark focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-opacity-50 w-40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-petrol text-white rounded-md px-6 py-2 hover:bg-petrol-dark focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-opacity-50 w-40"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Page;
