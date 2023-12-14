// File Description: This component facilitates the editing of a company by displaying a form using CompanyForm component.

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CompanyForm from "./CompanyForm"; // Assuming the form component for editing a company is named CompanyForm
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import routes from "routes/paths"; // File containing route paths
import { toastError } from "helpers/toastError"; // Helper function for displaying error toasts
import { useSelector } from "react-redux";
import { updateCompany } from "@EndPoint/putCalls"; // Function to update company data via API endpoint
import { getCompanyByID } from "@EndPoint/getCalls"; // Function to get company data by ID via API endpoint

export default function CompanyEdit() {
  const { _id } = useParams(); // Retrieves company ID from URL parameters
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user); // Retrieves user data from Redux store

  const [customer, setCustomer] = useState(null);

  // Function to fetch company details by ID
  const getCustomer = () => {
    getCompanyByID({ _id }, "Bearer " + user.token, "1")
      .then(res => {
        setCustomer(res.data.company);
      })
      .catch(err => {
        toastError(err); // Display error toast if fetching company details fails
      });
  };

  useEffect(() => {
    getCustomer(); // Fetch company details on component mount
  }, []);

  // Function to handle form submission when updating company details
  const onSubmit = data => {
    try {
      updateCompany(
        { _id: _id, ...data },
        "Bearer " + user.token,
        "1"
      )
        .then(res => {
          toast.success(res.data.message, {
            theme: "success"
          }); // Display success toast on successful update
          navigate(routes.list_supplier); // Redirect to the company list page after successful update
        })
        .catch(err => {
          toastError(err); // Display error toast if company update fails
        });
    } catch (e) {
      toastError(e); // Display error toast if an exception occurs during update
    }
  };

  return (
    <Card className="mb-5 w-75 ms-5 p-3 text-center">
      <p className="h3 m-3">Update Customer</p>
      {/* Render the CompanyForm component for updating company details */}
      <CompanyForm
        onSubmit={onSubmit}
        isEdit={true}
        initValues={customer}
      />
    </Card>
  );
}
