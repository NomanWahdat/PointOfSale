import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import AppContext from "context/Context";

import ProductProvider from "components/app/e-commerce/ProductProvider";
import NavbarTop from "components/navbar/top/NavbarTop";
import NavbarVertical from "components/navbar/vertical/NavbarVertical";

const MainLayout = () => {
  const { hash, pathname } = useLocation();
  // const isChat = pathname.includes('chat');

  const {
    config: { isFluid, navbarPosition }
  } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            block: "start",
            behavior: "smooth"
          });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={isFluid ? "container-fluid" : "container"}>
      {(navbarPosition === "vertical" ||
        navbarPosition === "combo") && <NavbarVertical />}
      <ProductProvider>
        <div className={classNames("content", "pb-0")}>
          <NavbarTop />
          {/*------ Main Routes ------*/}
          <Outlet />
        </div>
      </ProductProvider>
    </div>
  );
};

export default MainLayout;
