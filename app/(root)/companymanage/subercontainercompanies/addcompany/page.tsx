"use client";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import addClientCompany, {
  IClientCompanyInput,
} from "@/app/_utils/company/clienCompany/AddClientCompany";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import placeholderImage from "../../../../../public/healthicons_ui-user-profile.png";
import MapImage from "@/public/5462573_direction_google_gps_location_map_icon 1map.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the actual image file
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      website: "",
      faxNumber: "",
      industry: "",
      headInfo: {
        headFullName: "",
        headEmail: "",
        headPhoneNumber: "",
      },
      branches: [
        {
          name: "",
          phoneNumber: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
          location: {
            latitude: "",
            longitude: "",
          },
        },
      ],
    },
  });
  const {
    fields: branchesFields,
    append: addBranch,
    remove: removeBranch,
  } = useFieldArray({
    control,
    name: "branches",
  });

  const mutation = useMutation({
    mutationFn: (formData: { data: IClientCompanyInput; image: File | null }) =>
      addClientCompany(
        formData.data,
        formData.image,
        "http://localhost:8090/api/v1/management/company/subcontractor/new"
      ),
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
        headPhoneNumber: data.headPhoneNumber,
      },
      branches: data.branches.map((branch: any) => ({
        name: branch.name,
        phoneNumber: branch.phoneNumber,
        address: {
          street: branch.address.street,
          city: branch.address.city,
          state: branch.address.state,
          zipCode: branch.address.zipCode,
          country: branch.address.country,
        },
        location: {
          latitude: parseFloat(branch.location.latitude),
          longitude: parseFloat(branch.location.longitude),
        },
      })),
    };
    // console.log("suber container adding compay data", formData);

    mutation.mutate({ data: formData, image: imageFile });
  };

  return (
    <div className=" h-full w-full overflow-x-auto py-9">
      <TitleAddAndEdit title="Add a company" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="space-y-6 my-9"
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
                {...register("faxNumber", { required: true })}
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
        </div>

        <div className="my-10">
          <div className="flex flex-row items-center justify-between px-10">
            <h2 className="text-petrol text-2xl text-center font-semibold my-8 justify-center">
              Business count
            </h2>
            <button
              className="bg-petrol w-[150px] max-h-[50px] px-4 py-2 text-white rounded-lg justify-end"
              onClick={() =>
                addBranch({
                  name: "",
                  phoneNumber: "",
                  address: {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "",
                  },
                  location: {
                    latitude: "",
                    longitude: "",
                  },
                })
              }
              type="button"
            >
              + Add New
            </button>
          </div>
          {/* Display Branch Titles and Inputs */}
          {branchesFields.length > 0 &&
            branchesFields.map((branch, index) => (
              <div key={branch.id}>
                {/* Dynamic Title for Each Branch */}
                <h3 className="text-xl text-center text-white py-3 rounded-lg bg-petrol font-semibold mt-8 mb-4">
                  {index === 0
                    ? "First Branch"
                    : index === 1
                    ? "Second Branch"
                    : `Branch ${index + 1}`}
                </h3>

                <div className="w-full text-end flex justify-end px-10">
                  <button
                    type="button"
                    onClick={() => removeBranch(index)}
                    className="text-redd bg-[#F5F7FB] w-[200px] my-5 ml-0 max-h-[50px] px-4 py-2 text-nowrap flex items-center justify-center space-x-2"
                  >
                    <svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                        fill="#C32B43"
                      />
                    </svg>
                    <span>Remove Branch</span>
                  </button>
                </div>

                <div className="border p-4 mb-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.name`)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Phone Number</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.phoneNumber`)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Street</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.address.street`)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div>
                      <label>City</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.address.city`)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div>
                      <label>State</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.address.state`)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Zip Code</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.address.zipCode`)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Country</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.address.country`)}
                        className="border p-2 w-full"
                      />
                    </div>
                  </div>
                  <Image
                    src={MapImage}
                    alt="google map"
                    sizes="200px"
                    className="mx-auto my-10"
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700">latitude</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.location.latitude`)}
                        className="border rounded-lg w-full px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">longitude</label>
                      <input
                        type="text"
                        {...register(`branches.${index}.location.longitude`)}
                        className="border rounded-lg w-full px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Submit Button */}
          <div className="w-[80%] mx-auto my-13 px-10">
            <button
              type="submit"
              className="text-xl font-bold px-6 py-3 bg-petrol text-white rounded-lg my-10 w-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default page;
