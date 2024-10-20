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
  pictureExists: boolean;
  getPictureDownloadUrl: string | null;
  getPictureViewUrl: string | null;
  picture?: {
    data: string;
    id: string;
    basename: string;
    extension: string;
    contentType: string;
    size: number;
    uploadDate: string;
  };
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
  pictureExists: boolean;
  getPictureDownloadUrl: string | null;
  getPictureViewUrl: string | null;
  picture?: {
    data: string;
    id: string;
    basename: string;
    extension: string;
    contentType: string;
    size: number;
    uploadDate: string;
  };
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

export interface AxiosErrorResponse {
  code: string;
  name: string;
  message: string;
  response: {
    data: {
      success: boolean;
      message: string;
    };
    status: number;
  };
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

// //////////////////Projects//////////////////

export interface Project {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
    logoExists: boolean;
    logo: string | null;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  status: "PENDING" | "COMPLETED" | "IN_PROGRESS"; // Enum-like values for status
  totalCost: number;
  remainCost: number;
  startDate: string; // ISO Date format as string
  endDate: string; // ISO Date format as string
}

export interface ProjectsAxiosResponse {
  content: Project[] | any;
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

// //////////////////Client Contract//////////////////
export interface ClientContract {
  id: number;
  company: {
    id: number;
    name: string;
    logoExits: boolean;
    logo: string;
  };
  project: {
    id: number;
    name: string;
  };
  image: {
    data: string;
    id: string;
    size: number;
    extension: string;
    contentType: string;
    baseName: string;
    uploadDate: string;
  };
  name: string;
  cost: number;
  startDate: string; // ISO Date format as string
  endDate: string; // ISO Date format as string
  createdDate: string;
  modifiedDate: string;
}
export interface ClientContractAxiosResponse {
  data: ClientContract[] | any;
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
// SUBCONTRACTORS//////////////////
export interface SubContractors {
  id: number;
  company: {
    name: string;
  };
  project: string;
  image: string;
  startDate: string; // ISO Date format as string
}

/////////////////// Conotainers//////////////////
export interface clientContainer {
  id: number;
  wasteType: string;
  status: string;
  volumeValue: string;
  weightValue: string;
}
