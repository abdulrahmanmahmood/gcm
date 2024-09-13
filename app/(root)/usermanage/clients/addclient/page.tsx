"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import placeholderImage from "../../../../../public/healthicons_ui-user-profile.png";
import sendMixedContentRequest from "@/app/_utils/sendMixedContentRequest";
import { addClient } from "@/app/_utils/addClient"; // Mutation function
import { getAllCompanies } from "@/app/_utils/company/clienCompany/getAll";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
// Fetch companies function

const AddClientPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const token = getCookie("token");

  // Fetch companies
  const {
    data: companies,
    isLoading: companiesLoading,
    error: companiesError,
  } = useQuery({
    queryKey: ["getAllCompanies"],
    queryFn: getAllCompanies,
  });
  // if (companies) {
  //   console.log("Compaines", companies);
  // }
  // if (companiesLoading) {
  //   console.log("companiesLoading", companiesLoading);
  // }
  // if (companiesError) {
  //   console.log("companiesError", companiesError);
  // }

  // Handle image preview and file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Mutation to handle form submission using useMutation
  const mutation = useMutation({
    mutationFn: (formData: any) => addClient(formData),
    onSuccess: (response) => {
      toast.success("Client successfully added!");
      console.log("Cleit Add Succefully", response);
      setTimeout(() => {
        router.push("/usermanage/clients");
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Error adding client:", error);
      // Set the error message from the server response
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to add client. Please try again.");
      }
    },
  });

  // Form submission handler
  const onSubmit = async (data: any) => {
    const formData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      gender: data.gender,
      companyId: data.companyId, // Store the selected companyId
      picture: imageFile,
    };
    mutation.mutate(formData);
  };

  return (
    <div className="h-full w-full overflow-x-auto py-9">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="space-y-9"
      >
        <div className="relative flex flex-col w-[90%] mx-auto min-w-0 mb-6  p-6">
          <h2 className="text-2xl font-semibold mb-6 text-petrol">
            Add a Client
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="profileImage" className="mb-4">
              <Image
                src={imagePreview || placeholderImage}
                alt="User Avatar"
                width={150}
                height={150}
                className="rounded-full"
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
          <div className="grid grid-cols-2 gap-11 text-petrol mb-6">
            {/* Full Name */}
            <div>
              <label className="block text-petrol">Name *</label>
              <input
                type="text"
                {...register("fullName", { required: true })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.fullName && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-petrol">Email *</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-petrol">Password *</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-petrol">Confirm Password *</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                className="border rounded-lg w-full px-3 py-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">Passwords must match</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-petrol">Gender *</label>
              <div className="flex items-center space-x-4 my-3">
                <label>
                  <input
                    type="radio"
                    className="size-4"
                    value="MALE"
                    {...register("gender", { required: true })}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    className="size-4"
                    value="FEMALE"
                    {...register("gender", { required: true })}
                  />{" "}
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500">Gender is required</p>
              )}
            </div>

            {/* Company 
            
            Password123@#
            */}
            <div>
              <label className="block text-petrol">Company *</label>
              {companiesLoading ? (
                <p>Loading companies...</p>
              ) : companiesError ? (
                <p>Error loading companies</p>
              ) : (
                <select
                  {...register("companyId", { required: true })}
                  className="border rounded-lg w-full px-3 py-2"
                >
                  <option value="">Select a company</option>
                  {companies?.map((company: any) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              )}
              {errors.companyId && (
                <p className="text-red-500">Company is required</p>
              )}
            </div>
          </div>

          {/* Submit and Cancel */}
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
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddClientPage;
