import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";
// import { UsersResponse } from "../_interfaces";

export const fetchClients = async (
  pageNumber: number,
  pageSize: number,

  searchKeyword: string,
  filters: any,
  sortBy: string[] // Sorting key with direction
) => {
  const token = getCookie("token");
  console.log("token in fetch user", token);

  const { data } = await axiosInstant.post(
    `${baseUrl}/management/user/client/all`, // Corrected URL path
    {
      pageNumber,
      pageSize,
      searchKeyword: searchKeyword === "" ? null : searchKeyword, // Send null if empty string
      sortProperties: sortBy, // Sorting column and direction combined, e.g., "FULL_NAME_ASC"
      ...filters, // Include filters in the request body      // sortProperties: [],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.data; // Adjust based on your actual response structure
};
