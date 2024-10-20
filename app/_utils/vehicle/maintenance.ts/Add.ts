import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "@/app/_axios/axios";

export interface IVehicleMaintenanceInput {
  scheduleDate: string;
  description: string;
  finishDateTime: string;
  status: string;
  vehicleId: string;
  inCharge: string;
}

export const addVehicleMaintenance = async (
  vehicleData: IVehicleMaintenanceInput
) => {
  const token = getCookie("token") as string; // Retrieve the token from cookies

  // Make the POST request with the project data
  const response = await axiosInstant.post(
    "/api/v1/management/vehicle/maintenance/new",
    vehicleData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // Assuming the response contains the added project data
};
