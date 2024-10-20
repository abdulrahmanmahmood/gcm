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

const AddVehiclePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // State for image previews
  const [imageFiles, setImageFiles] = useState<File[]>([]); // State for the actual image files
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [permitFile, setPermitFile] = useState<File | null>(null);
  const router = useRouter();
  const token = getCookie("token"); // Retrieve token from cookies

  const mutation = useMutation({
    mutationFn: (params: {
      vehicleData: IVehicleInput;
      licenseFile: File | null;
      permitFile: File | null;

      vehiclePictures: File[];
    }) =>
      addVehicle(
        params.vehicleData,
        params.licenseFile,
        params.permitFile,
        params.vehiclePictures
      ),
    onSuccess: (data: any) => {
      toast.success("Vehicle successfully added!");
      console.log("Vehicle successfully added", data);
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
        toast.error("Failed to add company. Please try again.");
        console.log(error);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      setImageFiles((prevFiles) => [...prevFiles, ...newImageFiles]);

      const newPreviews = newImageFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };
  const handleDeleteImage = (index: number) => {
    setImagePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      URL.revokeObjectURL(newPreviews[index]); // Clean up the object URL
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    setImageFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleLicenseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFile(file);
    }
  };

  const handlePermitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPermitFile(file);
    }
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const onSubmit = (data: any) => {
    const vehicleData: IVehicleInput = {
      manufacturer: data.manufacturer,
      model: data.model,
      color: data.color,
      licensePlate: data.licensePlate,
      year: data.year,
      type: data.type,
      license: {
        issueDate: data.licenseIssueDate,
        expiryDate: data.licenseExpiryDate,
      },
      permit: {
        issueDate: data.permitIssueDate,
        expiryDate: data.permitExpiryDate,
      },
    };

    mutation.mutate({
      vehicleData,
      vehiclePictures: imageFiles,
      licenseFile: licenseFile,
      permitFile: permitFile,
    });
  };

  return (
    <div className=" h-full w-full overflow-x-auto">
      <TitleAddAndEdit title="Add Vehicle" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="space-y-6"
      >
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words  rounded-2xl border-stone-200 bg-light/30 p-6">
          {/* Image Section */}
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="profileImages" className="mb-4 cursor-pointer">
              <div
                className={`grid ${
                  imagePreviews.length > 0 ? "grid-cols-3" : "grid-cols-1"
                }  gap-4 relative`}
              >
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={src}
                      alt={`Vehicle Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <Image
                  src={placeholderImage}
                  alt="Placeholder Image"
                  width={200}
                  height={200}
                  className="rounded-full  object-cover mx-auto"
                />
              </div>
            </label>
            {/* Always Visible Input Field */}
            <input
              type="file"
              id="profileImages"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {/* Vehicle Form Fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {[
              { name: "manufacturer", label: "Manufacturer" },
              { name: "model", label: "Model" },
              { name: "color", label: "Color" },
              { name: "licensePlate", label: "License Plate" },
              { name: "year", label: "Year" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-petrol">{field.label} *</label>
                <input
                  type="text"
                  {...register(field.name, { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors[field.name] && (
                  <p className="text-red-500">{field.label} is required</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-petrol">Type *</label>
              <select
                {...register("type", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              >
                <option value="">Select Vehicle Type</option>
                <option value="CAR">CAR</option>
                <option value="SEMI_TRACTOR">SEMI TRACTOR</option>
              </select>
              {errors.type && <p className="text-red-500">Type is required</p>}
            </div>
          </div>

          {/* License and Permit Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {[
              { name: "licenseIssueDate", label: "License Issue Date" },
              { name: "licenseExpiryDate", label: "License Expiry Date" },
              { name: "permitIssueDate", label: "Permit Issue Date" },
              { name: "permitExpiryDate", label: "Permit Expiry Date" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-petrol">{field.label} *</label>
                <input
                  type="date"
                  {...register(field.name, { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
                />
                {errors[field.name] && (
                  <p className="text-red-500">{field.label} is required</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-petrol">License File</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setLicenseFile)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              />
            </div>

            <div>
              <label className="block text-petrol">Permit File</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setPermitFile)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-10">
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
              {mutation.isPending ? "Submitting..." : "Add Vehicle"}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddVehiclePage;
