"use client";
import ViewRelatedCompany from "@/app/_components/UI/document/client contract/ViewRelatedCompany";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ClientContract, ClientContractAxiosResponse } from "@/app/_interfaces"; // Assuming ClientContract interface is defined here
import { fetchOneData } from "@/app/_utils/general/FetchOneData";
import ClientContractDetails from "@/app/_components/UI/document/client contract/ClientContractDetails";
import Image from "next/image";

const page = ({ params }: { params: { clientcontractid: string } }) => {
  const clientContractId = parseInt(params.clientcontractid, 10);

  // Use the generalized fetch function with React Query
  const { data, error, isLoading } = useQuery<ClientContractAxiosResponse>({
    queryKey: ["clientContract", clientContractId],
    queryFn: () =>
      fetchOneData<ClientContractAxiosResponse>(
        `management/contract/client`,
        clientContractId,
        "Client Contract"
      ), // Fetch client contract data
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading client contract</p>;
  if (data) {
    console.log("Cleint Contract Data", data);
  }
  // Ensure data exists before destructuring
  const clientContract: ClientContract | undefined = data?.data;

  if (!clientContract) {
    return <p>No data available for the specified client contract.</p>;
  }
  // Function to handle the download of the image
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:${clientContract.image.contentType};base64,${clientContract.image.data}`;
    link.download = clientContract.image.baseName; // Set the desired file name
    link.click();
  };
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Pass the data to the ViewRelatedCompany component */}
      <ViewRelatedCompany
        image={clientContract.company.logo}
        name={clientContract.company.name}
      />
      <ClientContractDetails
        projectName={clientContract.project.name}
        cost={clientContract.cost.toLocaleString()}
        startDate={new Date(clientContract?.startDate).toLocaleString()}
        endDate={new Date(clientContract?.endDate).toLocaleString()}
        createdDate={new Date(clientContract?.createdDate).toLocaleString()}
        modifiedDate={new Date(clientContract?.modifiedDate).toLocaleString()}
      />
      <div className="w-full p-[40px] pb-24 m-5 border-2 rounded-lg shadow-xl">
        <Image
          src={`data:${clientContract.image.contentType};base64,${clientContract.image.data}`}
          alt={`data:${clientContract.image.baseName}`}
          className="size-[90%] mx-auto rounded-lg border-spacing-3 p-3 border-2   "
          width={200}
          height={200}
        />
        <div className="flex flex-row justify-end gap-5 m-8 px-10">
          {/* Download Button */}
          <button
            onClick={handleDownload} // Call the handleDownload function onClick
            className="w-[160px] px-3 py-3 rounded-lg flex items-center justify-center space-x-3 gap-4 text-petrol bg-[#DCDCDC]"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 16L7.5 11L8.9 9.55L11.5 12.15V4H13.5V12.15L16.1 9.55L17.5 11L12.5 16ZM6.5 20C5.95 20 5.47933 19.8043 5.088 19.413C4.69667 19.0217 4.50067 18.5507 4.5 18V15H6.5V18H18.5V15H20.5V18C20.5 18.55 20.3043 19.021 19.913 19.413C19.5217 19.805 19.0507 20.0007 18.5 20H6.5Z"
                fill="#2E7490"
              />
            </svg>
            <span>Download</span>
          </button>

          {/* Changing Button */}
          <button className="w-[160px] px-3 py-3 rounded-lg flex items-center justify-center space-x-3 gap-4 bg-petrol text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 14.4595V17.4995C0 17.7795 0.22 17.9995 0.5 17.9995H3.54C3.67 17.9995 3.8 17.9495 3.89 17.8495L14.81 6.93951L11.06 3.18951L0.15 14.0995C0.0500001 14.1995 0 14.3195 0 14.4595ZM17.71 4.03951C17.8027 3.947 17.8762 3.83711 17.9264 3.71614C17.9766 3.59517 18.0024 3.46548 18.0024 3.33451C18.0024 3.20355 17.9766 3.07386 17.9264 2.95289C17.8762 2.83192 17.8027 2.72203 17.71 2.62951L15.37 0.289514C15.2775 0.196811 15.1676 0.123263 15.0466 0.0730817C14.9257 0.0229003 14.796 -0.00292969 14.665 -0.00292969C14.534 -0.00292969 14.4043 0.0229003 14.2834 0.0730817C14.1624 0.123263 14.0525 0.196811 13.96 0.289514L12.13 2.11951L15.88 5.86951L17.71 4.03951Z"
                fill="white"
              />
            </svg>
            <span>Changing</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
