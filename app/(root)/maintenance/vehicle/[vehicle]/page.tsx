"use client";
import { fetchOneData } from "@/app/_utils/general/FetchOneData";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import VehiclePictures from "@/app/_components/UI/vehicles/VehiclePictureSwaper";
import PermitInformation from "@/app/_components/UI/vehicles/PermitInformation";
import LicenseInformation from "@/app/_components/UI/vehicles/LisencesInformation";

const VehicleViewPage = ({ params }: { params: { vehicle: string } }) => {
  const vehicleId = parseInt(params.vehicle, 10);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const {
    data: vehicle,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["viewVehicle", vehicleId],
    queryFn: () =>
      fetchOneData(
        `management/vehicle/maintenance`,
        vehicleId,
        "Fetch Vehicle"
      ),
    select: (data: any) => data.data,
  });
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicle data.</div>;
  if (!vehicle) return <div>No vehicle data available.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Vehicle Maintenance Details</h2>

      {/* Maintenance Information Section */}
      <div className="bg-white shadow-xl border-2 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-petrol text-center mb-5">
          Maintenance Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 mx-auto py-10">
          <div>
            <p className="mb-4">
              <strong className="text-petrol">Schedule Date:</strong>{" "}
              {formatDate(vehicle.scheduleDate)}
            </p>
            <p className="mb-4">
              <strong className="text-petrol">Description:</strong>{" "}
              {vehicle.description}
            </p>
            <p className="mb-4">
              <strong className="text-petrol">Status:</strong>{" "}
              <span
                className={`font-medium ${
                  vehicle.status === "IN_PROGRESS"
                    ? "text-yellow-600"
                    : vehicle.status === "COMPLETED"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {vehicle.status.replace("_", " ")}
              </span>
            </p>
          </div>
          <div>
            <p className="mb-4">
              <strong className="text-petrol">In Charge:</strong>{" "}
              {vehicle.inCharge}
            </p>
            <p className="mb-4">
              <strong className="text-petrol">Created Date:</strong>{" "}
              {formatDateTime(vehicle.createdDate)}
            </p>
            {vehicle.finishDateTime && (
              <p className="mb-4">
                <strong className="text-petrol">Finish Date:</strong>{" "}
                {formatDateTime(vehicle.finishDateTime)}
              </p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer containerId={"vheicleContainer"} />
    </div>
  );
};

export default VehicleViewPage;
