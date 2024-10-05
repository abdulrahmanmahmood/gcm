"use client";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import React from "react";
import { useForm } from "react-hook-form";

const page = ({ params }: { params: { container: string } }) => {
  const containerId = parseInt(params.container, 10); // Convert the container ID from string to number
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = () => {
    console.log("Form submitted");
  };

  return (
    <div className="p-5">
      <div className="flex flex-col justify-between">
        <TitleAddAndEdit title="Edit a  Containers" />
        <div>
          <form
            className=" space-y-6 my-9"
            method="POST"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div className="w-full flex justify-end">
              <button className="flex items-center justify-center space-x-2 bg-petrol text-2xl font-semibold w-[160px] py-3 px-2 rounded-lg text-white">
                Save{" "}
              </button>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-petrol">WasteType *</label>
                <input
                  type="text"
                  {...register("fullName", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.fullName && (
                  <p className="text-red-500">WasteType is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">volume *</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.email && (
                  <p className="text-red-500">volume is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol"> *</label>
                <input
                  type="text"
                  {...register("website", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.website && (
                  <p className="text-red-500">website is required</p>
                )}
              </div>
              <div>
                <label className="block text-petrol">weight *</label>
                <input
                  type="text"
                  {...register("faxNumber", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.website && (
                  <p className="text-red-500">website is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">industry</label>
                <input
                  type="text"
                  {...register("industry", { required: true })} // Optional: Use valueAsNumber to make sure it's treated as a number
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-petrol">Head Name</label>
                <input
                  type="text"
                  {...register("headName", { required: true })} // Optional: Use valueAsNumber to make sure it's treated as a number
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Head Email</label>
                <input
                  type="text"
                  {...register("headEmail", { required: true })} // Optional: Use valueAsNumber to make sure it's treated as a number
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Head Phone Number</label>
                <input
                  type="text"
                  {...register("headPhoneNumber")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-xl font-semibold bg-petrol text-white py-3 text-center rounded-lg mb-4">
                Address
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700">Street</label>
                  <input
                    type="text"
                    {...register("street")}
                    className="border rounded-lg w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    {...register("zipCode")}
                    className="border rounded-lg w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    {...register("city")}
                    className="border rounded-lg w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">State</label>
                  <input
                    type="text"
                    {...register("state")}
                    className="border rounded-lg w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Country</label>
                  <input
                    type="text"
                    {...register("country")}
                    className="border rounded-lg w-full px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default page;
