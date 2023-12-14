// File Description: This component renders a list of products using an AdvanceTable component,
// allowing users to view and edit product details.

// Importing necessary components and libraries
import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableHeader from "components/common/advance-table/AdvanceTableHeader";
import AdvanceTablePagination from "components/common/advance-table/AdvanceTablePagination";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
//import CardDropdown from "components/common/CardDropdown";
import { getProductList } from "@EndPoint/getCalls"; // Function to fetch product list from API endpoint
import routes from "routes/paths"; // File containing route paths
import { toast } from "react-toastify"; // Toast notification library

// Component for displaying a list of products
const ProductList = () => {
  // Define columns for the table displaying product information
  const columns = [
    // Columns definition...
  ];

  // State variables
  const [globalFilter, setGlobalFilter] = useState(""); // State for global search filter
  const [customer, setCustomer] = useState([]); // State for storing product data
  const [loading, setLoading] = useState(false); // State for loading spinner
  const { user } = useSelector(store => store.user); // Retrieves user data from Redux store

  const navigate = useNavigate();

  // Function to fetch product list from API
  const getCustomer = () => {
    setLoading(true);
    getProductList("Bearer " + user.token, "1")
      .then(res => {
        setCustomer(res.data.productList);
        setLoading(false);
      })
      .catch(err => {
        toast.error(err); // Display error toast if API call fails
      });
  };

  // Fetch product list on component mount or when 'user' changes
  useEffect(() => {
    getCustomer();
  }, [user]);

  // Function to filter values in the table
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
      {/* Conditional rendering based on loading state */}
      {!loading ? (
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
            {/* Table Header */}
            <Card.Header>
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
            {/* Table Body */}
            <Card.Body className="p-0">
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
            {/* Table Footer */}
            <Card.Footer>
              <AdvanceTablePagination table />
            </Card.Footer>
          </Card>
        </AdvanceTableWrapper>
      ) : (
        // Show a spinner while loading
        <Spinner />
      )}
    </div>
  );
};

export default ProductList; // Export the ProductList component
