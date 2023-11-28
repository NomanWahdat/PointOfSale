import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required Field"),
  password: Yup.string()
    .required("Password should not be empty")
    .min(5, "length should be greater then 5 digits")
});

const LoginValidation = yupResolver(LoginSchema);

export { LoginValidation };
