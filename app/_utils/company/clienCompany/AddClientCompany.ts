// _utils/AddClientCompany.ts
import { getCookie } from "cookies-next";
import sendMixedContentRequest from "../../sendMixedContentRequest";

// Define the structure of the client company input
export interface IClientCompanyInput {
  name: string;
  email: string;
  website: string;
  faxNumber: string;
  industry: string;
  headInfo: {
    headFullName: string;
    headEmail: string;
    headPhoneNumber: string;
  };
  branches: {
    name: string;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
  }[];
  logo?: File; // Optional logo file
}

export const addClientCompany = async (clientCompanyData: IClientCompanyInput, logoFile: File | null) => {
  const token = getCookie("token"); // Retrieve the token from cookies

  // Prepare the JSON data structure based on the API requirement
  const jsonData = {
    name: clientCompanyData.name,
    email: clientCompanyData.email,
    website: clientCompanyData.website,
    faxNumber: clientCompanyData.faxNumber,
    industry: clientCompanyData.industry,
    headInfo: {
      headFullName: clientCompanyData.headInfo.headFullName,
      headEmail: clientCompanyData.headInfo.headEmail,
      headPhoneNumber: clientCompanyData.headInfo.headPhoneNumber,
    },
    branches: clientCompanyData.branches.map(branch => ({
      name: branch.name,
      phoneNumber: branch.phoneNumber,
      address: {
        street: branch.address.street,
        city: branch.address.city,
        state: branch.address.state,
        zipCode: branch.address.zipCode,
        country: branch.address.country,
      },
      location: {
        latitude: branch.location.latitude,
        longitude: branch.location.longitude,
      },
    })),
  };

  // Use the `sendMixedContentRequest` utility to send the request
  return sendMixedContentRequest(
    "http://localhost:8090/api/v1/management/company/client/new", // API URL
    "form", // JSON key
    jsonData, // The JSON data to be sent
    "logo", // The image key for the file upload
    logoFile,
    `${token}` // Pass the token
  );
};

export default addClientCompany;
