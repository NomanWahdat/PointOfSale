import {
  FormProvider,
  RHFControl,
  RHFPhoneInput
} from "components/common/form";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { SupplierValidation } from "./SupplierValidation";

function SupplierFrom({ isEdit, initValues, onSubmit }) {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: SupplierValidation
  });

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
            label="Supplier Name"
            placeHolder="Name"
            name="name"
          />
        </Col>
        <Col md="6">
          <RHFPhoneInput label="Number" name="phoneNumber" />
        </Col>
        <Col md="6">
          <RHFControl
            label="shopName"
            placeHolder="shopName"
            name="shopName"
          />
        </Col>
        <Col md="6">
          <RHFControl label="city" placeHolder="city" name="city" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Button type="submit" className="text-center w-100">
            {isEdit ? "Update" : "Add"}
          </Button>
        </Col>
      </Row>
    </FormProvider>
  );
}

SupplierFrom.propTypes = {
  onSubmit: PropTypes.func,
  isEdit: PropTypes.func,
  initValues: PropTypes.object,
  feature: PropTypes.array
};

export default SupplierFrom;
