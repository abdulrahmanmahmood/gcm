// _utils/company/getAll.ts
import axios from "axios";
import { getCookie } from "cookies-next";

interface ICompany {
  id: string;
  name: string;
}

export const getAllCompanies = async (): Promise<ICompany[]> => {
  const token = getCookie("token");

  const response = await axios.post(
    "http://localhost:8090/api/v1/management/company/client/all",
    {
      pageNumber: 0,
      pageSize: 100,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data.content; // Assuming the companies are in response.data.data.content
};
