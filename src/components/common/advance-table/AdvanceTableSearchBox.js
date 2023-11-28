/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useAsyncDebounce } from "react-table";

const AdvanceTableSearchBox = ({
  globalFilter,
  setGlobalFilter,
  placeHolder = "Search..."
}) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup className="position-relative">
      <FormControl
        value={value || ""}
        onChange={({ target: { value } }) => {
          setValue(value);
          onChange(value);
        }}
        size="sm"
        id="search"
        placeHolder={placeHolder}
        type="search"
        className="shadow-none"
      />
      <InputGroup.Text className="bg-transparent">
        <FontAwesomeIcon icon="search" className="fs--1 text-600" />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default AdvanceTableSearchBox;
