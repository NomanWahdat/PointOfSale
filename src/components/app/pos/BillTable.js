import {
  FormProvider,
  RHFControl,
  RHFSelect
} from "components/common/form";
import React, { useEffect, useState, useMemo } from "react";
import IconButton from "components/common/IconButton";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BillValidation } from "./BillValidation";
import CardDropdown from "components/common/CardDropdown";
import { Dropdown } from "react-bootstrap";
import { getProductList } from "@EndPoint/getCalls";
import { useSelector } from "react-redux";
import { toastError } from "helpers/toastError";

function TableBody({ header, onSubmit, item, setItem }) {
  const [discount, setDiscount] = useState(0);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const { user } = useSelector(store => store.user);

  const getProducts = () => {
    getProductList("Bearer " + user.token)
      .then(res => {
        setProduct(res.data.productList);
      })
      .catch(err => {
        toastError(err);
      });
  };

  useEffect(() => {
    getProducts();
    reset({
      _id: "",
      quantity: "",
      price: "",
      description: ""
    });
    setQuantity(0);
  }, []);

  const methods = useForm({
    mode: "onTouched",

    reValidateMode: "onChange",

    defaultValues: { quantityMethod: false },

    resolver: BillValidation
  });
  const { handleSubmit, watch, reset, setValue } = methods;
  const productName = watch("_id");
  const productQuantity = watch("quantity");
  const productRate = watch("price");
  useEffect(() => {
    const filteredProducts = product.filter(
      product => product._id === productName
    );
    if (filteredProducts.length > 0) {
      setDiscount(filteredProducts[0].discount);
      setQuantity(filteredProducts[0].quantity);
      setValue("price", filteredProducts[0].price);
    }
    // You can do something with the userType value here
  }, [productName]);

  useEffect(() => {
    const disc = discount / 100;
    const originalTotal = productQuantity * productRate;
    setTotal(originalTotal - originalTotal * disc);
  }, [productQuantity, productRate]);

  const editRow = key => {
    const updatedItem = [...item];
    updatedItem.splice(key, 1);
    reset({
      quantity: item[key]?.quantity,
      price: item[key]?.price,
      description: item[key]?.description,
      _id: item[key]?._id
    });
    setDiscount(item[key]?.discount);
    setItem(updatedItem);
  };
  const deleteRow = key => {
    const updatedItem = [...item];
    updatedItem.splice(key, 1);
    setDiscount(0);
    setItem(updatedItem);
  };
  const productOption = useMemo(() => {
    //const filtered = brandList.filter(item => !item.parentBrand);
    return product.map(item => {
      return {
        label: item.name,
        value: item._id,
        code: item.code,
        desc: item?.desc
      };
    });
  }, [product]);
  const handleFormSubmit = data => {
    if (quantity >= data.quantity) {
      onSubmit({ ...data, discount: discount, total: total });
      reset({
        quantity: "",
        price: "",
        description: ""
      });
      setDiscount(0);
    } else {
      toastError({
        message: quantity + "unit is present in the stock"
      });
    }
  };
  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Table className="w-100 table table-borderless">
        <thead className="bg-200 text-900 md-4">
          <tr>
            {header.map((item, index) => {
              return (
                <th key={index} className={item.className}>
                  {item.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {item &&
            item.map((data, key) => {
              return (
                <tr key={key}>
                  <td className="align-middle text-center">
                    {data?._id}
                    <p>{data?.description}</p>
                  </td>
                  <td className="align-middle text-center col-sm-2">
                    {data?.price}
                  </td>
                  <td className="align-middle text-center col-sm-2">
                    {data?.quantity}
                  </td>
                  <td className="align-middle text-center pb-3">
                    {data?.discount} %
                  </td>
                  <td className="align-middle text-center pb-3">
                    {data.total} RS
                  </td>
                  <td className="align-middle text-center pb-4 w-25">
                    <CardDropdown iconClassName="fs--1">
                      <div className="py-2">
                        <Dropdown.Item onClick={() => editRow(key)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => deleteRow(key)}
                        >
                          Delete
                        </Dropdown.Item>
                      </div>
                    </CardDropdown>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td className="align-middle">
              <RHFSelect
                placeHolder="Enter Product"
                name={"_id"}
                className="pb-3"
                options={productOption}
              />
              <RHFControl
                placeHolder="Description"
                name="description"
              />
            </td>
            <td className="align-middle col-sm-2 px-4">
              <RHFControl placeHolder="0" name="price" />
            </td>
            <td className="align-middle col-sm-2 px-4">
              <RHFControl placeHolder="0" name="quantity" />
            </td>
            <td className="align-middle text-center pb-4">
              {discount} %
            </td>
            <td className="align-middle text-center pb-4">
              {total} RS
            </td>
            <td className="align-middle text-center pb-4 w-25">
              <IconButton
                variant="falcon-default"
                size="md"
                icon="trash"
                onClick={() => {
                  reset({
                    quantity: "",
                    price: "",
                    description: ""
                  });
                }}
                transform="shrink-3"
              />
              <IconButton
                variant="falcon-default"
                size="sx"
                icon="plus"
                type="submit"
                transform="shrink-3"
                className="ms-2 me-2"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </FormProvider>
  );
}
export default TableBody;

TableBody.propTypes = {
  header: PropTypes.array,
  onSubmit: PropTypes.func,
  setItem: PropTypes.func,
  item: PropTypes.array,
  product: PropTypes.func
};
