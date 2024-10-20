// _utils/addClient.ts
import { getCookie } from "cookies-next";
import sendMixedContentRequest from "./sendMixedContentRequest"; // Import the utility function

// Define a separate interface specifically for the client data
export interface IClientInput {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  companyId: string;
  picture?: File; // Optional picture file
}

export const addClient = async (clientData: IClientInput) => {
  const token = getCookie("token"); // Retrieve token from cookies

  const jsonData = {
    fullName: clientData.fullName,
    email: clientData.email,
    password: clientData.password,
    gender: clientData.gender,
    companyId: clientData.companyId,
  };
  console.log("client data before send to mixedcontenty request", jsonData);
  // Use the `sendMixedContentRequest` utility to send the request
  return sendMixedContentRequest(
    "http://localhost:8090/api/v1/management/user/client/new",
    "form",
    jsonData,
    "picture",
    clientData.picture ?? null, // Optional picture
    `${token}`
  );
};

export default addClient;
