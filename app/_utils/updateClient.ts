import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";

interface UpdateClientData {
  fullName: string;
  email: string;
  gender: string;
}

export const updateClient = async (
  clientId: number,
  userData: UpdateClientData
): Promise<any> => {
  const token = getCookie("token");
  console.log("token in update user", token);
  console.log("Updating client with data:", userData);

  // Making the PUT request to update the user data
  const { data } = await axiosInstant.put(
    `${baseUrl}/management/user/client/${clientId}/update`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};