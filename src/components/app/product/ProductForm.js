//it is a generic form for edit and add function for product
import {
  FormProvider,
  RHFControl,
  RHFSelect
} from "components/common/form"; // Assuming form-related components are being imported from a specific folder
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ProductValidation } from "./ProductValidation"; // Importing the validation schema for the product form

// Component for rendering the Product Form
function ProductForm({ isEdit, initValues, onSubmit, feature }) {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: ProductValidation // Applying the validation schema to the form
  });

  const { handleSubmit, reset } = methods;

  // useEffect to set initial form values when initValues change
  useEffect(() => {
    // Resetting the form with initial values when 'initValues' change
    reset({
      name: initValues?.name,
      model: initValues?.model,
      stockalert: initValues?.stockalert,
      companyId: initValues?.companyId
    });
  }, [initValues]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Form Fields */}
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
            name={"companyId"}
            options={feature} // Options for company selection
            groupClassName={"mb-3"}
            groupStyles={{ marginBottom: "3%" }}
            noOptional={true}
          />
        </Col>
      </Row>
      {/* Submit Button */}
      <Button type="submit" className="text-center">
        {isEdit ? "Update" : "Add"}{" "}
        {/* Dynamic button text based on whether it's an edit or addition */}
      </Button>
    </FormProvider>
  );
}

// Prop Types for the ProductForm component
ProductForm.propTypes = {
  onSubmit: PropTypes.func, // Function to handle form submission
  isEdit: PropTypes.func, // Flag indicating if it's an edit or addition
  initValues: PropTypes.object, // Initial values for the form
  feature: PropTypes.array // Array of features (used for company selection)
};

export default ProductForm; // Exporting the ProductForm component
