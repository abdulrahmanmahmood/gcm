"use client";
import { fetchOneData } from "@/app/_utils/general/FetchOneData";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { BiMapPin } from "react-icons/bi";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const ContainerViewPage = ({ params }: { params: { container: string } }) => {
  const containerId = parseInt(params.container, 10);

  const {
    data: container,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["viewContainer", containerId],
    queryFn: () =>
      fetchOneData(`management/container`, containerId, "Fetch Container"),
    select: (data: any) => data.data,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Error loading container data.
        </div>
      </div>
    );
  }

  if (!container) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
          No container data available.
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="container mx-auto p-6 ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex w-full justify-between px-5">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Container Details #{container.id}
            </h2>
          </div>
          {/* Edit Button */}
          <Link href={`/containermanage/clientcontainers/edit/${container.id}`}>
            <button
              // onClick={handleEditClick}
              className="bg-petrol text-white flex items-center px-4 w-[90px] h-[40px] rounded-lg hover:bg-petrol-dark focus:outline-none focus:ring-2 focus:ring-petrol"
            >
              <FaEdit className="mr-2" />
              Edit
            </button>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Info Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Waste Type
                </h3>
                <p className="mt-1 text-lg font-semibold">
                  {container.wasteType.toLowerCase().replace(/_/g, " ")}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    container.status
                  )}`}
                >
                  {container.status.toLowerCase()}
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Volume</h3>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-semibold">
                    {container.volume.value.toFixed(2)}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {container.volume.unit.toLowerCase()}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-semibold">
                    {container.weight.value.toFixed(2)}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {container.weight.unit.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="border-t pt-6">
            <div className="flex items-center">
              <BiMapPin className="w-5 h-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">
                Location
              </h3>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Latitude</h4>
                <p className="mt-1 text-lg font-semibold">
                  {container.location.latitude.toFixed(6)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Longitude</h4>
                <p className="mt-1 text-lg font-semibold">
                  {container.location.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer containerId={"containerView"} />
    </div>
  );
};

export default ContainerViewPage;
