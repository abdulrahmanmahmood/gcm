import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import {
  PermissionsUserAxiosResponse,
  UserAxiosResponse,
  UserPermissinosResponse,
} from "@/app/_interfaces";
import { getCookie } from "cookies-next";

export const getuserPermissions = async (
  userId: number
): Promise<UserPermissinosResponse> => {
  const token = getCookie("token");
  console.log("token in fetch user permissions", token);

  const { data } = await axiosInstant.get<UserPermissinosResponse>(
    `${baseUrl}/management/user/permission/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data; // Return the data object assuming it matches the UserAxiosResponse structure
};
