import axios from "axios";
import { getCookie } from "cookies-next";

export interface ICompany {
  data: {
    id: number;
    name: string;
    email: string;
    website: string | null;
    faxNumber: string | null;
    industry: string | null;
    headInfo: {
      headFullName: string;
      headEmail: string;
      headPhoneNumber: string;
    } | null;
    status: "ACTIVE" | "INACTIVE" | "CLOSED"; // Status types
    type: "CLIENT" | "PARTNER" | "SUBCONTRACTOR";
    logoExists: boolean;
    logo: string | null;
    createdDate: string;
    modifiedDate: string | null;
    address: {
      street: string;
      city: string;
      zipCode: string;
      state: string;
      country: string;
    };
    branches: Array<{
      name: string;
      phoneNumber: string;
      address: string;
      locationUrl: string;
    }> | null;
  };
}

export const fetchCCompanyData = async (
  companyId: number
): Promise<ICompany> => {
  const token = getCookie("token");
  const response = await axios.get<ICompany>(
    `http://localhost:8090/api/v1/management/company/client/${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
