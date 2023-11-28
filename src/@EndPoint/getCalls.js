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

export const getUsersByType = async (data, header) => {
  return axios(
    config(data, "/user/type?userType=" + data.userType, header)
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
export const getRateList = async header => {
  return axios(config(null, "/rate-list", header));
};

export const getAllInvoices = async header => {
  return axios(config(null, "/invoice-all", header));
};

export const getInvoiceByID = async (data, header) => {
  return axios(config(null, "/invoice?id=" + data.id, header));
};

export const getDashboardData = async header => {
  return axios(config(null, "/dashboard", header));
};

export const getBrandList = async header => {
  return axios(config(null, "/brand-list", header));
};

export const getSubBrandList = async header => {
  return axios(config(null, "/sub-brand-list", header));
};

export const getCAtegoryList = async header => {
  return axios(config(null, "/category-list", header));
};

export const getWarehouseList = async header => {
  return axios(config(null, "/warehouse-list", header));
};

export const getTransactionList = async header => {
  return axios(config(null, "/transaction-list", header));
};

export const getProductList = async header => {
  return axios(config(null, "/product-list", header));
};

export const getCustomerList = async header => {
  return axios(config(null, "/customer-list", header));
};

export const getCustomerById = async (data, header) => {
  return axios(config(null, "/customer-list?id=" + data.id, header));
};

export const getProductById = async (data, header) => {
  return axios(config(null, "/product-list?id=" + data.id, header));
};

export const getBill = async header => {
  return axios(config(null, "/bill-list", header));
};
