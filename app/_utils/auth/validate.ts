// _utils/validate.ts

import axiosInstant from "@/app/_axios/axios";

/**
 * Validates the token with the backend.
 * @param token - The JWT token to validate.
 * @returns Promise that resolves to true if the token is valid, or throws an error if not.
 */
export async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await axiosInstant.post(
      `/api/v1/authentication/validate-jwt?token=${token}`
    );
    console.log("Token validation response: ", response.data);

    // Assume the backend returns { valid: true/false } in response.data
    return response.data.success;
  } catch (error) {
    console.error("Error validating token: ", error);
    throw new Error("Token validation failed.");
  }
}
