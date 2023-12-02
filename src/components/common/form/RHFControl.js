import React from "react";
import {
  Form,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

export const RHFControl = ({
  name,
  label,
  type = "text",
  endAddon,
  startAddon,
  iconOptions,
  selectedIcon,
  setSelectedIcon,
  defaultValue,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Group>
          {!!label && <Form.Label>{label}</Form.Label>}{" "}
          <InputGroup className="mb-3 position-relative">
            {startAddon ? startAddon : null}
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              type={type}
              isInvalid={!!error}
              {...field}
              {...rest}
              defaultValue={defaultValue}
            />
            {iconOptions && (
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={selectedIcon ? selectedIcon : "Select Icon"}
              >
                {iconOptions.map((icon, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setSelectedIcon(icon)}
                  >
                    {icon}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            )}
            {endAddon ? endAddon : null}
            {error && (
              <div className="invalid-feedback-custom">
                {error.message}
              </div>
            )}
          </InputGroup>
        </Form.Group>
      )}
    />
  );
};

RHFControl.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  endAddon: PropTypes.object,
  startAddon: PropTypes.object,
  selectedIcon: PropTypes.string,
  setSelectedIcon: PropTypes.func,
  defaultValue: PropTypes.any,
  iconOptions: PropTypes.array // Define prop type for iconOptions
};
