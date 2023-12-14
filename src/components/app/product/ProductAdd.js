//this file is used to make edit form for product

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import ProductForm from "./ProductForm"; // Assuming this is a form component for adding a product
import { useNavigate } from "react-router-dom";
import { addProduct } from "@EndPoint/postCalls"; // Function for adding a product via API call
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // Toast notification library
import { toastError } from "helpers/toastError"; // Custom helper function for displaying error toasts
import routes from "routes/paths"; // File containing route paths
import { getCompanyList } from "@EndPoint/getCalls"; // Function to fetch company list from an API endpoint

// Component definition for adding a product
export default function ProductAdd() {
  const [company, setCompany] = useState({}); // State to store company data
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user); // Retrieves user data from Redux store

  // Fetches company data on component mount or when 'user' changes
  useEffect(() => {
    getCompany();
  }, [user]);

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
        toast.error(err); // Displaying error toast in case of API call failure
      });
  };

  // Function to handle form submission when adding a product
  const onSubmit = data => {
    addProduct({ data }, "Bearer " + user.token, "1")
      .then(res => {
        toast.success(res.data.message, {
          theme: "colored",
          position: "bottom-left"
        });
        navigate(routes.list_product); // Redirects to the product list page upon successful addition
      })
      .catch(err => {
        toastError(err); // Displays error toast for API call failure
      });
    console.log(data); // Logging the form data
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3">
      <p className="h3 m-3">Add Product</p>
      {/* Rendering the ProductForm component for adding a product */}
      <ProductForm onSubmit={onSubmit} feature={company} />
    </Card>
  );
}
