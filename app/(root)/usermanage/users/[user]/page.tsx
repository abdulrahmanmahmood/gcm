"use client";
import React from "react";
import Image from "next/image";
import testImage from "../../../../../public/logo.jpg";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import UserCardHeader from "@/app/_components/UI/UserCardHeader";
import UserCardDetailsSecion from "@/app/_components/UI/UserCardDetailsSecion";
import UserCardAddressSection from "@/app/_components/UI/UserCardAddressSection";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/app/_utils/fetchUser";

const page = ({ params }: { params: { user: string } }) => {
  const userId = parseInt(params.user, 10); // Convert the user ID from string to number

  // Fetch user data using the userId
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!data || !data.success) {
    return <div>No user data found</div>;
  }

  const userData = data.data;
  console.log("user data", data);

  return (
    <div className="relative overflow-auto pb-10 flex flex-col w-full space-y-10  mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
      {/* Header Section */}
      <UserCardHeader
        Role={userData.role}
        email={userData.email}
        enabled={userData.enabled}
        gender={userData.gender}
        name={userData.fullName}
        id={userData.id.toString()}
        locked={userData.locked}
        image={userData.pictureViewUrl || testImage} // Fallback to testImage if no picture is available
        url={`/usermanage/users/edit/${userData.id.toString()}`}
      />
      <div className="w-full my-5" />
      {/* Details Section */}
      <UserCardDetailsSecion
        phone={userData.phoneNumber}
        salary={userData.salary}
        birthDate={userData.birthDate}
        createdDate={new Date(userData.createdDate).toLocaleDateString("en-GB")}
        modifiedDate={
          userData.modifiedDate
            ? new Date(userData.modifiedDate).toLocaleDateString("en-GB")
            : "N/A"
        }
      />
      <div className="w-full my-5" />

      {/* Address Section */}
      <UserCardAddressSection
        street={userData?.address?.street}
        city={userData?.address?.city}
        zipCode={userData.address?.zipCode}
        state={userData?.address?.state}
        country={userData?.address?.country}
      />
    </div>
  );
};

export default page;
