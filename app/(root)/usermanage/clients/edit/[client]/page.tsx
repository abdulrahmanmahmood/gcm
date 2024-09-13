"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";
import placeholderImage from "@/public/healthicons_ui-user-profile.png"; // Placeholder image
import { updateClient } from "@/app/_utils/updateClient";
import { fetchClient } from "@/app/_utils/fetchClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface IClientForm {
  fullName: string;
  email: string;
  gender: string;
  profileImage?: File | null; // For image upload
}

const EditClientPage = ({ params }: { params: { client: string } }) => {
  const clientId = parseInt(params.client, 10); // Convert client ID from string to number
  const router = useRouter();

  // State for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store uploaded image

  // Fetch the client data
  const {
    data: clientData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => fetchClient(clientId),
    select: (data) => data?.data, // Assuming `data` has the structure { data: clientData }
  });

  // Form management using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IClientForm>({
    defaultValues: {
      fullName: "",
      email: "",
      gender: "",
    },
  });

  // Populate form data when client data is loaded
  useEffect(() => {
    if (clientData) {
      reset({
        fullName: clientData.fullName,
        email: clientData.email,
        gender: clientData.gender,
      });

      // If there's an image URL, set it as preview
      setImagePreview(clientData.pictureUrl || null);
    }
  }, [clientData, reset]);

  // Mutation to handle form submission
  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateClient(clientId, formData),
    onSuccess: () => {
      toast.success("Client successfully updated!");
      setTimeout(() => {
        router.push("/usermanage/clients"); // Redirect after success
      }, 2000);
    },
    onError: (error) => {
      console.error("Error updating client:", error);
      toast.error("Failed to update client. Please try again.");
    },
  });

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  // Form submission handler
  const onSubmit = (data: IClientForm) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("gender", data.gender);

    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    mutation.mutate(formData); // Use mutation to update client
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading client data</div>;
  }

  return (
    <div className="flex flex-col items-center py-10 px-5">
      <h1 className="text-3xl font-semibold mb-8">Edit Client</h1>

      {/* Image Upload */}
      <div className="relative">
        <label htmlFor="profileImage" className="cursor-pointer">
          <Image
            src={imagePreview || placeholderImage}
            alt="Client Avatar"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 3a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 11-2 0V4H6v1a1 1 0 01-2 0V3z" />
              <path
                fillRule="evenodd"
                d="M4 9a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H4zm5 2a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm4 0a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mt-8 space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: true })}
              className="border border-gray-300 rounded-lg w-full px-3 py-2"
            />
            {errors.fullName && (
              <p className="text-red-500">Full Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-lg w-full px-3 py-2"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
        </div>

        {/* Gender Radio Buttons */}
        <div className="mt-6">
          <label className="block text-gray-700">Gender</label>
          <div className="flex items-center space-x-4 mt-2">
            <label>
              <input
                type="radio"
                value="MALE"
                {...register("gender", { required: true })}
                checked={watch("gender") === "MALE"}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                value="FEMALE"
                {...register("gender", { required: true })}
                checked={watch("gender") === "FEMALE"}
              />{" "}
              Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500">Gender is required</p>}
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-petrol text-white font-semibold rounded-lg"
        >
          Save
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditClientPage;
