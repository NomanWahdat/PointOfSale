import {
  FormProvider,
  RHFControl,
  RHFPhoneInput,
  RHFSelect
} from "components/common/form";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { UserValidation } from "./UserValidation";

function UserForm({ isEdit, initValues, onSubmit, feature }) {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: UserValidation
  });

  const userType = [
    {
      label: "Admin",
      value: 1
    },
    {
      label: "Salesman",
      value: 2
    }
  ];

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    console.log(initValues?.role);
    reset({
      username: initValues?.username,
      phoneNumber: initValues?.phoneNumber,
      password: initValues?.password,
      role: initValues?.role,
      feature: initValues?.feature
    });
  }, [initValues]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row className="g-2 d-flex justify-content-center">
        <Col md="6">
          <RHFControl
            label="Employee Name"
            placeHolder="Name"
            name="username"
          />
        </Col>
        <Col md="6">
          <RHFPhoneInput label="Number" name="phoneNumber" />
        </Col>
        <Col md="6">
          <RHFControl
            label="Password"
            placeHolder="Password"
            name="password"
          />
        </Col>
        <Col md="6">
          <RHFSelect
            label={"User Type"}
            name={"role"}
            options={userType}
            noOptional={true}
          />
        </Col>
        <Col md="12">
          <RHFSelect
            label={"accessible Feature"}
            name={"feature"}
            options={feature}
            isMulti={true}
            groupClassName={"mb-3"}
            groupStyles={{ marginBottom: "3%" }}
            noOptional={true}
          />
        </Col>
      </Row>
      <Button type="submit" className="text-center">
        {isEdit ? "Update" : "Add"}
      </Button>
    </FormProvider>
  );
}

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  isEdit: PropTypes.func,
  initValues: PropTypes.object,
  feature: PropTypes.array
};

export default UserForm;
