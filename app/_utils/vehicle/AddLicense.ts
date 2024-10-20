import { getCookie } from "cookies-next";
import sendMixedContentRequest from "../sendMixedContentRequest";

// Define a separate interface specifically for the client data
export interface IPermitInput {
  issueDate: string;
  expiryDate: string;
  number: string;
  file: File; // Optional picture file
}

export const addLicense = async (
  permitData: IPermitInput,
  vehicleId: string
) => {
  const token = getCookie("token"); // Retrieve token from cookies

  const jsonData = {
    issueDate: permitData.issueDate,
    expiryDate: permitData.expiryDate,
    number: permitData.number,
    vehicleId: vehicleId,
  };
  console.log("permit data before send to mixedcontenty request", jsonData);
  // Use the `sendMixedContentRequest` utility to send the request
  return sendMixedContentRequest(
    `/api/v1/management/vehicle/${vehicleId}/license/upload`,
    "license",
    jsonData,
    "license-file",
    permitData.file ?? null, // Optional picture
    `${token}`
  );
};

export default addLicense;
