import LoginForm from "./LoginForm";
import Flex from "../common/Flex";
import React from "react";

const Login = () => (
  <>
    <Flex justifyContent="center" className="mb-2">
      <h3>Log in</h3>
    </Flex>
    <LoginForm />
  </>
);

export default Login;
