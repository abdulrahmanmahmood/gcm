import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

/**
 * Function to generate a manifest for a specific trip.
 * @param tripId - The ID of the trip for which the manifest will be generated.
 * @returns The response data from the API call.
 */

export const generateManifest = async (tripId: number) => {
  const token = getCookie("token");

  try {
    const response = await axiosInstant.get(
      `${baseUrl}/management/trip/${tripId}/manifest/generate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating manifest:", error);
    throw error;
  }
};
