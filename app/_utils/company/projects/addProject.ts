// services/projectService.ts
import axiosInstant from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

// Define the expected shape of the project data
interface ProjectData {
  name: string;
  companyId: number;
  startDate: string;
  endDate: string;
  latitude: string;
  longitude: string;
}

// Modify the function to accept the `ProjectData` argument
export const addProject = async (projectData: ProjectData): Promise<any> => {
  const token = getCookie("token"); // Get the token from cookies

  // Make the POST request with the project data
  const response = await axiosInstant.post(
    "/api/v1/management/project/new",
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // Assuming the response contains the added project data
};
