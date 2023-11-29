import {
  FormProvider,
  RHFControl,
  RHFSelect
} from "components/common/form";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ProductValidation } from "./ProductValidation";

function ProductForm({ isEdit, initValues, onSubmit, feature }) {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: ProductValidation
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
          <RHFControl label="Name" placeHolder="Name" name="name" />
        </Col>
        <Col md="6">
          <RHFControl
            label="model"
            placeHolder="model"
            name="model"
          />
        </Col>
        <Col md="6">
          <RHFControl
            label="Stock Alert"
            type="number"
            placeHolder="stockalert"
            name={"stockalert"}
          />
        </Col>
        <Col md="6">
          <RHFSelect
            label={"company"}
            name={"company"}
            options={feature}
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

ProductForm.propTypes = {
  onSubmit: PropTypes.func,
  isEdit: PropTypes.func,
  initValues: PropTypes.object,
  feature: PropTypes.array
};

export default ProductForm;
