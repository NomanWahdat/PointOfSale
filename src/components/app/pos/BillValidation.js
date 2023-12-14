import { yupResolver } from "@hookform/resolvers/yup"; // Importing yupResolver from hookform for Yup schema validation
import * as Yup from "yup"; // Importing Yup for schema validation

// Schema for validating bill details in the form
const BillSchema = Yup.object().shape({
  _id: Yup.string().required("Required Field"), // Validation for bill ID
  description: Yup.string().required("Required Field"), // Validation for bill description
  price: Yup.number().required("Required Field"), // Validation for bill price
  quantity: Yup.number().required("Required Field") // Validation for bill quantity
});

// Using yupResolver to create validation for BillSchema
const BillValidation = yupResolver(BillSchema);

// Schema for validating footer details in the bill form
const BillFooterSchema = Yup.object().shape({
  notes: Yup.string().required("Required Field"), // Validation for notes in the bill footer
  terms: Yup.string().required("Required Field"), // Validation for terms in the bill footer
  discount: Yup.number().required("Required Field") // Validation for discount in the bill footer
});

// Using yupResolver to create validation for BillFooterSchema
const BillFooterValidation = yupResolver(BillFooterSchema);

// Schema for validating header details in the bill form
const BillHeaderSchema = Yup.object().shape({
  customerName: Yup.string().required("Required Field") // Validation for customer name in the bill header
});

// Using yupResolver to create validation for BillHeaderSchema
const BillHeaderValidation = yupResolver(BillHeaderSchema);

// Exporting the validation schemas for bill form components
export {
  BillValidation,
  BillFooterValidation,
  BillHeaderValidation
};
