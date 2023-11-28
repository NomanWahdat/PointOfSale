import { login } from "@EndPoint/getCalls";
import { userActions } from "@store/user/userSlice";
import { FormProvider, RHFControl } from "../common/form";
import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import routes from "routes/paths";

import { LoginValidation } from "./LoginValidation";
import { toastError } from "../../helpers/toastError";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: LoginValidation
  });

  const { handleSubmit } = methods;

  const onSubmit = data => {
    setLoading(true);
    console.log(data);
    login(data)
      .then(res => {
        toast.success("You are logged in.", {
          theme: "colored",
          position: "bottom-left"
        });
        setLoading(false);
        dispatch(userActions.login(res.data));
        navigate(routes.dashboard);
      })
      .catch(err => {
        setLoading(false);
        //toast.error(err, {
        //  theme: "colored"
        //});
        toastError(err);
      });
  };
  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row className="justify-content-between align-items-center">
        <Col md="12">
          <RHFControl
            label={"Username"}
            name={"username"}
            placeHolder={"Username"}
          />
        </Col>
      </Row>
      <Row className="justify-content-between align-items-center">
        <Col md="12">
          <RHFControl
            label={"Password"}
            name={"password"}
            placeHolder={"Password"}
          />
        </Col>
      </Row>

      <Form.Group className="text-center">
        {loading ? (
          <Spinner animation="grow" variant="primary" />
        ) : (
          <Button type="submit" className="mt-3 w-100">
            Log in
          </Button>
        )}
      </Form.Group>
    </FormProvider>
  );
};

export default LoginForm;
