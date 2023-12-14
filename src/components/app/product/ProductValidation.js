// File Description: This file contains the validation schema for product data using Yup and is utilized for form validation.

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Define the validation schema for product data using Yup
const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Should not be empty"), // Validates product name as a non-empty string
  companyId: Yup.string().required("Should not be empty"), // Validates company ID as a non-empty string
  model: Yup.string().required("Required Field"), // Validates product model as a non-empty string
  stockalert: Yup.number() // Validates stock alert as a number
    .required("Required Field") // Requires a value for stock alert
    .typeError("Must be number") // Validates if it's a number type
    .nullable(true) // Allows null values for stock alert
});

// Resolve the validation schema using yupResolver from react-hook-form
const ProductValidation = yupResolver(ProductSchema);

export { ProductValidation }; // Export the ProductValidation for form validation
