import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";
import { UsersAxiosResponse } from "../_interfaces";

export const fetchUsers = async (
  pageNumber: number,
  pageSize: number,
  searchKeyword: string,
  filters: any,
  sortBy: string[] // Sorting key with direction
) => {
  const token = getCookie("token");
  const { data } = await axiosInstant.post(
    `${baseUrl}/management/user/employee/all`,
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
