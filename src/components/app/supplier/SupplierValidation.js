import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { phoneRegExp } from "@validation/regex";
// const MAX_FILE_SIZE = 1048576;

const SupplierSchema = Yup.object().shape({
  name: Yup.string().required("Should not be empty"),
  phoneNumber: Yup.string()
    .required("Required Field")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone Number length should be greater then 10 digits"),
  shopName: Yup.string().required("Required Field"),
  city: Yup.string().required("Required Field")
});

const SupplierValidation = yupResolver(SupplierSchema);

export { SupplierValidation };
