import axios from "axios";
import { BASE_URL } from "./URLs";

const config = (data, URL, header = null, key = null) => {
  return {
    method: "get",
    url: BASE_URL + URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
      key: key
    },
    data: data
  };
};

export const login = async data => {
  return axios(
    config(
      data,
      "/login" +
        `?username=${data.username}&password=${data.password}`
    )
  );
};

export const getSupplierList = async (header, key) => {
  return axios(config(null, "/supplierList", header, key));
};

export const getSupplierByID = async (data, header, key) => {
  return axios(
    config(data, "/supplierList?_id=" + data._id, header, key)
  );
};

export const getUsersByID = async (data, header, key) => {
  return axios(
    config(data, "/UserList?_id=" + data._id, header, key)
  );
};

export const getUserList = async (header, key) => {
  return axios(config(null, "/UserList", header, key));
};

export const getCompanyList = async (header, key) => {
  return axios(config(null, "/companyList", header, key));
};

export const getCompanyByID = async (data, header, key) => {
  return axios(
    config(data, "/companyList?_id=" + data._id, header, key)
  );
};
