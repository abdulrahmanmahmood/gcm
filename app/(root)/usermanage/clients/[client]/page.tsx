"use client";
import React from "react";
import Image from "next/image";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import testImage from "../../../../../public/logo.jpg"; // Placeholder image
import { fetchClient } from "@/app/_utils/fetchClient";
import UserCardHeader from "@/app/_components/UI/UserCardHeader";

const ClientPage = ({ params }: { params: { client: string } }) => {
  const clientId = parseInt(params.client, 10);

  // Fetch the client data
  const { data, error, isLoading } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => fetchClient(clientId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading client data</div>;
  if (!data || !data.success) return <div>No client data found</div>;

  const clientData = data.data;
  console.log("client data", clientData);

  return (
    <div className="w-full min-h-screen flex flex-col items-center   bg-gray-50">
      {/* Back Button */}

      {/* Client Info Card */}
      <div className="w-full  flex flex-col items-center bg-white  rounded-lg shadow-md">
        <UserCardHeader
          name={clientData.fullName}
          Role={clientData.role}
          email={clientData.email}
          enabled={clientData.enabled}
          gender={clientData.gender}
          id={clientData.id}
          locked={clientData.locked}
          image={clientData.pictureViewUrl}
          key={clientData.id}
          url={`/usermanage/clients/edit/${clientData.id}`}
        />

        <div className=" w-full py-5 ">
          {/* Dates Section */}
          <div className="w-full  border-b py-10  flex flex-col px-10 space-y-5 pt-5 justify-around text-gray-600 text-base mb-6">
            <p>
              <span className="font-semibold text-petrol">Created Date: </span>
              {new Date(clientData.createdDate).toLocaleDateString("en-GB")}
            </p>
            <p>
              <span className="font-semibold text-petrol">Modified Date: </span>
              {clientData.modifiedDate
                ? new Date(clientData.modifiedDate).toLocaleDateString("en-GB")
                : "N/A"}
            </p>
          </div>

          {/* Company Logo */}
          <div className="flex flex-row items-center space-x-6 w-full px-10">
            <Image
              src={testImage} // Replace with actual company logo if available
              alt="Company logo"
              width={200}
              height={200}
              className="mb-4 mx-10"
            />
            <h2 className="text-2xl font-bold text-petrol">
              {clientData.companyName || "Company Name"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
