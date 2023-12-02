import React from "react";
import { Button, Card } from "react-bootstrap";

export default function header() {
  return (
    <Card className="d-flex flex-row justify-content-between p-3 align-items-center">
      <h4>Order#123</h4>
      <div>
        <Button>Download(.pdf)</Button>
        <Button className="mx-1">Print</Button>
        <Button>Copy Link</Button>
        <Button className="mx-1">Edit</Button>
        <Button>$ Payment Received</Button>
      </div>
    </Card>
  );
}
