// File Description: This component displays a list of companies in a table format.

import React, { useEffect, useState } from "react";
import { Card, Dropdown, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableHeader from "components/common/advance-table/AdvanceTableHeader";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import CardDropdown from "components/common/CardDropdown";
import { toast } from "react-toastify";
import { getCompanyList } from "@EndPoint/getCalls";
import routes from "routes/paths";

const CompanyList = () => {
  // Define table columns for company data display
  const columns = [
    {
      accessor: "name",
      Header: "Name",
      headerProps: { className: "pe-1 invoice-header" },
      cellProps: { className: "py-2" }
    },
    {
      accessor: "phoneNumber",
      Header: "Number",
      headerProps: { className: "pe-1 invoice-header" },
      cellProps: { className: "py-2" }
    },
    // Cell for displaying actions (Edit option)
    {
      accessor: "_id",
      disableSortBy: true,
      Header: () => {
        return (
          <div className="text-center">
            <FontAwesomeIcon icon={"ellipsis-h"} className="fs--2" />
          </div>
        );
      },
      cellProps: { className: "text-center" },
      Cell: rowData => {
        const { _id } = rowData.row.values;
        return (
          <CardDropdown
            iconClassName="fs--1"
            style={{ background: "orange" }}
          >
            <div className="py-2">
              {/* Dropdown option for editing company */}
              <Dropdown.Item
                onClick={() => {
                  navigate("/edit-company/" + _id);
                }}
              >
                Edit
              </Dropdown.Item>
            </div>
          </CardDropdown>
        );
      }
    }
  ];

  // State variables for managing company data and loading status
  const [globalFilter, setGlobalFilter] = useState("");
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  // Accessing user information from Redux store
  const { user } = useSelector(store => store.user);
  const navigate = useNavigate();

  // Function to fetch the list of companies
  const getCustomer = () => {
    setLoading(true);
    getCompanyList("Bearer " + user.token, "1")
      .then(res => {
        setCustomer(res.data.companyList);
        setLoading(false);
      })
      .catch(err => {
        toast.error(err);
      });
  };

  useEffect(() => {
    // Fetch companies on component mount or when user information changes
    getCustomer();
  }, [user]);

  // Function to filter values based on user input
  function findInValues(arr, value) {
    value = String(value).toLowerCase();
    return arr.filter(o =>
      Object.entries(o).some(entry =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
  }

  return (
    <div className="justify-content-center">
      {!loading ? ( // Render table when data is available, otherwise show a loading spinner
        <AdvanceTableWrapper
          columns={columns}
          data={
            globalFilter === ""
              ? customer
              : findInValues(customer, globalFilter)
          }
          sortable
          pagination
          perPage={10}
        >
          <Card className="mb-3 w-100">
            <Card.Header>
              {/* Table header with search functionality and add option */}
              <AdvanceTableHeader
                title={"Products"}
                table
                isNew
                isSearch
                handleAdd={() => {
                  navigate(routes.user_add);
                }}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Card.Header>
            <Card.Body className="p-0">
              {/* Actual table to display company data */}
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
              {/* Pagination controls for the table */}
              <AdvanceTablePagination table />
            </Card.Footer>
          </Card>
        </AdvanceTableWrapper>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompanyList;
