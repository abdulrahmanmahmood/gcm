"use client";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import { ProjectsAxiosResponse } from "@/app/_interfaces";
import {
  addClientContract,
  IClientContractInput,
} from "@/app/_utils/document/clientcontract/addClientContract";
import { FetchAllData } from "@/app/_utils/general/FetchAllData";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify"; // Optional: for better UX
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [imageFile, setImageFile] = useState<File | null>(null); // Image state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data, error, isLoading } = useQuery<ProjectsAxiosResponse>({
    queryKey: ["projects"],
    queryFn: () =>
      FetchAllData(
        "management/project/all",
        0,
        1000,
        "",
        {},
        ["ID_ASC"],
        "Projects"
        // sortDirection
      ),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  if (data) {
    console.log("prject data", data);
  }
  if (error) {
    console.log("error", error);
  }
  if (isLoading) {
    console.log("isLoading", isLoading);
  }

  const {
    data: companies,
    error: companiesError,
    isLoading: companiesIsLoading,
  } = useQuery<ProjectsAxiosResponse>({
    queryKey: ["projects"],
    queryFn: () =>
      FetchAllData(
        "management/company/client/all",
        0,
        1000,
        "",
        {},
        ["ID_ASC"],
        "company"
        // sortDirection
      ),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  if (companies) {
    console.log("company", companies);
  }

  const mutation = useMutation({
    mutationFn: (formData: {
      data: IClientContractInput;
      image: File | null;
    }) => addClientContract(formData.data, formData.image),
    onSuccess: (response) => {
      toast.success("Client contract added successfully!");
      console.log("Success Response:", response); // Log success response

      reset(); // Reset form after submission
      setImageFile(null);
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to add contract.. Please try again.");
        console.error("error response", error);
      }
    },
  });

  // Handle form submission
  const onSubmit = (data: IClientContractInput) => {
    if (!imageFile) {
      toast.error("Image is required");
      return;
    }

    mutation.mutate({ data, image: imageFile });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };
  return (
    <div className="w-full px-10">
      <TitleAddAndEdit title="Add a Client Contracts" />
      <div className="w-[80] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-9">
          <div className="grid grid-cols-2 gap-10 mb-6">
            {/* Company Name */}
            <div>
              <label className="block text-petrol text-xl my-1">
                Company Name *
              </label>
              <select
                {...register("companyId", { required: true })} // Register projectId, not projectName
                className="border border-[#7D7D7D] rounded-lg w-full px-3 py-2"
              >
                <option value="">Select Project</option>
                {companies?.content.map((company: any) => (
                  <option key={company.id} value={company.company.id}>
                    {company.company.name}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <p className="text-red-500">Project ID is required</p>
              )}
            </div>

            {/* Project Name Select */}
            <div>
              <label className="block text-petrol text-xl my-1">
                Project Name *
              </label>
              <select
                {...register("projectId", { required: true })} // Register projectId, not projectName
                className="border border-[#7D7D7D] rounded-lg w-full px-3 py-2"
              >
                <option value="">Select Project</option>
                {data?.content.map((project: any) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="text-red-500">Project ID is required</p>
              )}
            </div>

            {/* Cost */}
            <div>
              <label className="block text-petrol text-xl my-1">Cost *</label>
              <input
                type="text"
                {...register("cost", { required: true })}
                className="border border-[#7D7D7D] rounded-lg w-full px-3 py-2"
              />
              {errors.cost && <p className="text-red-500">Cost is required</p>}
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-petrol text-xl my-1">
                Start Date *
              </label>
              <input
                type="date"
                {...register("startDate", { required: true })}
                className="border border-[#7D7D7D] rounded-lg w-full px-3 py-2"
              />
              {errors.startDate && (
                <p className="text-red-500">Start Date is required</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-petrol text-xl my-1">
                End Date *
              </label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="border border-[#7D7D7D] rounded-lg w-full px-3 py-2"
              />
              {errors.endDate && (
                <p className="text-red-500">End Date is required</p>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-petrol text-xl my-1">
              Upload Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="flex items-center justify-center w-20 h-20 text-center rounded-full bg-petrol my-2">
                    <svg
                      width="34"
                      height="43"
                      viewBox="0 0 34 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.41659 0.666992C1.86405 0.666992 1.33415 0.886486 0.943447 1.27719C0.552746 1.66789 0.333252 2.19779 0.333252 2.75033V36.0837C0.333252 37.7413 0.991732 39.331 2.16383 40.5031C3.33594 41.6752 4.92565 42.3337 6.58325 42.3337H27.4166C29.0742 42.3337 30.6639 41.6752 31.836 40.5031C33.0081 39.331 33.6666 37.7413 33.6666 36.0837V13.167C33.6665 12.6145 33.4469 12.0847 33.0562 11.6941L22.6395 1.27741C22.2489 0.886681 21.7191 0.66711 21.1666 0.666992H2.41659ZM21.1666 5.69616L28.6374 13.167H21.1666V5.69616ZM16.9999 21.5003C17.5525 21.5003 18.0824 21.7198 18.4731 22.1105C18.8638 22.5012 19.0833 23.0311 19.0833 23.5837V25.667H21.1666C21.7191 25.667 22.249 25.8865 22.6397 26.2772C23.0304 26.6679 23.2499 27.1978 23.2499 27.7503C23.2499 28.3029 23.0304 28.8328 22.6397 29.2235C22.249 29.6142 21.7191 29.8337 21.1666 29.8337H19.0833V31.917C19.0833 32.4695 18.8638 32.9994 18.4731 33.3901C18.0824 33.7808 17.5525 34.0003 16.9999 34.0003C16.4474 34.0003 15.9175 33.7808 15.5268 33.3901C15.1361 32.9994 14.9166 32.4695 14.9166 31.917V29.8337H12.8333C12.2807 29.8337 11.7508 29.6142 11.3601 29.2235C10.9694 28.8328 10.7499 28.3029 10.7499 27.7503C10.7499 27.1978 10.9694 26.6679 11.3601 26.2772C11.7508 25.8865 12.2807 25.667 12.8333 25.667H14.9166V23.5837C14.9166 23.0311 15.1361 22.5012 15.5268 22.1105C15.9175 21.7198 16.4474 21.5003 16.9999 21.5003Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {imageFile && imageFile.size > 25 * 1024 * 1024 && (
              <p className="text-red-500">Max file size is 25MB</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-5">
            <button
              type="button"
              className="px-6 py-3 w-[220px] bg-gray-400 text-black rounded-lg"
              onClick={() => reset()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 w-[220px] bg-petrol text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default page;
