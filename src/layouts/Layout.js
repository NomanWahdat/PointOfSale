import React, { useContext, useEffect } from "react";
import is from "is_js";
import AppContext from "context/Context";
import { Route, Routes } from "react-router-dom";
import routes from "../routes/paths";
import AuthSimpleLayout from "./AuthSimpleLayout";
import SimpleLogin from "../components/authentication/Login";
import NotFound from "../components/pages/NotFound";
import { useSelector } from "react-redux";
import MainLayout from "./MainLayout";
import Dashboard from "components/dashboard";

const Layout = () => {
  const { isAuthenticated } = useSelector(store => store.user);
  const HTMLClassList =
    document.getElementsByTagName("html")[0].classList;
  useContext(AppContext);
  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add("windows");
    }
    if (is.chrome()) {
      HTMLClassList.add("chrome");
    }
    if (is.firefox()) {
      HTMLClassList.add("firefox");
    }
  }, [HTMLClassList]);
  return (
    <>
      <Routes>
        {isAuthenticated && (
          <Route element={<MainLayout />}>
            <Route path={routes.dashboard} element={<Dashboard />} />

          </Route>
        )}
        {/*- ------------- Authentication ---------------------------  */}
        <Route element={<AuthSimpleLayout />}>
          <Route path={routes.login} element={<SimpleLogin />} />
        </Route>
        {/* //--- MainLayout end  */}
        {/* <Navigate to="/errors/404" /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Layout;
