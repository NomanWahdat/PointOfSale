import { getCustomerList,getSupplierList } from "@EndPoint/getCalls";
import { FormProvider, RHFSelect } from "components/common/form";
import { toastError } from "helpers/toastError";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TableBody from "./BillTable";
import BillTableFooter from "./BillTableFooter";
import { BillHeaderValidation } from "./BillValidation";

export default function Bill() {
  const [customer, setCustomer] = useState([]);
  const [customerName, setCustomerName] = useState(null);
  const { user } = useSelector(store => store.user);

  const getCustomer = () => {
    getSupplierList("Bearer " + user.token)
      .then(res => {
        setCustomer(res.data.supplierList);
      })
      .catch(err => {
        toastError(err);
      });
  };

  useEffect(() => {
    getCustomer();
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

  const customerOption = useMemo(() => {
    return customer.map(item => {
      return {
        label: item.name,
        value: item._id
      };
    });
  }, [customer]);

  const { handleSubmit } = methods;
  const onSubmit = data => {
    setItem([...item, data]);
  };
  const handleFormSubmit = data => {
    const filteredDiscount = customer.filter(
      customer => customer._id === data.customerName
    );
    setCustomerName({
      _id: data.customerName,
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
            <p
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "28px",
                display: "flex",
                alignItems: "flex-end",
                color: "#344050"
              }}
            >
              Sale
            </p>
          </Card.Header>
          <Card.Body>
            <Row className="">
              <Col md={6}>
                <RHFSelect
                  name={"customerName"}
                  placeHolder={"Name"}
                  options={customerOption}
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
          />
          <BillTableFooter item={item} customerName={customerName} />
        </Card.Body>
      </Card>
    </>
  );
}
