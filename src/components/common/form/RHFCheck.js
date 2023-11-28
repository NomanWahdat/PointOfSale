import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import propTypes from "prop-types";

export const RHFCheck = ({
  name,
  label,
  type = "switch",
  ...rest
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Check
            {...field}
            type={type}
            // className="form-label-nogutter"
            {...rest}
          />
          <Form.Control.Feedback type="invalid">
            {error && error.message}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    />
  );
};

RHFCheck.propTypes = {
  name: propTypes.string,
  type: propTypes.string,
  label: propTypes.string
};
