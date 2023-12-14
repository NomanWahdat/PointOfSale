// File Description: This component is responsible for adding a new company by rendering a form using CompanyForm component.

import React from "react";
import { Card } from "react-bootstrap";
import ProductForm from "./CompanyForm"; // Assuming the form component for adding a company is named CompanyForm
import { useNavigate } from "react-router-dom";
import { addCompany } from "@EndPoint/postCalls"; // Function to add a company via API endpoint
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastError } from "helpers/toastError"; // Helper function for displaying error toasts
import routes from "routes/paths"; // File containing route paths

// Component for adding a new company
export default function CompanyAdd() {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user); // Retrieves user data from Redux store

  // Function to handle form submission when adding a new company
  const onSubmit = data => {
    addCompany({ data }, "Bearer " + user.token, "1") // Adding a new company via API call
      .then(res => {
        toast.success(res.data.message, {
          theme: "colored",
          position: "bottom-left"
        }); // Display success toast on successful addition
        navigate(routes.list_company); // Redirect to the company list page after successful addition
      })
      .catch(err => {
        toastError(err); // Display error toast if company addition fails
      });
    console.log(data); // Logging form data
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3">
      <p className="h3 m-3">Add Company</p>
      {/* Render the CompanyForm component for adding a new company */}
      <ProductForm onSubmit={onSubmit} />
    </Card>
  );
}
