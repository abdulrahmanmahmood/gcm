interface UpdatePermissionsPayload {
  userId: number;
  selectedPermissions: string[];
}
import { getCookie } from "cookies-next";

export const UpdateUserPermissions = async ({
  userId,
  selectedPermissions,
}: UpdatePermissionsPayload) => {
  const token = getCookie("token");

  const response = await fetch(
    `http://localhost:8090/api/v1/management/user/permission/${userId}?permissions=${selectedPermissions.join(
      ","
    )}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update permissions");
  }

  return response.json(); // You can adjust this based on your API response
};
