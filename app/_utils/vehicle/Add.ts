import { getCookie } from "cookies-next";
import sendMixedContentRequestFormsAndFiles from "../general/sendMixedFormsAndFiles";
import { baseUrl } from "@/app/_axios/axios";

export interface IVehicleInput {
  manufacturer: string;
  model: string;
  color: string;
  licensePlate: string;
  year: string;
  type: string;
  license: {
    issueDate: string;
    expiryDate: string;
  };
  permit: {
    issueDate: string;
    expiryDate: string;
    no: string;

  };
}

export const addVehicle = async (
  vehicleData: IVehicleInput,
  licenseFile: File | null,
  permitFile: File | null,
  vehiclePictures: File[]
) => {
  const token = getCookie("token") as string; // Retrieve the token from cookies

  const vehicle = {
    manufacturer: vehicleData.manufacturer,
    model: vehicleData.model,
    color: vehicleData.color,
    licensePlate: vehicleData.licensePlate,
    year: vehicleData.year,
    type: vehicleData.type,
  };
  console.log("Vehicle Data", vehicle);

  const jsonParts = [
    { key: "vehicle", data: vehicle },
    { key: "license", data: vehicleData.license },
    { key: "permit", data: vehicleData.permit },
  ];
  const fileParts = [
    { key: "license-file", file: licenseFile },
    { key: "permit-file", file: permitFile },
    { key: "pictures", files: vehiclePictures }, // Changed to send all pictures in one array
  ];

  return sendMixedContentRequestFormsAndFiles({
    fileParts,
    jsonParts,
    token,
    url: `${baseUrl}/management/vehicle/new`,
  });
};

export default addVehicle;
