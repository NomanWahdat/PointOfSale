// This component manages bill/sale information
// Import necessary modules and components
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getSupplierList } from "@EndPoint/getCalls"; // Assuming this fetches supplier data
import { FormProvider, RHFSelect } from "components/common/form"; // Components for form handling
import { toastError } from "helpers/toastError"; // Function to display error messages
import TableBody from "./BillTable"; // Component for rendering bill table body
import BillTableFooter from "./BillTableFooter"; // Component for rendering bill table footer
import { BillHeaderValidation } from "./BillValidation"; // Validation rules for bill header

// Component definition
export default function Bill() {
  // State declarations
  const [customer, setCustomer] = useState([]); // Stores customer/supplier data
  const [customerName, setCustomerName] = useState(null); // Stores selected customer name
  const { user } = useSelector(store => store.user); // Retrieves user data from Redux store

  // Fetches customer data from an API endpoint
  const getCustomer = () => {
    getSupplierList("Bearer " + user.token)
      .then(res => {
        setCustomer(res.data.supplierList); // Updates customer state with fetched data
      })
      .catch(err => {
        toastError(err); // Displays error message in case of API call failure
      });
  };

  // Fetches customer data on component mount
  useEffect(() => {
    getCustomer();
  }, []);

  // State to manage items in the bill
  const [item, setItem] = useState([]);

  // Header configuration for the bill table
  const header = [
    { text: "Product", className: "" },
    { text: "Rate", className: "text-center" },
    { text: "Quantity", className: "text-center" },
    { text: "Desc", className: "text-center" },
    { text: "Amount", className: "text-center" },
    { text: " ", className: "text-end" }
  ];

  // Form handling using react-hook-form library
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: BillHeaderValidation // Validation rules for the form
  });

  // Maps fetched customer data into options for the select dropdown
  const customerOption = useMemo(() => {
    return customer.map(item => {
      return {
        label: item.name,
        value: item._id
      };
    });
  }, [customer]);

  // Destructuring form methods for form submission
  const { handleSubmit } = methods;

  // Function to handle submission of the form
  const onSubmit = data => {
    setItem([...item, data]); // Updates item list with submitted data
  };

  // Function to handle form submission for customer selection
  const handleFormSubmit = data => {
    const filteredDiscount = customer.filter(
      customer => customer._id === data.customerName
    );
    setCustomerName({
      _id: data.customerName,
      discount: filteredDiscount[0].discount // Sets the selected customer's discount
    });
  };

  // Rendering the component
  return (
    <>
      {/* FormProvider for managing form state */}
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleFormSubmit)} // Form submission handler
      >
        <Card className="mt-3">
          <Card.Header className="flex align-items-center">
            {/* Title for the card */}
            <p
              style={
                {
                  /* Styles for the title */
                }
              }
            >
              Sale
            </p>
          </Card.Header>
          <Card.Body>
            <Row className="">
              {/* Dropdown to select a customer */}
              <Col md={6}>
                <RHFSelect
                  name={"customerName"}
                  placeHolder={"Name"}
                  options={customerOption}
                />
              </Col>
              {/* Button to confirm customer selection */}
              <Col md={6}>
                <Button type="submit" className="text-center mt-1">
                  Confirm
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </FormProvider>

      {/* Card for displaying bill table */}
      <Card className="my-3">
        <Card.Body>
          {/* Component to render the bill table body */}
          <TableBody
            header={header}
            onSubmit={onSubmit}
            item={item}
            setItem={setItem}
          />
          {/* Component to render the bill table footer */}
          <BillTableFooter item={item} customerName={customerName} />
        </Card.Body>
      </Card>
    </>
  );
}
