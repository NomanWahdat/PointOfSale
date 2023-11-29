import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CompanyForm from "./CompanyForm";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import routes from "routes/paths";
import { toastError } from "helpers/toastError";
import { useSelector } from "react-redux";
import { updateCompany } from "@EndPoint/putCalls";
import { getCompanyByID } from "@EndPoint/getCalls";
export default function CompanyEdit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);

  const [customer, setCustomer] = useState(null);
  const getCustomer = () => {
    getCompanyByID({ _id }, "Bearer " + user.token, "1")
      .then(res => {
        console.log(res);
        setCustomer(res.data.company);
      })
      .catch(err => {
        toastError(err);
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);
  const onSubmit = data => {
    try {
      updateCompany(
        { _id: _id, ...data },
        "Bearer " + user.token,
        "1"
      )
        .then(res => {
          console.log(res);
          toast.success(res.data.message, {
            theme: "success"
          });
          navigate(routes.list_supplier);
        })
        .catch(err => {
          console.log(err);
          toastError(err);
        });
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3 text-center">
      <p className="h3 m-3">Update Customer</p>
      <CompanyForm
        onSubmit={onSubmit}
        isEdit={true}
        initValues={customer}
      />
    </Card>
  );
}
