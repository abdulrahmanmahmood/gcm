import axiosInstant, { baseUrl } from "@/app/_axios/axios";
import { getCookie } from "cookies-next";

interface UploadData {
  [key: string]: File | string | Blob; // Represents form-data which can include files and other fields
}
interface UploadOptions {
  method?: "POST" | "PUT"; // Optional method, default is POST
}

// Create a reusable function to upload files to a given endpoint
export const uploadFiles = async (
  endpoint: string, // The dynamic endpoint passed from the component
  uploadData: UploadData, // Data to be uploaded (files and other fields)
  options: UploadOptions = {} // Optional options object to choose the method
): Promise<any> => {
  const { method = "POST" } = options; // Default to POST if method is not provided
  const token = getCookie("token");
  console.log(`Uploading files to ${endpoint} with data`, uploadData);

  const formData = new FormData();

  // Append all data to the formData object
  Object.entries(uploadData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Make the POST request to the provided endpoint with form-data
  try {
    const { data } = await axiosInstant({
      url: `${baseUrl}/${endpoint}`,
      method,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload successful", data);
    return data; // Return the response
  } catch (error) {
    console.error("Failed to upload files", error);
    throw new Error("Unable to upload files");
  }
};
