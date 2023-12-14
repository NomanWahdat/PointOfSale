// File Description: This component provides a form for creating or editing company details.

import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  FormProvider,
  RHFControl,
  RHFPhoneInput
} from "components/common/form"; // Assuming the form controls are part of a common form component
import { useForm } from "react-hook-form";
import { CompanyValidation } from "./CompanyValidation"; // Validation schema for company form fields

function CompanyForm({ isEdit, initValues, onSubmit }) {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: CompanyValidation // Using the validation schema for company form fields
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    // Reset form values when initValues change
    reset({
      name: initValues?.name,
      phoneNumber: initValues?.phoneNumber
    });
  }, [initValues]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)} // Form submission handled by handleSubmit method
    >
      <Row className="g-2 d-flex justify-content-center">
        <Col md="6">
          {/* Input field for company name */}
          <RHFControl label="Name" placeHolder="Name" name="name" />
        </Col>
        <Col md="6">
          {/* Phone number input field */}
          <RHFPhoneInput label="Number" name="phoneNumber" />
        </Col>
      </Row>
      {/* Submit button for form submission */}
      <Button type="submit" className="text-center">
        {isEdit ? "Update" : "Add"}{" "}
        {/* Conditional button text based on edit mode */}
      </Button>
    </FormProvider>
  );
}

// Prop type validation for CompanyForm component
CompanyForm.propTypes = {
  onSubmit: PropTypes.func,
  isEdit: PropTypes.func,
  initValues: PropTypes.object
};

export default CompanyForm;
