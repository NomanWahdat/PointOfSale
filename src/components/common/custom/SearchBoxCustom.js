/* eslint-disable react/prop-types */
import React from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FalconCloseButton from "components/common/FalconCloseButton";

const SearchBoxCustom = ({ globalFilter, setGlobalFilter }) => {
  return (
    <Form className="position-relative search-box">
      <Form.Control
        type="search"
        placeHolder="Search..."
        aria-label="Search"
        className="search-input"
        value={globalFilter}
        onChange={({ target }) => setGlobalFilter(target.value)}
      />
      <FontAwesomeIcon
        icon="search"
        className="position-absolute text-400 search-box-icon"
      />
      {globalFilter && (
        <div className="search-box-close-btn-container">
          <FalconCloseButton
            size="sm"
            noOutline
            onClick={() => setGlobalFilter("")}
          />
        </div>
      )}
    </Form>
  );
};

export default SearchBoxCustom;
