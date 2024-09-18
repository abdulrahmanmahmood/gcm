import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

interface UpdateEntityData {
  [key: string]: any; // This represents the dynamic data structure for any entity
}

// Create a reusable function that accepts an endpoint as a prop
export const updateEntity = async (
  endpoint: string, // The dynamic endpoint passed from the component
  updateData: UpdateEntityData // Data to be updated
): Promise<any> => {
  const token = getCookie("token");
  console.log(`Updating entity at ${endpoint} with data`, updateData);

  // Make the PUT request to the provided endpoint
  const { data } = await axiosInstant.put(
    `${baseUrl}/${endpoint}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data; // Return the response
};
