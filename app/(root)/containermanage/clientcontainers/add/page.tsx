"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import { getCookie } from "cookies-next";
import { addEntity } from "@/app/_utils/general/AddEntity";
import { wasteTypeOptions } from "@/app/(root)/companymanage/trips/add/page";

const STATUS_OPTIONS = {
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};
interface NewContainer {
  id: string; // The unique identifier for the container
  wasteType: string; // The type of waste (e.g., organic, recyclable, etc.)
  volumeValue: number; // The volume of the container
  volumeUnit: string; // The unit of measurement for volume (e.g., liters, cubic meters)
  weightValue: number; // The weight of the container
  weightUnit: string; // The unit of measurement for weight (e.g., kg, pounds)
}

const AddClientContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewContainer>();

  const router = useRouter();
  // Function to format datetime to the required format

  const mutation = useMutation({
    mutationFn: (containerData: any) =>
      addEntity("/api/v1/management/container/new", containerData),
    onSuccess: (data: any) => {
      toast.success("Container successfully added!");
      console.log("Container successfully added", data);
      // Optional: Redirect or perform other actions on success
      router.push("/containers"); // Navigate to containers page or any other page
    },
    onError: (error: any) => {
      console.error("Error adding container:", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, {
          autoClose: 2000,
          toastId: "fetchUsersError",
        });
        console.log(error);
      } else {
        toast.error("Failed to add container. Please try again.");
        console.log(error);
      }
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  const volumeUnitOptions: any = [
    { value: "LITERS", label: "Liters" },
    { value: "cubic meters", label: "Cubic Meters" },
  ];
  return (
    <div className="h-full w-full overflow-x-auto">
      <TitleAddAndEdit title="Add Container" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded-2xl border-stone-200 bg-light/30 p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-petrol">Waste Type *</label>
              <select
                {...register("wasteType", {
                  required: "Waste Type is required",
                })}
                className="border rounded-lg w-full px-3 py-2"
              >
                <option value="">Select Waste Type</option>
                {wasteTypeOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.wasteType && (
                <p className="text-red-500">{errors.wasteType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">Volume Value *</label>
              <input
                type="number"
                {...register("volumeValue", {
                  required: "Volume Value is required",
                })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.volumeValue && (
                <p className="text-red-500">{errors.volumeValue.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">Volume Unit *</label>
              <select
                {...register("volumeUnit", {
                  required: "Volume Unit is required",
                })}
                className="border rounded-lg w-full px-3 py-2"
              >
                <option value="">Select Volume Unit</option>
                {volumeUnitOptions?.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.volumeUnit && (
                <p className="text-red-500">{errors.volumeUnit.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">Weight Value *</label>
              <input
                type="number"
                {...register("weightValue", {
                  required: "Weight Value is required",
                })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.weightValue && (
                <p className="text-red-500">{errors.weightValue.message}</p>
              )}
            </div>

            <div>
              <label className="block text-petrol">Weight Unit *</label>
              <select
                {...register("weightUnit", { required: true })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="KILOGRAMS">KILOGRAMS</option>
                <option value="TON">TON</option>
                <option value="POUNDS">POUNDS</option>
              </select>
            </div>
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
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddClientContainer;
