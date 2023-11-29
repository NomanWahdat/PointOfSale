import React from "react";
import { Card } from "react-bootstrap";
import ProductForm from "./CompanyForm";
import { useNavigate } from "react-router-dom";
import { addUser } from "@EndPoint/postCalls";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastError } from "helpers/toastError";
import routes from "routes/paths";

export default function CompanyAdd() {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);
  const onSubmit = data => {
    addUser({ data }, "Bearer " + user.token, "1")
      .then(res => {
        toast.success(res.data.message, {
          theme: "colored",
          position: "bottom-left"
        });
        navigate(routes.list_employee);
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
      <ProductForm onSubmit={onSubmit} />
    </Card>
  );
}
