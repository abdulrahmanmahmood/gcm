import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

export const fetchOneData = async <T>(
  endpoint: string,
  id: number | string, // Can be number or string
  resourceName: string // For logging or error messages
): Promise<T> => {
  const token = getCookie("token");
  console.log(`Fetching ${resourceName} with ID: ${id}`);

  try {
    const { data } = await axiosInstant.get<T>(`${baseUrl}/${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${resourceName}`, error);
    throw new Error(`Unable to fetch ${resourceName}`);
  }
};
