import { getCookie } from "cookies-next";
import axios from "axios";
import { ICompany } from "./fetchSCCompanyData";

export const updateCompanyData = async (
  companyId: number,
  updatedData: ICompany
): Promise<any> => {
  const token = getCookie("token");

  try {
    const response = await axios.put(
      `http://localhost:8090/api/v1/management/company/subcontractor/${companyId}/update`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating company data:", error);
    throw error;
  }
};
