import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";
import { UserAxiosResponse } from "../_interfaces";

export const fetchUser = async (userId: number): Promise<UserAxiosResponse> => {
  const token = getCookie("token");
  console.log("token in fetch user", token);

  const { data } = await axiosInstant.get<UserAxiosResponse>(
    `${baseUrl}/management/user/application/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data; // Return the data object assuming it matches the UserAxiosResponse structure
};
