import { FormProvider, RHFControl } from "components/common/form";
import { toastError } from "helpers/toastError";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BillFooterValidation } from "./BillValidation";
//import { setBill } from "@EndPoint/postCalls";
import { useSelector } from "react-redux";

export default function BillTableFooter({ item, customerName }) {
  const icons = ["PKR", "%"];
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [totalBill, setTotalBill] = useState(0);
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    setValue("discount", customerName?.discount);
  }, [customerName]);

  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      quantityMethod: false,
      discount: 0
    },
    resolver: BillFooterValidation
  });

  const { handleSubmit, watch, setValue } = methods;
  const Discount = watch("discount");
  useEffect(() => {
    const totalAmount = item.reduce(
      (acc, item) => acc + item.total,
      0
    );
    if (selectedIcon == "PKR") {
      setTotalBill(totalAmount - Discount);
    } else {
      const disc = Discount / 100;
      setTotalBill(totalAmount - totalAmount * disc);
    }
  }, [selectedIcon, item, Discount]);
  useEffect(() => {
    const totalAmount = item.reduce(
      (acc, item) => acc + item.total,
      0
    );
    if (selectedIcon == "PKR") {
      setTotalBill(totalAmount - Discount);
    } else {
      const disc = Discount / 100;
      setTotalBill(totalAmount - totalAmount * disc);
    }
  }, [Discount]);
  const onsubmit = async data => {
    if (customerName) {
      if (!item.length == 0) {
        let discountType;

        if (selectedIcon === "PKR") {
          discountType = 1; // Set to 1 if the selected icon is "$"
        } else if (selectedIcon === "%") {
          discountType = 2; // Set to 2 if the selected icon is "%"
        }

        //await setBill(
        //  {
        //    data: {
        //      customerId: customerName._id,
        //      total: totalBill,
        //      ...data,
        //      discountType: discountType,
        //      products: item
        //    }
        //  },
        //  "Bearer " + user.token
        //);
      } else {
        toastError({
          message: "Please enter Item"
        });
      }
    } else {
      toastError({
        message: "Please enter customer Name"
      });
    }
  };
  const calculateProduct = () => {
    const totalAmount = item.reduce(
      (acc, item) => acc + item.total,
      0
    );
    if (totalAmount) {
      return totalAmount;
    }
    return 0;
  };
  const subtotal = calculateProduct();
  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onsubmit)}
    >
      <Row className="mx-2">
        <Col>
          Notes
          <RHFControl as="textarea" name="notes" />
        </Col>
        <Col>
          Term
          <RHFControl as="textarea" name="terms" />
        </Col>
        <Col>
          <Row>
            <Col>SubTotal</Col>
            <Col className="text-end">{subtotal} RS</Col>
          </Row>
          <Row className="d-flex align-items-center justify-content-around">
            <Col className="">Apply disc {selectedIcon}</Col>
            <Col className="mt-1">
              <RHFControl
                name="discount"
                placeholder="disc"
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                iconOptions={icons}
              />
            </Col>
          </Row>
          <Row className="border-bottom">
            <Col className="fst-normal">Discount</Col>
            <Col className="text-end">
              -{Discount} {selectedIcon}{" "}
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Total</Col>
            <Col className="text-end">{totalBill} RS </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="text-end mt-3">
          <Button type="submit" className="text-center">
            Issue Invoice
          </Button>
        </Col>
      </Row>
    </FormProvider>
  );
}

BillTableFooter.propTypes = {
  item: PropTypes.array,
  customerName: PropTypes.object
};
