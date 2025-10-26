import { API_URL } from "../constant/common";
import { parseApiError } from "../helpers/error";
import axios from "axios";

const postfileApi = async ({
  url,
  body,
  contentType = "multipart/form-data",
}) => {
  const fullUrl = `${API_URL}/${url}`;
  const headers = {
    Accept: "multipart/form-data",
    "Content-Type": contentType,
  };

  return axios
    .post(fullUrl, body, { headers, withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(parseApiError(error));
    });
};

const postApi = async ({ url, body, contentType = "application/json" }) => {
  const fullUrl = `${API_URL}/${url}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
  };

  return axios
    .post(fullUrl, body, { headers, withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);

      throw new Error(parseApiError(error));
    });
};

const getRandomApi = async ({
  url,
  body,
  contentType = "application/json",
}) => {
  const fullUrl = `${url}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
  };

  return axios
    .get(fullUrl, body, { headers, withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(parseApiError(error));
    });
};
const getApi = async ({ url }) => {
  const fullUrl = `${API_URL}/${url}`;

  return axios
    .get(fullUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(parseApiError(error));
    });
};

export { postApi, getRandomApi, postfileApi, getApi };
