"use client";

import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import React, { useState, useEffect } from "react";
import MapImage from "@/public/5462573_direction_google_gps_location_map_icon 1map.png";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getProject } from "@/app/_utils/company/projects/getProject";
import { updateEntity } from "@/app/_utils/general/Update";

const Page = ({ params }: { params: { project: string } }) => {
  const projectId = parseInt(params.project, 10);
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Use `useQuery` to fetch project data
  const { data, error, isLoading } = useQuery({
    queryKey: ["editProject", projectId], // Query key
    queryFn: () => getProject(projectId), // Fetch function
    select: (data) => data.data,
  });

  useEffect(() => {
    if (data) {
      const project = data;
      console.log("project", project);

      // Populate the form fields when data is successfully fetched
      setName(project.name);
      setCompany(project.company.name); // Access company name from nested company object
      setStartDate(project.startDate);
      setEndDate(project.endDate);
      setLatitude(project.location.latitude); // Access latitude from location object
      setLongitude(project.location.longitude); // Access longitude from location object
    }

    if (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project data");
    }
  }, [data, error]);
  // Handle save action
  const mutation = useMutation({
    mutationFn: (updatedData) =>
      updateEntity(`management/project/${projectId}/update`, updatedData), // Dynamic endpoint
    onSuccess: () => {
      toast.success("Project updated successfully!");
      setTimeout(() => {
        router.push("/projectmanage"); // Redirect after success
      }, 2000);
    },
    onError: (error) => {
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
    },
  });

  // Handle save action
  const handleSave = () => {
    mutation.mutate({
      name,
      startDate,
      endDate,
      location: {
        latitude,
        longitude,
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project data.</div>;

  return (
    <div className=" w-[80%] px-7 mx-auto p-5">
      {/* Title */}
      <TitleAddAndEdit title="Edit a Project" />

      {/* Form */}
      <form className="space-y-6 mt-8">
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="bg-petrol text-white rounded-md px-6 py-2 hover:bg-petrol-dark focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-opacity-50 w-40"
          >
            Save
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="flex flex-col">
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
          <div className="flex flex-col">
            <label htmlFor="company" className="text-petrol font-semibold mb-1">
              Company
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter company name"
            />
          </div>

          {/* Start Date Field */}
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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

        {/* Image */}
        <Image
          src={MapImage}
          alt="google map"
          sizes="200px"
          className="mx-auto my-10"
        />

        {/* Latitude and Longitude Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
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

          <div className="flex flex-col">
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
      </form>
    </div>
  );
};

export default Page;
