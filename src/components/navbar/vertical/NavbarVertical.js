import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Nav, Navbar, Row, Col } from "react-bootstrap";
import { navbarBreakPoint, topNavbarBreakpoint } from "config";
import AppContext from "context/Context";
import Flex from "components/common/Flex";
import Logo from "components/common/Logo";
import NavbarVerticalMenu from "./NavbarVerticalMenu";
import ToggleButton from "./ToggleButton";
import { capitalize } from "helpers/utils";
import NavbarTopDropDownMenus from "components/navbar/top/NavbarTopDropDownMenus";
import bgNavbar from "assets/img/generic/bg-navbar.png";

//import { useSelector } from "react-redux";
import adminRoutes from "routes/adminRoutes";

const NavbarVertical = () => {
  const {
    config: {
      navbarPosition,
      navbarStyle,
      isNavbarVerticalCollapsed,
      showBurgerMenu
    }
  } = useContext(AppContext);

  const HTMLClassList =
    document.getElementsByTagName("html")[0].classList;
  //const { user } = useSelector(store => store.user);
  useEffect(() => {
    if (isNavbarVerticalCollapsed) {
      HTMLClassList.add("navbar-vertical-collapsed");
    } else {
      HTMLClassList.remove("navbar-vertical-collapsed");
    }
    return () => {
      HTMLClassList.remove("navbar-vertical-collapsed-hover");
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add("navbar-vertical-collapsed-hover");
      }, 100);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(time);
    HTMLClassList.remove("navbar-vertical-collapsed-hover");
  };

  const NavbarLabel = ({ label }) => (
    <Nav.Item as="li">
      <Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
        <Col
          xs="auto"
          className="navbar-vertical-label navbar-vertical-label"
        >
          {label}
        </Col>
        <Col className="ps-0">
          <hr className="mb-0 navbar-vertical-divider"></hr>
        </Col>
      </Row>
    </Nav.Item>
  );

  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames("navbar-vertical sticky-kit", {
        [`navbar-${navbarStyle}`]: navbarStyle !== "transparent"
      })}
      variant="light"
      style={{ marginTop: "15px" }}
    >
      <Flex alignItems="center">
        <ToggleButton />
        <Logo at="navbar-vertical" width={40} />
      </Flex>
      <Navbar.Collapse
        className=""
        in={showBurgerMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          marginTop: "1px",
          backgroundImage:
            navbarStyle === "vibrant"
              ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${bgNavbar})`
              : "none"
        }}
      >
        <div className="navbar-vertical-content scrollbar">
          <Nav className="flex-column" as="ul">
            {adminRoutes.map(route => (
              <Fragment key={route.label}>
                {!route.labelDisable && (
                  <NavbarLabel label={capitalize(route.label)} />
                )}
                <NavbarVerticalMenu routes={route.children} />
              </Fragment>
            ))}
          </Nav>

          <>
            {navbarPosition === "combo" && (
              <div className={`d-${topNavbarBreakpoint}-none`}>
                <div className="navbar-vertical-divider">
                  <hr className="navbar-vertical-hr my-2" />
                </div>
                <Nav navbar>
                  <NavbarTopDropDownMenus />
                </Nav>
              </div>
            )}
          </>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarVertical.propTypes = {
  label: PropTypes.string
};

export default NavbarVertical;
