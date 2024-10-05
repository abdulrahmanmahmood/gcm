// _utils/addUser.ts
import { getCookie } from "cookies-next";
import sendMixedContentRequest from "./sendMixedContentRequest"; // Import the utility function

interface IAddress {
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
}

export interface IFormInput {
  fullName: string;
  email: string;
  gender: string;
  salary: number;
  birthDate: string;
  phoneNumber: string;
  password: string;
  address: IAddress;
  picture?: File; // Optional picture file
}

export const addUser = async (userData: IFormInput) => {
  const token = getCookie("token"); // Retrieve token from cookies

  const jsonData = {
    fullName: userData.fullName,
    email: userData.email,
    gender: userData.gender,
    salary: userData.salary,
    birthDate: userData.birthDate,
    phoneNumber: userData.phoneNumber,
    password: userData.password,
    address: userData.address,
  };

  // Use the `sendMixedContentRequest` utility to send the request
  return sendMixedContentRequest(
    "http://localhost:8090/api/v1/management/user/employee/new",
    "form",
    jsonData,
    "picture",
    userData.picture ?? null,
    `${token}`
  );
};

export default addUser;
