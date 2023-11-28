import React, { useContext } from "react";
import NavbarDropdown from "./NavbarDropdown";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppContext from "context/Context";
import adminRoutes from "routes/adminRoutes";

const NavbarTopDropDownMenus = () => {
  const {
    config: { navbarCollapsed, showBurgerMenu },
    setConfig
  } = useContext(AppContext);
  const handleDropdownItemClick = () => {
    if (navbarCollapsed) {
      setConfig("navbarCollapsed", !navbarCollapsed);
    }
    if (showBurgerMenu) {
      setConfig("showBurgerMenu", !showBurgerMenu);
    }
  };
  return (
    <>
      <NavbarDropdown title="dashboard">
        {adminRoutes.children[0].children.map(route => (
          <Dropdown.Item
            key={route.label}
            as={Link}
            className={route.active ? "link-600" : "text-500"}
            to={route.to}
            onClick={handleDropdownItemClick}
          >
            {route.label}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>
    </>
  );
};

export default NavbarTopDropDownMenus;
