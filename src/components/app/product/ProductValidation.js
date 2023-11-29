import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// const MAX_FILE_SIZE = 1048576;

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Should not be empty"),
  company: Yup.string().required("Should not be empty"),
  model: Yup.string().required("Required Field"),
  stockalert: Yup.number()
    .required("Required Field")
    .typeError("Must be number")
    .nullable(true)
});

const ProductValidation = yupResolver(ProductSchema);

export { ProductValidation };
