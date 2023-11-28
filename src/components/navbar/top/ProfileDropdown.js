import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import team3 from "assets/img/team/3.jpg";
import Avatar from "components/common/Avatar";
import { useDispatch } from "react-redux";
import { userActions } from "@store/user/userSlice";
import routes from "routes/paths";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={team3} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item as={Link} to={routes.account}>
            Account
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item
            as={Link}
            to={"/login"}
            onClick={() => {
              dispatch(userActions.logout());
            }}
          >
            Logout
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
