import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

/**
 * Change the business status of multiple companies.
 * @param companyIds - An array of company IDs.
 * @param status - The new business status to set (can be any valid status or null).
 * @returns A promise that resolves to the response data.
 */
export const changeCompaniesStatus = async (
  companyIds: (number | null)[],
  status: string | null
) => {
  const token = getCookie("token");

  try {
    // Create the query string in the format: ids=1,2,3&status=newStatus
    const query = `ids=${companyIds.join(",")}&status=${status}`;

    const response = await axiosInstant.put(
      `${baseUrl}/management/company/business-status?${query}`,
      null, // No request body needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error changing company status:", error);
    throw error; // Propagate the error to the caller
  }
};
