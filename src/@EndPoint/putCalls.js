import axios from "axios";

import { BASE_URL } from "./URLs";

const config = (data, URL, header = null, key = null) => {
  return {
    method: "put",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
      key: key
    },
    data: data
  };
};

export const updateUser = async (data, header, key) => {
  return axios(config(data, "/editUser", header, key));
};

export const updateSupplier = async (data, header, key) => {
  return axios(config(data, "/editSupplier", header, key));
};

export const updateCompany = async (data, header, key) => {
  return axios(config(data, "/editCompany", header, key));
};

export const updateProduct = async (data, header, key) => {
  return axios(config(data, "/editProduct", header, key));
};
