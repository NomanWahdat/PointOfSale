// File Description: Validation schema for company name and phone number.

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { phoneRegExp } from "@validation/regex"; // Assuming phoneRegExp is a regex pattern for phone numbers

// Define validation schema using Yup
const CompanySchema = Yup.object().shape({
  name: Yup.string().required("Should not be empty"), // Validate that the name is a non-empty string
  phoneNumber: Yup.string()
    .required("Required Field") // Validate that phone number is a required field
    .matches(phoneRegExp, "Phone number is not valid") // Validate phone number format using regex
    .min(10, "Phone Number length should be greater than 10 digits") // Validate minimum phone number length
});

// Resolve the validation schema using yupResolver
const CompanyValidation = yupResolver(CompanySchema);

export { CompanyValidation };
