import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// const MAX_FILE_SIZE = 1048576;

const BillSchema = Yup.object().shape({
  _id: Yup.object().required("Required Field"),
  rate: Yup.number()
    .typeError("Please enter a valid number")
    .required("Required Field"),
  quantity: Yup.number()
    .typeError("Please enter a valid number")
    .required("Required Field"),
  disc: Yup.number()
    .typeError("Please enter a valid number")
    .required("Required Field")
});

const BillValidation = yupResolver(BillSchema);

const BillFooterSchema = Yup.object().shape({
  notes: Yup.string().required("Required Field"),
  terms: Yup.string().required("Required Field"),
  discount: Yup.number().required("Required Field")
});

const BillFooterValidation = yupResolver(BillFooterSchema);

const BillHeaderSchema = Yup.object().shape({
  customerName: Yup.string().required("Required Field")
});

const BillHeaderValidation = yupResolver(BillHeaderSchema);

export {
  BillValidation,
  BillFooterValidation,
  BillHeaderValidation
};
