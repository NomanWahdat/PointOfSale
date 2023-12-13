import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import routes from "routes/paths";
import { toastError } from "helpers/toastError";
import { useSelector } from "react-redux";
import { updateProduct } from "@EndPoint/putCalls";
import { getProductByID, getCompanyList } from "@EndPoint/getCalls";
export default function productEdit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState({});
  const { user } = useSelector(store => store.user);

  const [customer, setCustomer] = useState(null);
  const getCustomer = () => {
    console.log(_id);
    getProductByID({ _id }, "Bearer " + user.token, "1")
      .then(res => {
        setCustomer(res.data.product);
      })
      .catch(err => {
        toastError(err);
      });
  };

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
  useEffect(() => {
    getCompany();
    getCustomer();
  }, []);
  const onSubmit = data => {
    try {
      updateProduct(
        { _id: _id, ...data },
        "Bearer " + user.token,
        "1"
      )
        .then(() => {
          toast.success("Customer is Updated", {
            theme: "success",
            position: "bottom-left"
          });
          navigate(routes.list_product);
        })
        .catch(err => {
          toastError(err);
        });
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3">
      <p className="h3 m-3">Update Product</p>
      <ProductForm
        onSubmit={onSubmit}
        isEdit={true}
        initValues={customer}
        feature={company}
      />
    </Card>
  );
}
