"use client";
import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { deleteOne } from "@/app/_utils/general/DeleteOne";
import { IPermitInput } from "@/app/_utils/vehicle/AddPermits";
import { useForm } from "react-hook-form";
import addLicense from "@/app/_utils/vehicle/AddLicense";

interface LicenseInformationProps {
  license: {
    issueDate: string;
    expiryDate: string;
    attachment: {
      data: string;
      contentType: string;
      id: string;
    };
  };
  vehicleId: number;
  refetch: () => void;
}

const LicenseInformation: React.FC<LicenseInformationProps> = ({
  license,
  refetch,
  vehicleId,
}) => {
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

  // Mutation to upload a new permit file
  const addPermitMutation = useMutation({
    mutationFn: (data: IPermitInput) => addLicense(data, vehicleId.toString()),
    onSuccess: () => {
      toast.success("Permit added successfully!", {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: "addPermitSuccess",
      });
      setIsAddingNewPermit(false);
      reset();
      refetch();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message
          ? `Failed to add permit: ${error.response.data.message}`
          : "Failed to add permit. Please try again.",
        {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          toastId: "addPermitError",
        }
      );
    },
  });
  const deletelicenseMutation = useMutation({
    mutationFn: (licenseId: string) =>
      deleteOne(
        `management/vehicle/${vehicleId}/license/delete`,
        vehicleId,
        licenseId,
        "Vehicle license"
      ),
    onSuccess: () => {
      if (!toast.isActive("DeletelicenseSuccess")) {
        toast.success("license deleted successfully!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          toastId: "DeletelicenseSuccess",
        });
        console.log("check the toast");
      }
      refetch();
    },
    onError: (error: any) => {
      console.error("Error deleting license:", error);
      if (!toast.isActive("DeletelicenseError")) {
        toast.error("Failed to delete license?. Please try again.", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          toastId: "DeletelicenseError",
        });
      }
    },
  });

  const handleDeletelicense = (licenseId: string) => {
    if (window.confirm("Are you sure you want to delete this license?")) {
      deletelicenseMutation.mutate(licenseId);
    }
    console.log("premit id is ", licenseId);
  };
  const onSubmit = (data: IPermitInput) => {
    if (selectedPermitFile) {
      const updatedData = { ...data, file: selectedPermitFile }; // Add file to the form data
      addPermitMutation.mutate(updatedData);
    } else {
      toast.error("Please select a permit file.");
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPermitFile(e.target.files[0]); // Save the selected file
    }
  };

  return (
    <div className="bg-white shadow-xl border-2 rounded-lg p-6 mb-6 relative min-h-[500px]">
      <h3 className="text-xl font-bold text-petrol text-center mb-5">
        License Information
      </h3>
      {license?.attachment && (
        <div>
          <div className="  flex justify-end">
            <button
              onClick={() => {
                handleDeletelicense(license?.attachment.id);
              }}
              className="bg-gray-500 hover:bg-redd text-white font-bold py-2  px-4  rounded "
            >
              Delete
            </button>
          </div>
          <div className="flex flex-row justify-between w-[80%] mx-auto">
            <p>
              <strong className="text-petrol">Issue Date:</strong>{" "}
              {license?.issueDate}
            </p>
            <p>
              <strong className="text-petrol">Expiry Date:</strong>{" "}
              {license?.expiryDate}
            </p>
          </div>
          {license?.attachment && (
            <div className="flex flex-col justify-between  items-center mt-10  shadow-lg  p-2 h-[650px] max-w-[80%] mx-auto">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={`data:${license?.attachment.contentType};base64,${license?.attachment.data}`}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          className=" text-white px-7 py-3 rounded-lg my-2"
          onClick={() => setIsAddingNewPermit(!isAddingNewPermit)}
          style={{ backgroundColor: !isAddingNewPermit ? "#2e7490" : "gray" }}
        >
          {isAddingNewPermit ? "Cancel" : "Add New license"}
        </button>
      </div>

      {(!license?.attachment || isAddingNewPermit) && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
            <div className="w-[80%] mx-auto ">
              <div className="flex flex-wrap justify-between space-y-5">
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
                  <label
                    htmlFor="expiryDate"
                    className="block text-petrol my-1"
                  >
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
                  license File
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
                {addPermitMutation.isPending ? "Adding..." : "Add license"}
              </button>
            </div>
          </form>
        </>
      )}

      <ToastContainer containerId={"LicenseInformation"} />
    </div>
  );
};

export default LicenseInformation;
