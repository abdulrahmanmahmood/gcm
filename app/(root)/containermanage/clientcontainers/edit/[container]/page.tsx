"use client";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import { fetchOneData } from "@/app/_utils/general/FetchOneData";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const page = ({ params }: { params: { container: string } }) => {
  const containerId = parseInt(params.container, 10);

  // Fetch container data
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

  // Initialize form with container data once it's loaded
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (container) {
      reset({
        wasteType: container.wasteType || "",
        status: container.status || "",
        volume: container.volume?.value || "",
        weight: container.weight?.value || "",
        latitude: container.location?.latitude || "",
        longitude: container.location?.longitude || "",
      });
    }
  }, [container, reset]);

  const onsubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

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

  return (
    <div className="p-5">
      <div className="flex flex-col justify-between">
        <TitleAddAndEdit title="Edit Container" />
        <div>
          <form
            className="space-y-6 my-9"
            method="POST"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div className="w-full flex justify-end">
              <button className="flex items-center justify-center space-x-2 bg-petrol text-2xl font-semibold w-[160px] py-3 px-2 rounded-lg text-white">
                Save
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-petrol">Waste Type *</label>
                <input
                  type="text"
                  {...register("wasteType", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.wasteType && (
                  <p className="text-red-500">Waste Type is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Status *</label>
                <input
                  type="text"
                  {...register("status", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.status && (
                  <p className="text-red-500">Status is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Volume (Liters) *</label>
                <input
                  type="float"
                  {...register("volume", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.volume && (
                  <p className="text-red-500">Volume is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">
                  Weight (Kilograms) *
                </label>
                <input
                  type="float"
                  {...register("weight", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.weight && (
                  <p className="text-red-500">Weight is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Latitude *</label>
                <input
                  type="number"
                  step="any"
                  {...register("latitude", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.latitude && (
                  <p className="text-red-500">Latitude is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Longitude *</label>
                <input
                  type="number"
                  step="any"
                  {...register("longitude", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.longitude && (
                  <p className="text-red-500">Longitude is required</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
