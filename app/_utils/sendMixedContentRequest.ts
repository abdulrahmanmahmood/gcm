import axios from "axios";
import { IFormInput } from "./addUser";
import { IClientInput } from "./addClient";

const sendMixedContentRequest = async (
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
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // You don't need to manually set Content-Type for FormData; Axios will do it automatically
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in sendMixedContentRequest:", error);
    throw error;
  }
};

export default sendMixedContentRequest;
