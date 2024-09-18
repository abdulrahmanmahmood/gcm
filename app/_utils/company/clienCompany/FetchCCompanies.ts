import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

export const FetchCCompanies = async (
  pageNumber: number,
  pageSize: number,
  searchKeyword: string,
  filters: any,
  sortBy: string[] // Sorting key with direction
) => {
  const token = getCookie("token");
  console.log("token in fetch companies", token);
  console.log("Sorted By", sortBy);

  const { data } = await axiosInstant.post(
    `${baseUrl}/management/company/client/all`,
    {
      pageNumber,
      pageSize,
      searchKeyword: searchKeyword === "" ? null : searchKeyword, // Send null if empty string
      sortProperties: sortBy, // Sorting column and direction combined, e.g., "FULL_NAME_ASC"
      ...filters, // Include filters in the request body
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data; // Adjust based on your actual response structure
};
