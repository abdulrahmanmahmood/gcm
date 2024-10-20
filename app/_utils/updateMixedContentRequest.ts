import axios from "axios";
import { IFormInput } from "./addUser";
import { IClientInput } from "./addClient";

const updateMixedContentRequest = async (
  url: string,
  jsonKey: string,
  jsonData: IFormInput | IClientInput,
  imageKey: string,
  imageFile: File | null, // Make it nullable if imageFile is optional
  token: string
) => {
  // Create a custom FormData object
  const formData = new FormData();

  // Append the JSON data as a Blob with application/json content type
  const jsonBlob = new Blob([JSON.stringify(jsonData)], {
    type: "application/json",
  });
  formData.append(jsonKey, jsonBlob, "form.json");

  // Append the image file directly, as `File` is a subclass of `Blob`
  if (imageFile) {
    formData.append(imageKey, imageFile); // No need to wrap imageFile in a Blob
  }

  try {
    const response = await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        // Axios automatically sets the Content-Type to multipart/form-data for FormData objects
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateMixedContentRequest:", error);
    throw error;
  }
};

export default updateMixedContentRequest;
