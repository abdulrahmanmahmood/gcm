import { getCookie } from "cookies-next";
import axiosInstant, { baseUrl } from "../_axios/axios";

export const lockUnlockUsers = async (userIds: number[], lock: boolean) => {
  const token = getCookie("token");

  try {
    // Create query params manually in the format expected: ids=4,3,34&locked=true
    const query = `ids=${userIds.join(",")}&locked=${lock}`;

    const response = await axiosInstant.put(
      `${baseUrl}/management/user/lock?${query}`,
      null, // No need for a request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error locking/unlocking users:", error);
    throw error;
  }
};
