"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUser } from "@/app/_utils/fetchUser"; // Ensure you have the correct utility function to fetch user data
import Image from "next/image";
import testImage from "../../../../../../public/logo.jpg";
import { updateUser } from "@/app/_utils/UpdateUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function page({ params }: { params: { user: string } }) {
  const userId = parseInt(params.user, 10); // Convert the user ID from string to number
  const router = useRouter();

  // Fetch user data using the userId
  const { data, error, isLoading } = useQuery({
    queryKey: ["editUser", userId],
    queryFn: () => fetchUser(userId),
  });

  // State to handle form values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    salary: 0,
    birthDate: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
      state: "",
      country: "",
    },
  });

  useEffect(() => {
    if (data) {
      const userData = data.data;
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        gender: userData.gender || "",
        salary: userData.salary || 0,
        birthDate: userData.birthDate || "",
        phoneNumber: userData.phoneNumber || "",
        address: {
          street: userData.address?.street || "",
          city: userData.address?.city || "",
          zipCode: userData.address?.zipCode || "",
          state: userData.address?.state || "",
          country: userData.address?.country || "",
        },
      });
    }
  }, [data]);

  //////////Mutation//////////
  const mutation = useMutation({
    mutationFn: (UpdatedData) => updateUser(userId, UpdatedData),
    onSuccess: () => {
      toast.success("Update User Success");
      setTimeout(() => {
        router.push("/usermanage/users");
      }, 2000);
    },
    onError: (error) => {
      console.log("Error Updating user:", error);
      toast.error("Failed to Update User");
    },
  });

  ////////// Handlers ////////

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated data:", formData);
    mutation.mutate(formData); // Directly use formData here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!data) {
    return <div>No user data found</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit a User</h2>
          <button
            type="submit"
            className="bg-petrol text-white py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>

        {/* User Profile */}
        <div className="flex justify-center mb-6">
          <Image
            src={formData?.pictureViewUrl || testImage}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border rounded-lg w-full px-3 py-2"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded-lg w-full px-3 py-2"
            />
          </div>
          {/* Gender */}
          <label>
            <input
              type="radio"
              name="gender"
              value="MALE" // Ensure consistency in gender values
              checked={formData.gender === "MALE"}
              onChange={handleInputChange}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={formData.gender === "FEMALE"}
              onChange={handleInputChange}
            />{" "}
            Female
          </label>
          {/* Salary */}
          <div>
            <label className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="border rounded-lg w-full px-3 py-2"
            />
          </div>
          {/* BirthDate */}
          <div>
            <label className="block text-gray-700">BirthDate</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="border rounded-lg w-full px-3 py-2"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border rounded-lg w-full px-3 py-2"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold bg-petrol text-white py-3 text-center rounded-lg mb-4">
            Address
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Street */}
            <div>
              <label className="block text-gray-700">Street</label>
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>
            {/* Zip Code */}
            <div>
              <label className="block text-gray-700">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={handleAddressChange}
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>
            {/* City */}
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>
            {/* State */}
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>
            {/* Country */}
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.address.country}
                onChange={handleAddressChange}
                className="border rounded-lg w-full px-3 py-2"
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </form>
  );
}

export default page;
