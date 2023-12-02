import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import SupplierFrom from "./SupplierFrom";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import routes from "routes/paths";
import { toastError } from "helpers/toastError";
import { useSelector } from "react-redux";
import adminRoutes from "routes/adminRoutes";
import { updateSupplier } from "@EndPoint/putCalls";
import { getSupplierByID } from "@EndPoint/getCalls";
export default function SupplierEdit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);

  const [customer, setCustomer] = useState(null);
  const feature = adminRoutes[0].children;
  const getCustomer = () => {
    getSupplierByID({ _id }, "Bearer " + user.token, "1")
      .then(res => {
        console.log(res);
        setCustomer(res.data.supplier);
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
      updateSupplier(
        { _id: _id, ...data },
        "Bearer " + user.token,
        "1"
      )
        .then(() => {
          toast.success("Customer is Updated", {
            theme: "success",
            position: "bottom-left"
          });
          navigate(routes.list_supplier);
        })
        .catch(err => {
          toastError(err);
        });
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3 text-center">
      <p className="h3 m-3">Update Customer</p>
      <SupplierFrom
        onSubmit={onSubmit}
        isEdit={true}
        initValues={customer}
        feature={feature}
      />
    </Card>
  );
}
