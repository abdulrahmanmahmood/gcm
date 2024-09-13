import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import {
  PermissionsUserAxiosResponse,
  UserAxiosResponse,
} from "@/app/_interfaces";
import { getCookie } from "cookies-next";

export const getUsers = async (userId: number): Promise<PermissionsUserAxiosResponse> => {
  const token = getCookie("token");
  console.log("token in permission fetch user", token);

  const { data } = await axiosInstant.post<PermissionsUserAxiosResponse>(
    `${baseUrl}/management/user/permission/all`,
    {
      pageNumber: 0,
      pageSize: 100,
      // sortProperties: [],
      // filterEnabled: false,
      // filterLocked: false,
      // filterGenders: [],
      // filterAuthorities: [],
      // filterRegistrationDate: "",
      // filterBirthDate: "",
      // filterSalary: null,
      // searchKeyword: "",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );  

  return data; // Return the data object assuming it matches the UserAxiosResponse structure
};
