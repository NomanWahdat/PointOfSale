// File Description: Defines the routes accessible to admin users along with role-based access.

import { USER_TYPE } from "data/constants";
import routes from "./paths";
import {
  faUserCog,
  faBoxes,
  faCoins
} from "@fortawesome/free-solid-svg-icons";
export const adminRoutes = {
  label: "Dashboard",
  labelDisable: true,
  roles: [
    USER_TYPE.ADMIN,
    USER_TYPE.PRODUCTION_HEAD,
    USER_TYPE.PRODUCTION_UNIT
  ],
  children: [
    {
      label: "Dashboard",
      value: 1,
      active: true,
      icon: "chart-pie",
      to: routes.dashboard,
      roles: [
        USER_TYPE.ADMIN,
        USER_TYPE.PRODUCTION_HEAD,
        USER_TYPE.PRODUCTION_UNIT
      ]
    },
    {
      label: "Employee",
      icon: "user",
      value: 2,
      active: true,
      roles: [USER_TYPE.ADMIN, USER_TYPE.PRODUCTION_HEAD],
      children: [
        {
          label: "Add employee",
          to: routes.add_employee,
          active: true,
          roles: []
        },
        {
          label: "List Employee",
          to: routes.list_employee,
          active: true,
          roles: []
        }
      ]
    },
    {
      label: "supplier",
      icon: "users",
      value: 3,
      active: true,
      roles: [USER_TYPE.ADMIN, USER_TYPE.PRODUCTION_HEAD],
      children: [
        {
          label: "Add supplier",
          to: routes.add_supplier,
          active: true,
          roles: []
        },
        {
          label: "List supplier",
          to: routes.list_supplier,
          active: true,
          roles: []
        }
      ]
    },
    {
      label: "Product",
      icon: faBoxes,
      value: 4,
      active: true,
      roles: [USER_TYPE.ADMIN, USER_TYPE.PRODUCTION_HEAD],
      children: [
        {
          label: "Add product",
          to: routes.add_product,
          active: true,
          roles: []
        },
        {
          label: "List product",
          to: routes.list_product,
          active: true,
          roles: []
        }
      ]
    },
    {
      label: "Purchase",
      icon: faCoins,
      value: 4,
      active: true,
      roles: [USER_TYPE.ADMIN, USER_TYPE.PRODUCTION_HEAD],
      children: [
        {
          label: "Add Bill",
          to: routes.add_purchase,
          active: true,
          roles: []
        },
        {
          label: "List Bill",
          to: routes.list_purchase,
          active: true,
          roles: []
        }
      ]
    },
    {
      label: "Sale",
      icon: faCoins,
      value: 4,
      active: true,
      roles: [USER_TYPE.ADMIN, USER_TYPE.PRODUCTION_HEAD],
      children: [
        {
          label: "Add Bill",
          to: routes.add_sale,
          active: true,
          roles: []
        },
        {
          label: "List Bill",
          to: routes.list_sale,
          active: true,
          roles: []
        }
      ]
    },
    {
      label: "Setting",
      icon: faUserCog,
      value: 5,
      active: true,
      to: routes.setting,
      roles: [USER_TYPE.ADMIN, USER_TYPE.PRODUCTION_HEAD],
      children: [
        {
          label: "List Company",
          to: routes.list_company,
          active: true,
          roles: []
        },
        {
          label: "List product",
          to: routes.list_product,
          active: true,
          roles: []
        }
      ]
    }
  ]
};

export default [adminRoutes];
