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
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );
  const [selectedPermitFile, setSelectedPermitFile] = useState<File | null>(
    null
  );

  const [documentUrls, setDocumentUrls] = useState<string[]>([]);

  const {
    data: vehicle,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["viewVehicle", vehicleId],
    queryFn: () =>
      fetchOneData(`management/vehicle`, vehicleId, "Fetch Vehicle"),
    select: (data: any) => data.data,
  });

  useEffect(() => {
    if (vehicle?.permits) {
      const urls = vehicle.permits.map((permit: any) => {
        if (permit.attachment) {
          const byteCharacters = atob(permit.attachment.data);
          const byteNumbers = new Array(byteCharacters.length)
            .fill(0)
            .map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: permit.attachment.contentType,
          });
          return URL.createObjectURL(blob);
        }
        return null;
      });
      setDocumentUrls(urls.filter(Boolean));
    }
  }, [vehicle]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicle data.</div>;
  if (!vehicle) return <div>No vehicle data available.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Vehicle Details</h2>
      <VehiclePictures
        vehicleId={vehicleId}
        pictures={vehicle.pictures}
        refetch={refetch}
      />

      <div className="bg-white shadow-xl border-2 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-petrol text-center mb-5">
          Vehicle Information
        </h3>
        <div className="flex flex-wrap justify-between px-5 mx-auto py-10">
          <p>
            <strong className="text-petrol">Manufacturer:</strong>{" "}
            {vehicle.manufacturer}
          </p>
          <p>
            <strong className="text-petrol">Model:</strong> {vehicle.model}
          </p>
          <p>
            <strong className="text-petrol">Color:</strong> {vehicle.color}
          </p>
          <p>
            <strong className="text-petrol">License Plate:</strong>{" "}
            {vehicle.licensePlate}
          </p>
          <p>
            <strong className="text-petrol">Year:</strong> {vehicle.year}
          </p>
          <p>
            <strong className="text-petrol">Status:</strong> {vehicle.status}
          </p>
          <p>
            <strong className="text-petrol">Type:</strong> {vehicle.type}
          </p>
        </div>
      </div>

      <LicenseInformation
        refetch={refetch}
        vehicleId={vehicleId}
        license={vehicle.license}
      />

      <PermitInformation
        vehicleId={vehicleId}
        permits={vehicle.permits}
        refetch={refetch}
      />

      <ToastContainer  containerId={"vheicleContainer"}/>
    </div>
  );
};

export default VehicleViewPage;
