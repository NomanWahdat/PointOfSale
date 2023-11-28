import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import propTypes from "prop-types";
import ReactPhoneInput from "react-phone-input-2";

export const RHFPhoneInput = ({ name, label, ...rest }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <Form.Group>
          {!!label && <Form.Label>{label}</Form.Label>}
          <ReactPhoneInput
            country="pk"
            value={value}
            onChange={phone => onChange(phone)}
            {...rest}
          />
          {error && (
            <div className="invalid-feedback-custom">
              {error.message}
            </div>
          )}
        </Form.Group>
      )}
    />
  );
};

RHFPhoneInput.propTypes = {
  name: propTypes.string,
  label: propTypes.string
};
