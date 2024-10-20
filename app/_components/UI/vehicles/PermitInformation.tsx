"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toast, ToastContainer } from "react-toastify";
import { deleteOne } from "@/app/_utils/general/DeleteOne";
import { useForm } from "react-hook-form";
import addPermit, { IPermitInput } from "@/app/_utils/vehicle/AddPermits";

interface PermitInformationProps {
  vehicleId: number;
  permits: Array<{
    issueDate: string;
    expiryDate: string;
    attachment: {
      data: string;
      contentType: string;
      id: string;
    };
  }>;
  refetch: () => void; // Function to refresh vehicle data after changes
}

const PermitInformation: React.FC<PermitInformationProps> = ({
  vehicleId,
  permits,
  refetch,
}) => {
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);
  const [selectedPermitFile, setSelectedPermitFile] = useState<File | null>(
    null
  );
  const [isAddingNewPermit, setIsAddingNewPermit] = useState<boolean>(false); // State to toggle the new permit form
  const [newPermitData, setNewPermitData] = useState({
    issueDate: "",
    expiryDate: "",
    permitNumber: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IPermitInput>();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Convert permits attachment data to Blob URLs
  useEffect(() => {
    if (permits) {
      const urls = permits.map((permit) => {
        if (permit.attachment) {
          const byteCharacters = atob(permit.attachment.data);
          const byteNumbers = new Array(byteCharacters.length)
            .fill(0)
            .map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: permit.attachment.contentType,
          });
          return URL.createObjectURL(blob);
        }
        return null;
      });
      
      // Use type assertion and filter out null values
      setDocumentUrls(urls.filter((url): url is string => url !== null));
    }
  }, [permits]);

  // Mutation to upload a new permit file
  const addPermitMutation = useMutation({
    mutationFn: (data: IPermitInput) => addPermit(data, vehicleId.toString()),
    onSuccess: () => {
      if (!toast.isActive(33, "PermitInformationId")) {
        toast.success("Permit added successfully!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          toastId: 33,
        });
        setIsAddingNewPermit(false);
        reset();
        refetch();
      }
    },
    onError: (error: any) => {
      if (!toast.isActive(33, "PermitInformationId")) {
        toast.error(
          error?.response?.data?.message
            ? `Failed to add permit: ${error.response.data.message}`
            : "Failed to add permit. Please try again.",
          {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            toastId: 33,
          }
        );
      }
    },
  });

  const deletePermitMutation = useMutation({
    mutationFn: (permitId: string) =>
      deleteOne(
        `management/vehicle/${vehicleId}/permit/${permitId}/delete`,
        vehicleId,
        permitId,
        "Vehicle Permit"
      ),
    onSuccess: () => {
      if (!toast.isActive(23, "PermitInformationId")) {
        toast.success("Permit deleted successfully!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          toastId: 23,
        });
        refetch();
      }
    },
    onError: (error: any) => {
      console.error("Error deleting permit:", error);
      if (!toast.isActive(23, "PermitInformationId")) {
        toast.error("Failed to delete permit. Please try again.", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          toastId: 13,
        });
      }
    },
  });

  const handleDeletePermit = (permitId: string) => {
    if (window.confirm("Are you sure you want to delete this permit?")) {
      deletePermitMutation.mutate(permitId);
    }
    console.log("premit id is ", permitId);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPermitFile(e.target.files[0]); // Save the selected file
    }
  };

  const onSubmit = (data: IPermitInput) => {
    if (selectedPermitFile) {
      const updatedData = { ...data, file: selectedPermitFile }; // Add file to the form data
      addPermitMutation.mutate(updatedData);
    } else {
      toast.error("Please select a permit file.");
    }
  };
  return (
    <div className="bg-white shadow-xl border rounded-lg p-6 mb-6 relative min-h-[500px]">
      <h3 className="text-xl font-bold text-petrol text-center mb-8 ">
        Permit Information
      </h3>

      {permits.map((permit, index) => (
        <div key={index} className="mb-8 border-t-2 pt-3">
          <div className="  flex justify-end">
            <button
              onClick={() => {
                handleDeletePermit(permit.attachment.id);
              }}
              className="bg-gray-500 hover:bg-redd  text-white font-bold py-2  px-4  rounded "
            >
              Delete
            </button>
          </div>
          <div className="flex flex-row justify-between w-[80%] mx-auto">
            <p>
              <strong className="text-petrol">Issue Date:</strong>{" "}
              {permit.issueDate}
            </p>
            <p>
              <strong className="text-petrol">Expiry Date:</strong>{" "}
              {permit.expiryDate}
            </p>
          </div>
          {documentUrls[index] && (
            <div className="flex flex-col justify-between  items-center mt-10  shadow-lg  p-2 h-[650px] max-w-[80%] mx-auto">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={documentUrls[index]}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-end my-5">
        <button
          className=" text-white px-7 py-3 rounded-lg "
          onClick={() => setIsAddingNewPermit(!isAddingNewPermit)}
          style={{ backgroundColor: !isAddingNewPermit ? "#2e7490" : "gray" }}
        >
          {isAddingNewPermit ? "Cancel" : "Add New Permit"}
        </button>
      </div>

      {isAddingNewPermit && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <div className="w-[80%] mx-auto ">
            <div className="flex flex-wrap justify-between space-y-5">
              <div className="mb-4 w-[40%]">
                <label htmlFor="number" className="block text-petrol my-1">
                  Permit Number
                </label>
                <input
                  type="text"
                  id="number"
                  {...register("number", {
                    required: "Permit number is required",
                  })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.number && (
                  <span className="text-red-500 text-sm">
                    {errors.number.message}
                  </span>
                )}
              </div>
              <div className="mb-4 w-[40%]">
                <label htmlFor="issueDate" className="block text-petrol my-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  id="issueDate"
                  {...register("issueDate", {
                    required: "Issue date is required",
                  })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.issueDate && (
                  <span className="text-red-500 text-sm">
                    {errors.issueDate.message}
                  </span>
                )}
              </div>
              <div className="mb-4 w-[40%]">
                <label htmlFor="expiryDate" className="block text-petrol my-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                  })}
                  className="border rounded-lg w-full px-3 py-2"
                />
                {errors.expiryDate && (
                  <span className="text-red-500 text-sm">
                    {errors.expiryDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4 w-[40%]">
              <label htmlFor="file" className="block text-petrol my-1">
                Permit File
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange} // Handle file selection
                className="mt-1 block w-full"
              />
              {errors.file && (
                <span className="text-red-500 text-sm">
                  {errors.file.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-petrol w-[20%] text-white px-4 py-2 rounded-md hover:bg-petrol-dark"
              disabled={addPermitMutation.isPending}
            >
              {addPermitMutation.isPending ? "Adding..." : "Add Permit"}
            </button>
          </div>
        </form>
      )}
      <ToastContainer containerId={"PermitInformationId"} />
    </div>
  );
};

export default PermitInformation;
