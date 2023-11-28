import React from "react";
import { Form } from "react-bootstrap";

const ReactFormInput = ({
  name,
  label,
  type,
  placeHolder,
  disabled,
  error,
  errorMessage,
  register
}) => {
  console.log("error", error);

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...register("barcode")}
        type={type}
        name={name}
        placeHolder={placeHolder}
        isInvalid={error}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">
        {error && errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export { ReactFormInput };
