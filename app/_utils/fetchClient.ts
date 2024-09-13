import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";
import { ClientAxiosResponse } from "../_interfaces"; // Ensure you have a proper interface for the Client response

export const fetchClient = async (
  clientId: number
): Promise<ClientAxiosResponse> => {
  const token = getCookie("token");
  console.log("token in fetch client", token);

  const { data } = await axiosInstant.get<ClientAxiosResponse>(
    `${baseUrl}/management/user/client/${clientId}`, // Correct URL
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data; // Return the response, make sure it matches your ClientAxiosResponse structure
};
