import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

export const deleteOne = async (
  endpoint: string,
  EntityId: number | string,
  itemId: number | string,
  resourceName: string // For logging or error messages
): Promise<void> => {
  const token = getCookie("token");
  console.log(
    `Deleting ${resourceName} with Vehicle ID: ${EntityId} and Permit ID: ${itemId}`
  );

  try {
    await axiosInstant.delete(`${baseUrl}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`${resourceName} successfully deleted.`);
  } catch (error) {
    console.error(`Failed to delete ${resourceName}`, error);
    throw new Error(`Unable to delete ${resourceName}`);
  }
};
