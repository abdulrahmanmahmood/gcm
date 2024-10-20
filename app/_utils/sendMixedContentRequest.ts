import axios from "axios";
import { IFormInput } from "./addUser";
import { IClientInput } from "./addClient";
import { IClientContractInput } from "./document/clientcontract/addClientContract";
import { IVehicleInput } from "./vehicle/Add";
import axiosInstant from "../_axios/axios";
import { IPermitInput } from "./vehicle/AddPermits";

const sendMixedContentRequest = async (
  url: string,
  jsonKey: string,
  jsonData:
    | IFormInput
    | IClientInput
    | IClientContractInput
    | IVehicleInput
    | IPermitInput
    | any,
  imageKey: string,
  imageFile: File | null, // Make it nullable if imageFile is optional
  token: string
) => {
  // Create a custom FormData object
  const formData = new FormData();
  console.log(`json data of  ${jsonKey}  is `, jsonData);

  // Append the JSON data as a Blob with application/json content type
  const jsonBlob = new Blob([JSON.stringify(jsonData)], {
    type: "application/json",
  });
  formData.append(jsonKey, jsonBlob, "form.json");

  // Append the image file directly, as `File` is a subclass of `Blob`
  if (imageFile) {
    formData.append(imageKey, imageFile); // No need to wrap imageFile in a Blob
  }

  try {
    const response = await axiosInstant.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        // You don't need to manually set Content-Type for FormData; Axios will do it automatically
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in sendMixedContentRequest:", error);
    throw error;
  }
};

export default sendMixedContentRequest;
