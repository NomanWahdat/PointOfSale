import axios from "axios";

import { BASE_URL } from "./URLs";

const config = (data, URL, header = null, key = null) => {
  return {
    method: "post",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
      key: key
    },
    ...data
  };
};

export const addUser = async (data, header, key) => {
  return axios(config(data, "/addUser", header, key));
};

export const addSupplier = async (data, header, key) => {
  return axios(config(data, "/addSupplier", header, key));
};

export const addCompany = async (data, header, key) => {
  return axios(config(data, "/addCompany", header, key));
};
