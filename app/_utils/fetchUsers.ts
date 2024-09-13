import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";
import { UsersAxiosResponse } from "../_interfaces";

export const fetchUsers = async (
  pageNumber: number,
  pageSize: number,
  searchKeyword: string
) => {
  const token = getCookie("token");
  console.log("token in fetch user", token);

  const { data } = await axiosInstant.post(
    `${baseUrl}/management/user/application/all`,
    {
      pageNumber,
      pageSize,
      searchKeyword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data; // Adjust based on your actual response structure
};
