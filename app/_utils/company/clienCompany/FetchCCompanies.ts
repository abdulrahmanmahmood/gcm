import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

export const FetchCCompanies = async (
  pageNumber: number,
  pageSize: number,
  searchKeyword: string
) => {
  const token = getCookie("token");
  console.log("token in fetch companies", token);

  const { data } = await axiosInstant.post(
    `${baseUrl}/management/company/client/all`,
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
