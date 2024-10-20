import axiosInstant from "@/app/_axios/axios";
import axios from "axios";

interface IProps {
  url: string;
  jsonParts: { key: string; data: object }[];
  fileParts: { key: string; file?: File | null; files?: File[] }[];
  token: string | undefined;
}

const sendMixedContentRequestFormsAndFiles = async ({
  fileParts,
  jsonParts,
  token,
  url,
}: IProps) => {
  const formData = new FormData();

  // Append each JSON part
  jsonParts.forEach(({ key, data }) => {
    const jsonBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    formData.append(key, jsonBlob, `${key}.json`);
    console.log("key IS", key, "data IS", data);
  });

  fileParts.forEach(({ key, file, files }) => {
    if (file) {
      formData.append(key, file);
    } else if (files) {
      files.forEach((file) => {
        formData.append(key, file);
      });
    }
  });

  console.log("JSON Parts:", jsonParts);
  console.log("File Parts:", fileParts);

  try {
    const response = await axiosInstant.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in sendMixedContentRequest:", error);
    throw error;
  }
};

export default sendMixedContentRequestFormsAndFiles;
