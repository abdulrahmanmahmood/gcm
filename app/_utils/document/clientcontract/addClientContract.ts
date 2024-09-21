import axios from "axios";
import { getCookie } from "cookies-next";
import sendMixedContentRequest from "../../sendMixedContentRequest";
import { baseUrl } from "@/app/_axios/axios";

export interface IClientContractInput {
  cost: string;
  startDate: string;
  endDate: string;
  projectId: string;
}

export const addClientContract = async (
  contractData: IClientContractInput,
  imageFile: File | null
) => {
  const token = getCookie("token"); // Retrieve the token from cookies
  console.log("token", token);

  // Prepare the formData for the request
  const formData = new FormData();

  // Add JSON form data
  const jsonData = {
    cost: contractData.cost,
    startDate: contractData.startDate,
    endDate: contractData.endDate,
    projectId: contractData.projectId,
  };

  formData.append("form", JSON.stringify(jsonData)); // Adding the JSON part
  if (imageFile) {
    formData.append("image", imageFile); // Adding the image part
  }

  return sendMixedContentRequest(
    `http://localhost:8090/api/v1/management/contract/client/new`,
    "form",
    jsonData,
    "image",
    imageFile,
    `${token}`
  );
};
