import { getSupplierList, getProductList } from "@EndPoint/getCalls";
import { FormProvider, RHFSelect } from "components/common/form";
import { toastError } from "helpers/toastError";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TableBody from "./BillTable";
import BillTableFooter from "./BillTableFooter";
import { BillHeaderValidation } from "./BillValidation";

export default function AddBill() {
  const [supplier, setsupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const [supplierName, setsupplierName] = useState(null);
  const { user } = useSelector(store => store.user);

  const getsupplier = () => {
    getSupplierList("Bearer " + user.token, "1")
      .then(res => {
        setsupplier(res.data.supplierList);
      })
      .catch(err => {
        toastError(err);
      });
  };
  //to call the function when user visit the page
  useEffect(() => {
    getsupplier();
    getProducts();
  }, []);

  const [item, setItem] = useState([]);
  const header = [
    { text: "Product", className: "" },
    { text: "Rate", className: "text-center" },
    { text: "Quantity", className: "text-center" },
    { text: "Desc", className: "text-center" },
    { text: "Amount", className: "text-center" },
    { text: " ", className: "text-end" }
  ];

  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { quantityMethod: false },
    resolver: BillHeaderValidation
  });
  // to get the supplier from the backend
  const supplierOption = useMemo(() => {
    return supplier.map(item => {
      return {
        label: item.name,
        value: item._id
      };
    });
  }, [supplier]);

  const getProducts = () => {
    getProductList("Bearer " + user.token, "1")
      .then(res => {
        const options = res.data.productList.map(item => {
          return {
            label: item.name,
            value: item._id
          };
        });
        setProduct(options);
      })
      .catch(err => {
        toastError(err);
      });
  };

  const { handleSubmit } = methods;
  const onSubmit = data => {
    setItem([...item, data]);
    console.log(item);
  };
  const handleFormSubmit = data => {
    const filteredDiscount = supplier.filter(
      supplier => supplier._id === data.supplierName
    );
    setsupplierName({
      _id: data.supplierName,
      discount: filteredDiscount[0].discount
    });
  };
  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Card className="mt-3">
          <Card.Header
            className="flex align-items-center"
            style={{
              alignSelf: "auto",
              display: "flex",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <p className="h3 m-3 text-center">Add Stock</p>
          </Card.Header>
          <Card.Body>
            <Row className="">
              <Col md={6}>
                <RHFSelect
                  name={"supplierName"}
                  placeHolder={"Name"}
                  options={supplierOption}
                />
              </Col>
              <Col md={6}>
                <Button type="submit" className="text-center mt-1">
                  Confirm
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </FormProvider>
      <Card className="my-3">
        <Card.Body>
          <TableBody
            header={header}
            onSubmit={onSubmit}
            item={item}
            setItem={setItem}
            dropDownOption={product}
          />
          <BillTableFooter item={item} supplierName={supplierName} />
        </Card.Body>
      </Card>
    </>
  );
}
