"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "@/app/_utils/addUser";
import Image from "next/image";
import placeholderImage from "../../../../../public/healthicons_ui-user-profile.png";
import { getCookie } from "cookies-next";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the actual image file
  const router = useRouter();

  const token = getCookie("token");

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data: any) => {
      toast.success("User successfully added!");
      console.log("User successfully added", data);
      setTimeout(() => {
        router.push("/usermanage/users");
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Error adding user:", error);
      // Set the error message from the server response
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to add user. Please try again.");
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the selected file
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const onSubmit = async (data: any) => {
    const formData = { ...data, picture: imageFile };
    mutation.mutate(formData);
  };

  return (
    <div className=" h-full w-full overflow-x-auto py-9">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="space-y-6"
      >
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 p-6">
          {/* Image Section */}
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="profileImage" className="mb-4">
              <Image
                src={imagePreview || placeholderImage}
                alt="User Avatar"
                width={300}
                height={300}
                className="rounded-full object-cover"
              />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700">Name *</label>
              <input
                type="text"
                {...register("fullName", { required: true })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.fullName && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Email *</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Gender *</label>
              <div className="flex items-center space-x-4">
                <label className="">
                  <input
                    type="radio"
                    value="MALE"
                    className="size-4 my-auto"
                    {...register("gender", { required: true })}
                  />{" "}
                  Male
                </label>
                <label className="">
                  <input
                    type="radio"
                    value="FEMALE"
                    {...register("gender", { required: true })}
                    className="size-4 my-auto"
                  />{" "}
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500">Gender is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Salary</label>
              <input
                type="number"
                pattern="^\d*(\.\d{1,2})?$" // This ensures only numbers with up to two decimal places are allowed
                step="0.01"
                {...register("salary", { valueAsNumber: true })} // Optional: Use valueAsNumber to make sure it's treated as a number
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">BirthDate</label>
              <input
                type="date"
                {...register("birthDate")}
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
              <label className="block text-gray-700">Password *</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
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

          {/* Buttons */}
          <div className="flex justify-between my-10">
            <button
              type="button"
              className="px-6 py-3 bg-gray-400 text-white rounded-lg"
              onClick={() => console.log("Cancel")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-petrol text-white rounded-lg"
            >
              Add
            </button>
          </div>
          {/* Display Error Message */}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default page;
