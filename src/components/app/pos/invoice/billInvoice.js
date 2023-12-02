import React from "react";
import Header from "./header";
import { Card, Col, Image, Row, Table } from "react-bootstrap";
import logo from "../../../../assets/img/logos/KEC.jpg";
const billInvoice = () => {
  const header = [
    { text: "Product", className: "" },
    { text: "Rate", className: "text-center" },
    { text: "Quantity", className: "text-center" },
    { text: "Desc", className: "text-center" },
    { text: "Amount", className: "text-center" },
    { text: " ", className: "text-end" }
  ];
  return (
    <div>
      <Header />
      <Card className="my-3">
        <Card.Header>
          <Row>
            <Col>
              <Image src={logo} width={100} />
            </Col>
            <Col className="text-end">
              <h2>Invoice</h2>
              <h5>KEC</h5>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="my-2">
            <Col>
              <p>invoice to</p>
              <h5>Customer Name</h5>
              <h6>City</h6>
            </Col>
            <Col className="text-end">
              <p>Invoice No: 123</p>
              <p>Invoice Date: 2023-13-06</p>
              <p>payment Due: 2023-13-06</p>
              <p>Amount Due : 200</p>
            </Col>
          </Row>
          <Row>
            <Table>
              <thead>
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
                <tr>
                  <td className="align-middle">Mp3bt None</td>
                  <td className="align-middle text-center col-sm-2">
                    23
                  </td>
                  <td className="align-middle text-center col-sm-2">
                    1
                  </td>
                  <td className="align-middle text-center">0 %</td>
                  <td className="align-middle text-center">23 RS</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="my-2">
            <Col>
              <p>Note :</p>
              <p>Term :</p>
            </Col>
            <Col className="text-end">
              <p>Subtotal: 123</p>
              <p>Discount: 12</p>
              <p>total: 456</p>
              <p>Amount Due : 200</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default billInvoice;
