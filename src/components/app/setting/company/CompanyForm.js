import {
  FormProvider,
  RHFControl,
  RHFPhoneInput
} from "components/common/form";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { CompanyValidation } from "./CompanyValidation";

function CompanyForm({ isEdit, initValues, onSubmit }) {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: CompanyValidation
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    console.log(initValues);
    reset({
      name: initValues?.name,
      phoneNumber: initValues?.phoneNumber
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
          <RHFPhoneInput label="Number" name="phoneNumber" />
        </Col>
      </Row>
      <Button type="submit" className="text-center">
        {isEdit ? "Update" : "Add"}
      </Button>
    </FormProvider>
  );
}

CompanyForm.propTypes = {
  onSubmit: PropTypes.func,
  isEdit: PropTypes.func,
  initValues: PropTypes.object
};

export default CompanyForm;
