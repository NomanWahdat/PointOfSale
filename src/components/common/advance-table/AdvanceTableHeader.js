/* eslint-disable react/prop-types */
import IconButton from "components/common/IconButton";
import PropTypes from "prop-types";
import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBoxCustom from "components/common/custom/SearchBoxCustom";

const AdvanceTableHeader = ({
  selectedRowIds,
  title,
  isExport,
  isImport,
  isNew,
  isFilter,
  isOptions,
  isSearch,
  handleAdd,
  icon = "ellipsis-h",
  globalFilter,
  setGlobalFilter,
  handleImport
}) => {
  return (
    <Row className="flex-between-center">
      <Col
        xs={6}
        sm="auto"
        className="d-flex align-items-center pe-0"
      >
        <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
          {title}
        </h5>
        {isSearch && (
          <div className="mx-4">
            <SearchBoxCustom
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        )}
      </Col>

      <Col xs={1} sm="auto" className="ms-auto text-end ps-0">
        {Object.keys(selectedRowIds).length > 0 ? (
          <div className="d-flex">
            <Form.Select size="sm" aria-label="Bulk actions">
              <option>Bulk Actions</option>
              <option value="delete">Delete</option>
            </Form.Select>
            <Button
              type="button"
              variant="falcon-default"
              size="sm"
              className="ms-2"
            >
              Apply
            </Button>
          </div>
        ) : (
          <div id="orders-actions " className="table-header-actions">
            {isImport && (
              <IconButton
                className="me-3"
                variant="falcon-default"
                size="md"
                icon="plus"
                transform="shrink-3"
                onClick={handleImport}
              >
                <span className="d-none d-sm-inline-block ms-1">
                  {"Import"}
                </span>
              </IconButton>
            )}
            {isNew && (
              <IconButton
                variant="falcon-default"
                size="md"
                icon="plus"
                transform="shrink-3"
                onClick={handleAdd}
              >
                <span className="d-none d-sm-inline-block ms-1">
                  {"Create"}
                </span>
              </IconButton>
            )}

            {isFilter && (
              <IconButton
                variant="falcon-default"
                size="md"
                icon="filter"
                transform="shrink-3"
                className="mx-2"
              >
                <span className="d-none d-sm-inline-block ms-1">
                  Filter
                </span>
              </IconButton>
            )}

            {isExport && (
              <IconButton
                variant="falcon-default"
                size="md"
                icon="external-link-alt"
                transform="shrink-3"
              >
                <span className="d-none d-sm-inline-block ms-1">
                  Export
                </span>
              </IconButton>
            )}
            {isOptions && (
              <div className="mx-3 ">
                <FontAwesomeIcon icon={icon} className="fs--2" />
              </div>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};

AdvanceTableHeader.propTypes = {
  selectedRowIds: PropTypes.object
};

export default AdvanceTableHeader;
