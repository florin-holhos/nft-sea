import axios from "axios";
import * as Types from "types";

const JWT = process.env.NEXT_PUBLIC_PINATA_API_KEY;

export const pinFileToIPFS = async (file: File, name: string) => {
  const formData = new FormData();

  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name,
  });

  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });

  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    return { data: res.data, error: null };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: axios.isAxiosError(error)
        ? error.response?.data.error
        : "Error sending File to IPFS",
    };
  }
};

export const pinJsonToIPFS = async (data: Types.ObjectMetadata) => {
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        pinataMetadata: {
          name: `${data.name.trim().replace(/(\s+)/g, "-")}.json`,
        },
        pinataContent: data,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    return { data: res.data, error: null };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: axios.isAxiosError(error)
        ? error.response?.data.error
        : "Error sending File to IPFS",
    };
  }
};
