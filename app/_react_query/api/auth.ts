import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { LoginFormData } from "@/app/_interfaces";

export const loginUser = async (data: LoginFormData) => {
  const response = await axiosInstant.post(
    `${baseUrl}/authentication/login`,
    data
  );
  return response.data;
};
