import { USER_TYPE } from "data/constants";
import routes from "./paths";

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
      icon: "layer-group",
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
      icon: "layer-group",
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
      icon: "layer-group",
      value: 3,
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
    }
  ]
};

export default [adminRoutes];
