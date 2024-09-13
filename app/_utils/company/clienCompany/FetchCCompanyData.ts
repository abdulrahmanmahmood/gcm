import axios from "axios";
import { getCookie } from "cookies-next";

export interface ICompany {
  id: number;
  name: string;
  email: string;
  faxNumber: string | null;
  headInfo: {
    name: string;
    email: string;
    phoneNumber: string;
  } | null;
  createdDate: string;
  modifiedDate: string | null;
  industry: string | null;
  status: "ACTIVE" | "INACTIVE" | "CLOSED"; // Status types
  type: "CLIENT" | "PARTNER" | "SUBCONTRACTOR";
  website: string | null;
  logoViewUrl: string | null;
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
