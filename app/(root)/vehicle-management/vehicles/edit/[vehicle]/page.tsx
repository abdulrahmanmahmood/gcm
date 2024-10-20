"use client";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateEntity } from "@/app/_utils/general/Update";
import { fetchOneData } from "@/app/_utils/general/FetchOneData";

const Page = ({ params }: { params: { vehicle: string } }) => {
  const vehicleId = parseInt(params.vehicle, 10);
  const router = useRouter();

  // Form state
  const [manufacturer, setManufacturer] = useState<string>("");
  const [licensePlate, setLicensePlate] = useState<string>(""); // Vehicle-specific field
  const [model, setModel] = useState<string>(""); // Vehicle-specific field
  const [color, setcolor] = useState<string>("");
  const [year, setyear] = useState<string>("");

  // Fetch vehicle data
  const { data, error, isLoading } = useQuery({
    queryKey: ["viewVehicle", vehicleId],
    queryFn: () =>
      fetchOneData(`management/vehicle`, vehicleId, "Fetch update Vehicle"),
    select: (data: any) => data.data,
  });

  useEffect(() => {
    if (data) {
      const vehicle = data;
      console.log("vehicle", vehicle);

      // Populate the form fields with the fetched data
      setManufacturer(vehicle.manufacturer);
      setLicensePlate(vehicle.licensePlate); // Populate vehicle-specific field
      setModel(vehicle.model); // Populate vehicle-specific field
      setcolor(vehicle.color);
      setyear(vehicle.year);
    }

    if (error) {
      console.error("Error fetching vehicle:", error);
      toast.error("Failed to load vehicle data");
    }
  }, [data, error]);

  // Mutation for updating vehicle
  const mutation = useMutation({
    mutationFn: (updatedData) =>
      updateEntity(`management/vehicle/${vehicleId}/update`, updatedData), // Dynamic endpoint for vehicles
    onSuccess: () => {
      toast.success("Vehicle updated successfully!");
      // setTimeout(() => {
      //   // router.push("/vehiclemanage"); // Redirect after success
      // }, 2000);
    },
    onError: (error) => {
      console.error("Error updating vehicle:", error);
      toast.error("Failed to update vehicle.");
    },
  });

  // Handle save action
  const handleSave = () => {
    mutation.mutate({
      manufacturer,
      licensePlate, // Include vehicle-specific field
      model, // Include vehicle-specific field
      year,
      color,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicle data.</div>;

  return (
    <div className=" w-[80%] px-7 mx-auto p-5">
      {/* Title */}
      <TitleAddAndEdit title="Edit Vehicle" />

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
            <label
              htmlFor="manufacturer"
              className="text-petrol font-semibold mb-1"
            >
              Manufacturer
            </label>
            <input
              id="manufacturer"
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter vehicle manufacturer"
            />
          </div>

          {/* License Plate Field */}
          <div className="flex flex-col">
            <label
              htmlFor="licensePlate"
              className="text-petrol font-semibold mb-1"
            >
              License Plate
            </label>
            <input
              id="licensePlate"
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter license plate"
            />
          </div>

          {/* Model Field */}
          <div className="flex flex-col">
            <label htmlFor="model" className="text-petrol font-semibold mb-1">
              Model
            </label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter vehicle model"
            />
          </div>

          {/* color Field */}
          <div className="flex flex-col">
            <label htmlFor="color" className="text-petrol font-semibold mb-1">
              color
            </label>
            <input
              id="color"
              type="text"
              value={color}
              onChange={(e) => setcolor(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter color"
            />
          </div>
        </div>

        {/* year and Longitude Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="year" className="text-petrol font-semibold mb-1">
              year
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setyear(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter year"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;


// const selectedIds = Object.keys(checkedRows)
// .filter((key) => checkedRows[Number(key)] === true) // Filter only true values
// .map(Number); // Convert keys to numbers
