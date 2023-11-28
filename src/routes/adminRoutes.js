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
  ]
};

export default [adminRoutes];
