"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import placeholderImage from "../../../../../public/healthicons_ui-user-profile.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import { getCookie } from "cookies-next";
import addVehicle, { IVehicleInput } from "@/app/_utils/vehicle/Add";
import {
  addVehicleMaintenance,
  IVehicleMaintenanceInput,
} from "@/app/_utils/vehicle/maintenance.ts/Add";

const STATUS_OPTIONS = {
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const AddVehiclePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVehicleMaintenanceInput>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // State for image previews
  const [imageFiles, setImageFiles] = useState<File[]>([]); // State for the actual image files
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [permitFile, setPermitFile] = useState<File | null>(null);
  const router = useRouter();
  const token = getCookie("token"); // Retrieve token from cookies
  // Function to format datetime to the required format
  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  // Custom validation function for datetime format
  const validateDateTime = (value: string) => {
    const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/;
    if (!pattern.test(value)) {
      return false;
    }

    const [datePart, timePart] = value.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hourPart, minutePart, secondPart] = timePart.split(":");
    const [seconds, milliseconds] = secondPart.split(".");

    // Validate ranges
    return (
      year >= 1900 &&
      year <= 9999 &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31 &&
      Number(hourPart) >= 0 &&
      Number(hourPart) <= 23 &&
      Number(minutePart) >= 0 &&
      Number(minutePart) <= 59 &&
      Number(seconds) >= 0 &&
      Number(seconds) <= 59 &&
      Number(milliseconds) >= 0 &&
      Number(milliseconds) <= 999
    );
  };

  const mutation = useMutation({
    mutationFn: (maintenanceData: IVehicleMaintenanceInput) =>
      addVehicleMaintenance(maintenanceData),
    onSuccess: (data: any) => {
      toast.success("Vehicle maintenance successfully added!");
      console.log("Vehicle maintenance successfully added", data);
      // Optional: Redirect or perform other actions on success
    },
    onError: (error: any) => {
      console.error("Error adding vehicle:", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, {
          autoClose: 2000,
          toastId: "fetchUsersError",
        });
        console.log(error);
      } else {
        toast.error("Failed to add maintenance company. Please try again.");
        console.log(error);
      }
    },
  });
  const onSubmit = (data: IVehicleMaintenanceInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-full w-full overflow-x-auto">
      <TitleAddAndEdit title="Add Vehicle Maintenance" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded-2xl border-stone-200 bg-light/30 p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-petrol">Description *</label>
              <input
                type="text"
                {...register("description", {
                  required: "Description is required",
                })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label className="block text-petrol">Status *</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="border rounded-lg w-full px-3 py-2"
              >
                <option value="">Select Status</option>
                {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">In Charge *</label>
              <input
                type="text"
                {...register("inCharge", { required: "In Charge is required" })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.inCharge && (
                <p className="text-red-500">{errors.inCharge.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">
                Finish Date Time * (yyyy-MM-ddThh:mm:ss.sss)
              </label>
              <input
                type="datetime-local"
                step="0.001"
                {...register("finishDateTime", {
                  required: "Finish Date Time is required",
                  validate: {
                    format: (value) =>
                      validateDateTime(formatDateTime(value)) ||
                      "Invalid format. Use: yyyy-MM-ddThh:mm:ss.sss",
                  },
                })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.finishDateTime && (
                <p className="text-red-500">{errors.finishDateTime.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">Schedule Date *</label>
              <input
                type="date"
                {...register("scheduleDate", {
                  required: "Schedule Date is required",
                })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.scheduleDate && (
                <p className="text-red-500">{errors.scheduleDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">Vehicle ID *</label>
              <input
                type="text"
                {...register("vehicleId", {
                  required: "Vehicle ID is required",
                })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.vehicleId && (
                <p className="text-red-500">{errors.vehicleId.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between my-10 px-10">
            <button
              type="button"
              className="px-6 py-3 bg-gray-400 text-white rounded-lg"
              onClick={() => router.push("/vehicles")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-petrol text-white rounded-lg"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Add Vehicle Maintenance"}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddVehiclePage;
