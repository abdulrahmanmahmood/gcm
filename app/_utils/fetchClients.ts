import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";
// import { UsersResponse } from "../_interfaces";

export const fetchClient = async (pageNumber: number, pageSize: number) => {
  const token = getCookie("token");
  console.log("token in fetch user", token);

  const { data } = await axiosInstant.post(
    `${baseUrl}/management/user/client/all`, // Corrected URL path
    {
      pageNumber,
      pageSize,
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

  return data.data; // Adjust based on your actual response structure
};
