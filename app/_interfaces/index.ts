import { ReactNode } from "react";

/////////////  Login Data   ///////////

export interface LoginFormData {
  email: string;
  password: string;
}

///////////// Drawer Items   ///////////

export interface IDrawerItem {
  id: string;
  title: string;
  icon: ReactNode;
  url: string;
}

///////////// User Mangment Data Interfaces  ///////////

export interface User {
  id: number;
  fullName: string;
  email: string;
  enabled: boolean;
  locked: boolean;
  createdDate: string;
  modifiedDate: string | null;
  authorities: string[];
  gender: string;
  existsPicture: boolean;
  getPictureDownloadUrl: string | null;
  getPictureViewUrl: string | null;
  role?: string;
  salary?: number;
  phoneNumber?: number;
  birthDate?: string;
  address?: string;
  pictureViewUrl?: string;
}

export interface Cleint {
  id: number;
  fullName: string;
  email: string;
  enabled: boolean;
  locked: boolean;
  createdDate: string;
  modifiedDate: string | null;
  authorities: string[];
  gender: string;
  existsPicture: boolean;
  getPictureDownloadUrl: string | null;
  getPictureViewUrl: string | null;
  role?: string;
  company?: {
    name: string;
    id: number;
    logoDownloadUrl: string;
    logoViewUrl: string;
  };
}

export interface UsersAxiosResponse {
  content: User[];
  totalElementsCount?: number;
  totalPagesCount: number;
  pageElementsCount: number;
  pageSize: number;
  pageNumber: number;
  emptyPage: boolean;
  firstPage: boolean;
  lastPage: boolean;
  sortedPage: boolean;
}

export interface UserAxiosResponse {
  data: User;
  status: number;
  message: string;
}

export interface ClientAxiosResponse {
  content: User[] | Cleint[] | any;
  emptyPage: boolean;
  firstPage: boolean;
  lastPage: boolean;
  pageElementCount: number;
  pageNumber: number;
  pageSize: number;
  sortedPage: boolean;
  totalPagesCount: number;
  totalElementsCount: number;
}
//

///////////////  Permissinos   ///////////

export interface PermissionsUserAxiosResponse {
  data: {
    content: PermissonUser[] | any;
    emptyPage: boolean;
    firstPage: boolean;
    lastPage: boolean;
    pageElementCount: number;
    pageNumber: number;
    pageSize: number;
    sortedPage: boolean;
    totalPagesCount: number;
    totalElementsCount: number;
  };
  status: number;
  message: string;
}

export interface PermissonUser {
  email: string;
  fullName: string;
  id: number;
  permissions: number;
  pictureExists: boolean;
  pictureViewUl?: string | null;
  rows: Row[];
}

export interface UserPermissinosResponse {
  data: PermissonUser;
  message: string;
  success: string;
}

export interface Row {
  description: string;
  permission: string;
  selected: boolean;
}

// //////////////////Companies//////////////////

export interface Company {
  branches: any[]; // Assuming it's an array, but you can define a more specific type if needed
  createdDate: string; // Date as a string in ISO format
  email: string;
  faxNumber: string | null; // Could be string or null
  headInfo: any | null; // Define a specific type if you know the structure
  id: number;
  industry: string | null;
  logoDownloadUrl: string | null;
  logoExists: boolean;
  logoViewUrl: string | null;
  modifiedDate: string | null; // This can be a string or null if not modified yet
  name: string;
  status: "OPEN" | "CLOSED"; // Assuming these are the only possible values
  type: "CLIENT" | "PARTNER"; // Assuming these are possible values, add more if necessary
  website: string | null;
}

export interface CompanyAxiosResponse {
  content: Company[] | any;
  emptyPage: boolean;
  firstPage: boolean;
  lastPage: boolean;
  pageElementCount: number;
  pageNumber: number;
  pageSize: number;
  sortedPage: boolean;
  totalPagesCount: number;
  totalElementsCount: number;
}
