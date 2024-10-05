import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";

export const updateUser = async (
  userId: number,
  userData: {
    fullName: string;
    email: string;
    gender: string;
    salary: number;
    birthDate: string;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  }
): Promise<any> => {
  const token = getCookie("token");
  console.log("token in update user", token);

  // Making the PUT request to update the user data
  const { data } = await axiosInstant.put(
    `${baseUrl}/management/user/employee/${userId}/update`, // Correct URL path
    {
      fullName: userData.fullName,
      email: userData.email,
      gender: userData.gender,
      salary: userData.salary,
      birthDate: userData.birthDate,
      phoneNumber: userData.phoneNumber,
      address: {
        street: userData.address.street,
        city: userData.address.city,
        state: userData.address.state,
        zipCode: userData.address.zipCode,
        country: userData.address.country,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data; // Return the response data
};
