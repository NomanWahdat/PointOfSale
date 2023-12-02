import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import adminRoutes from "routes/adminRoutes";
import { addProduct } from "@EndPoint/postCalls";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastError } from "helpers/toastError";
import routes from "routes/paths";
import { getCompanyList } from "@EndPoint/getCalls";

export default function ProductAdd() {
  const [company, setCompany] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getCompany();
  }, [user]);
  const getCompany = () => {
    getCompanyList("Bearer " + user.token, "1")
      .then(res => {
        // Modify the response data structure
        const modifiedData = res.data.companyList.map(company => ({
          value: company._id,
          label: company.name
        }));

        // Set the modified data to the state
        setCompany(modifiedData);
      })
      .catch(err => {
        toast.error(err);
      });
  };
  const { user } = useSelector(store => store.user);
  const onSubmit = data => {
    addProduct({ data }, "Bearer " + user.token, "1")
      .then(res => {
        toast.success(res.data.message, {
          theme: "colored",
          position: "bottom-left"
        });
        navigate(routes.list_product);
        //console.log(res);
      })
      .catch(err => {
        toastError(err);
      });
    console.log(data);
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3">
      <p className="h3 m-3">Add Product</p>
      <ProductForm onSubmit={onSubmit} feature={company} />
    </Card>
  );
}
