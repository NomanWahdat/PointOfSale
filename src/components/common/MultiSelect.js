import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelect = forwardRef(
  ({ options, placeHolder, ...rest }, ref) => {
    return (
      <Select
        ref={ref}
        closeMenuOnSelect={false}
        isMulti
        options={options}
        placeHolder={placeHolder}
        classNamePrefix="react-select"
        {...rest}
      />
    );
  }
);

MultiSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeHolder: PropTypes.string
};

export default MultiSelect;
