import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

export const FetchAllData = async (
  endpoint: string, // Pass the dynamic endpoint
  pageNumber: number,
  pageSize: number,
  searchKeyword: string = "", // Default to an empty string
  filters: any = {}, // Default to an empty object
  sortBy: string[] = ["ID_ASC"], // Default sorting order
  DataFetchingName: string
) => {
  const token = getCookie("token");
  console.log("data fetching ", DataFetchingName);
  try {
    const { data } = await axiosInstant.post(
      `${baseUrl}/${endpoint}`, // Use the dynamic endpoint here
      {
        pageNumber,
        pageSize,
        searchKeyword: searchKeyword === "" ? null : searchKeyword, // Send null if empty string
        sortProperties: sortBy, // Sorting column and direction combined, e.g., "FULL_NAME_ASC"
        ...filters, // Include any filters in the request body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
    );
    return data.data; // Return the relevant data from response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data"); // Handle errors
  }
};
