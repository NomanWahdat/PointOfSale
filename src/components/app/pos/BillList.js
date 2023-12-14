//this file is used to render the table to show the list of sales

// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes/paths";

// Component and helper function imports related to table display
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableHeader from "components/common/advance-table/AdvanceTableHeader";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";

// Column configurations for the bill list table
const columns = [
  // Each object represents a column in the table
  // Definition for columns: billNumber, customer, discount, total, terms, notes
  // Each column has accessor, Header, headerProps, Cell (if needed), and cellProps
  // For example, the 'Discount' column displays discount with its type
  {
    accessor: "billNumber",
    Header: "Id",
    headerProps: { className: "pe-1 invoice-header" },
    cellProps: {
      className: "py-2"
    }
  }
  // ... other column definitions
];

// Component definition for displaying the list of bills
const BillList = () => {
  // State and hook declarations
  const [globalFilter, setGlobalFilter] = useState(""); // State for global search filter
  const navigate = useNavigate(); // Navigation hook
  const [bills, setBills] = useState([]); // State to store list of bills
  const { user } = useSelector(store => store.user); // Retrieves user data from Redux store

  // Function to fetch bills data (commented out for now)
  const getBills = () => {
    // Implementation commented out for example purposes
    // It appears to fetch bill data using an API endpoint and user token
  };

  // Effect hook to fetch bills when the 'user' changes
  useEffect(() => {
    getBills();
  }, [user]);

  // Function to search for values within the bill data
  function findInValues(arr, value) {
    value = String(value).toLowerCase();
    return arr.filter(o =>
      Object.entries(o).some(entry =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
  }

  // Rendering the component
  return (
    <div className="staff d-flex justify-content-center">
      {/* Conditional rendering based on bills existence */}
      {bills ? (
        // Wrapper for the advanced table component
        <AdvanceTableWrapper
          columns={columns}
          data={
            globalFilter === ""
              ? bills
              : findInValues(bills, globalFilter)
          }
          selection
          sortable
          pagination
          perPage={15}
        >
          {/* Card containing the bill list table */}
          <Card className="mb-3 w-100">
            <Card.Header>
              {/* Header for the bill list table */}
              <AdvanceTableHeader
                title={"Bill List"}
                table
                isSearch
                isOptions
                isNew
                handleAdd={() => {
                  navigate(routes.add_bill);
                }}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Card.Header>
            <Card.Body className="p-0">
              {/* Actual table component displaying bill data */}
              <AdvanceTable
                table
                headerClassName="bg-200 text-900 text-nowrap align-middle"
                rowClassName="align-middle white-space-nowrap"
                tableProps={{
                  size: "sm",
                  className: "fs--1 mb-0 overflow-hidden"
                }}
              />
            </Card.Body>
            <Card.Footer>
              {/* Pagination component for the bill list table */}
              <AdvanceTablePagination table />
            </Card.Footer>
          </Card>
        </AdvanceTableWrapper>
      ) : (
        // Spinner displayed while bills are being fetched
        <Spinner />
      )}
    </div>
  );
};

export default BillList;
