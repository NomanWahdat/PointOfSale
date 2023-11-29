const routes = {
  errors_404: "errors/404",
  errors_500: "errors/500",

  login: "/login",
  register: "/register",

  dashboard: "/",

  edit_employee: "/edit-employee/:_id",
  list_employee: "/employee-list",
  add_employee: "/add-employee",

  product_add: "/product-add",
  product_list: "/product-list",
  product_edit: "/product-edit/:id",

  customer_add: "/customer-add",
  customer_list: "/customer-list",
  customer_edit: "/customer-edit/:id",
  account: "/account",

  add_supplier: "/add-supplier",
  edit_supplier: "/edit-supplier/:_id",
  list_supplier: "/list-supplier",

  add_product: "/add-product",
  edit_product: "/edit-product/:_id",
  list_product: "/list-product",

  setting: "/setting",

  edit_company: "/edit-company/:_id",
  list_company: "/list-company"
};
export default routes;
