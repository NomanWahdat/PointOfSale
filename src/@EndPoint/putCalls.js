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

export const updateInvoiceStatus = async (data, header) => {
  return axios(
    config(
      data,
      "/invoice/status?invoiceId=" + data.invoiceId,
      header
    )
  );
};
export const updatePassword = async (data, header) => {
  return axios(
    config(
      data,
      "/user/update-password?userId=" + data.userId,
      header
    )
  );
};

export const updateSupplier = async (data, header, key) => {
  return axios(config(data, "/editSupplier", header, key));
};


export const updateInvoice = async (data, header) => {
  return axios(
    config(
      data,
      "/invoice/update-invoice?invoiceId=" + data._id,
      header
    )
  );
};

export const updateWarehouse = async (data, header) => {
  return axios(
    config(data, "/warehouse/update?id=" + data._id, header)
  );
};

export const updateCustomer = async (data, header) => {
  return axios(config(data, "/customer-edit", header));
};

export const updateProduct = async (data, header) => {
  return axios(config(data, "/product-edit", header));
};
