import axiosInstant, { baseUrl } from "@/app/_axios/axios"; // Assuming axiosInstant has the base URL and headers configured
import { Project } from "@/app/_interfaces";
import { getCookie } from "cookies-next";

// Define the type for the project response (you can adjust based on your API response)
interface ProjectResponse {

    project: Project;
}

// Fetch project data by ID
export const getProject = async (
  projectId: number
): Promise<ProjectResponse> => {
  const token = getCookie("token");

  const response = await axiosInstant.get<ProjectResponse>(
    `${baseUrl}/management/project/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // Assuming the API response has the project details in data
};
