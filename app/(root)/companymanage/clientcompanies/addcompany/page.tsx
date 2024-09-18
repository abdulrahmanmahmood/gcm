"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "@/app/_utils/addUser";
import Image from "next/image";
import placeholderImage from "../../../../../public/healthicons_ui-user-profile.png";
import { getCookie } from "cookies-next";
import axios from "axios";
import sendMixedContentRequest from "@/app/_utils/sendMixedContentRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import MapImage from "@/public/5462573_direction_google_gps_location_map_icon 1map.png";
import addClientCompany, {
  IClientCompanyInput,
} from "@/app/_utils/company/clienCompany/AddClientCompany";

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
    mutationFn: (formData: { data: IClientCompanyInput; image: File | null }) =>
      addClientCompany(formData.data, formData.image),
    onSuccess: (data: any) => {
      toast.success("company successfully added!");
      console.log("User successfully added", data);
      // setTimeout(() => {
      //   router.push("/usermanage/users");
      // }, 2000);
    },
    onError: (error: any) => {
      console.error("Error adding company:", error);
      // Set the error message from the server response
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to add company. Please try again.");
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
    const formData: IClientCompanyInput = {
      name: data.fullName,
      email: data.email,
      website: data.website,
      faxNumber: data.faxNumber || "", // Add this field
      industry: data.industry,
      headInfo: {
        headFullName: data.headName,
        headEmail: data.headEmail,
        headPhoneNumber: data.HeadPhoneNumber,
      },
      branches: [
        {
          name: data.branchName,
          phoneNumber: data.BranchPhoneNumber,
          address: {
            street: data.street,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            country: data.country,
          },
          location: {
            latitude: parseFloat(data.branchLatitude),
            longitude: parseFloat(data.branchLongitude),
          },
        },
      ],
    };

    mutation.mutate({ data: formData, image: imageFile });
  };

  return (
    <div className=" h-full w-full overflow-x-auto py-9">
      <TitleAddAndEdit title="Add a company" />
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
            {imageFile && imageFile.size > 2 * 1024 * 1024 && (
              <p className="text-red-500">File size should be less than 2MB</p>
            )}
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
              <label className="block text-gray-700">website *</label>
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
              <label className="block text-gray-700">fax Number *</label>
              <input
                type="text"
                {...register("faxNumberr", { required: true })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.website && (
                <p className="text-red-500">website is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">industry</label>
              <input
                type="text"
                {...register("industry", { required: true })} // Optional: Use valueAsNumber to make sure it's treated as a number
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">Head Name</label>
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
          {/* Business Section */}
          <div className="my-10">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-petrol text-2xl text-center font-semibold my-8 justify-center">
                Business count
              </h2>
              <button className="bg-petrol w-[150px] max-h-[50px] px-4 py-2 text-white rounded-lg justify-end">
                + Add New
              </button>
            </div>
            <h3 className="text-xl font-semibold bg-petrol text-white py-3 text-center rounded-lg mb-4">
              First branch
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  {...register("branchName")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  {...register("branchPhoneNumber")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700">street</label>
                <input
                  type="text"
                  {...register("branchStreet")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700">zipCode</label>
                <input
                  type="text"
                  {...register("branchZipCode")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">city</label>
                <input
                  type="text"
                  {...register("branchCity")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  {...register("branchState")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  {...register("branchCountry")}
                  className="border rounded-lg w-full px-3 py-2"
                />
              </div>
            </div>
            <Image
              src={MapImage}
              alt="google map"
              sizes="200px"
              className="mx-auto my-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">latitude</label>
              <input
                type="text"
                {...register("branchLatitude")}
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">longitude</label>
              <input
                type="text"
                {...register("branchLongitude")}
                className="border rounded-lg w-full px-3 py-2"
              />
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
              disabled={mutation.isLoading} // Disables button if loading
            >
              {mutation.isLoading ? "Submitting..." : "Add"}
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
