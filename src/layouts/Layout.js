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
import AddEmployee from "components/app/user/UserAdd";
import UserEdit from "components/app/user/UserEdit";
import UserList from "components/app/user/UserList";
import SupplierAdd from "components/app/supplier/SupplierAdd";
import SupplierEdit from "components/app/supplier/SupplierEdit";
import SupplierList from "components/app/supplier/SupplierList";
import ProductAdd from "components/app/product/ProductAdd";
import Setting from "components/app/setting";
import CompanyList from "components/app/setting/company/CompanyList";
import CompanyEdit from "components/app/setting/company/CompanyEdit";

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
            <Route
              path={routes.add_employee}
              element={<AddEmployee />}
            />
            <Route
              path={routes.list_employee}
              element={<UserList />}
            />
            <Route
              path={routes.edit_employee}
              element={<UserEdit />}
            />
            <Route
              path={routes.add_supplier}
              element={<SupplierAdd />}
            />
            <Route
              path={routes.edit_supplier}
              element={<SupplierEdit />}
            />
            <Route
              path={routes.list_supplier}
              element={<SupplierList />}
            />
            <Route
              path={routes.add_product}
              element={<ProductAdd />}
            />
            <Route path={routes.setting} element={<Setting />} />
            <Route
              path={routes.list_company}
              element={<CompanyList />}
            />
            <Route
              path={routes.edit_company}
              element={<CompanyEdit />}
            />
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
