import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import UserForm from "./UserForm";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import routes from "routes/paths";
import { toastError } from "helpers/toastError";
import { useSelector } from "react-redux";
import { updateUser } from "@EndPoint/putCalls";
import { getUsersByID } from "@EndPoint/getCalls";
import adminRoutes from "routes/adminRoutes";
export default function UserEdit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);

  const [customer, setCustomer] = useState(null);
  const feature = adminRoutes[0].children;
  const getCustomer = () => {
    console.log(_id);
    getUsersByID({ _id }, "Bearer " + user.token, "1")
      .then(res => {
        setCustomer(res.data.user);
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
      updateUser({ _id: _id, ...data }, "Bearer " + user.token, "1")
        .then(() => {
          toast.success("Customer is Updated", {
            theme: "success",
            position: "bottom-left"
          });
          navigate(routes.list_employee);
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
      <p className="h3 m-3">Update Employee</p>
      <UserForm
        onSubmit={onSubmit}
        isEdit={true}
        initValues={customer}
        feature={feature}
      />
    </Card>
  );
}
