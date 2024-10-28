import { getCookie } from "cookies-next";
import axiosInstant from "@/app/_axios/axios";

export const addEntity = async (endpoint: string, data: any) => {
  // Retrieve the token from cookies if not provided
  const token = getCookie("token") as string; // Retrieve the token from cookies

  // Make the POST request with the provided data
  const response = await axiosInstant.post(endpoint, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // Assuming the response contains the added entity data
};
