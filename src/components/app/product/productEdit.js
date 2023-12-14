//this file is used to make edit form for product

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ProductForm from "./ProductForm"; // Assuming this is a form component for editing a product
import { toast } from "react-toastify"; // Toast notification library
import { useNavigate, useParams } from "react-router-dom"; // Hooks for navigation and accessing route parameters
import routes from "routes/paths"; // File containing route paths
import { toastError } from "helpers/toastError"; // Custom helper function for displaying error toasts
import { useSelector } from "react-redux"; // Hook for accessing data from Redux store
import { updateProduct } from "@EndPoint/putCalls"; // Function for updating a product via API call
import { getProductByID, getCompanyList } from "@EndPoint/getCalls"; // Functions for fetching product and company data

// Component definition for editing a product
export default function ProductEdit() {
  const { _id } = useParams(); // Accessing the '_id' parameter from the URL
  const navigate = useNavigate();
  const [company, setCompany] = useState({}); // State to store company data
  const { user } = useSelector(store => store.user); // Retrieves user data from Redux store

  const [customer, setCustomer] = useState(null); // State to store product data

  // Function to fetch product data based on ID
  const getCustomer = () => {
    console.log(_id);
    getProductByID({ _id }, "Bearer " + user.token, "1")
      .then(res => {
        setCustomer(res.data.product); // Sets the fetched product data to state
      })
      .catch(err => {
        toastError(err); // Displays error toast if fetching product data fails
      });
  };

  // Function to fetch company list
  const getCompany = () => {
    getCompanyList("Bearer " + user.token, "1")
      .then(res => {
        // Modifying the response data structure for usage in the component
        const modifiedData = res.data.companyList.map(company => ({
          value: company._id,
          label: company.name
        }));

        // Setting the modified data to the state
        setCompany(modifiedData);
      })
      .catch(err => {
        toast.error(err); // Displays error toast if fetching company list fails
      });
  };

  // Fetching company list and product data on component mount
  useEffect(() => {
    getCompany();
    getCustomer();
  }, []);

  // Function to handle form submission when updating a product
  const onSubmit = data => {
    try {
      updateProduct(
        { _id: _id, ...data }, // Includes the product ID in the data for updating
        "Bearer " + user.token,
        "1"
      )
        .then(() => {
          toast.success("Product is Updated", {
            theme: "success",
            position: "bottom-left"
          });
          navigate(routes.list_product); // Redirects to the product list page upon successful update
        })
        .catch(err => {
          toastError(err); // Displays error toast if updating product fails
        });
    } catch (e) {
      toastError(e); // Handles exceptions during the update process
    }
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3">
      <p className="h3 m-3">Update Product</p>
      {/* Rendering the ProductForm component for updating a product */}
      <ProductForm
        onSubmit={onSubmit}
        isEdit={true} // Flag indicating it's an edit operation
        initValues={customer} // Initial values for the form populated with the fetched product data
        feature={company} // Company data for select dropdown in the form
      />
    </Card>
  );
}
