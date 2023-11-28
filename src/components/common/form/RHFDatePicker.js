import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import propTypes from "prop-types";
import DatePicker from "react-datepicker";

export const RHFDatePicker = ({ name, label, ...rest }) => {
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
          <DatePicker
            selected={value}
            onChange={date => onChange(date)}
            formatWeekDay={day => day.slice(0, 3)}
            className="form-control"
            placeHolderText="Select Date"
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

RHFDatePicker.propTypes = {
  name: propTypes.string,
  label: propTypes.string
};
