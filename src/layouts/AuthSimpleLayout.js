// File Description: Layout component for a simple authentication page with a logo and card-based content.

import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Logo from "components/common/Logo"; // Assuming the Logo component is used to display a logo
import Section from "components/common/Section"; // Assuming Section is a custom component for layout styling

// Component for a simple authentication layout
const AuthSimpleLayout = () => (
  <Section className="py-0">
    {/* Centered layout for authentication */}
    <Row className="flex-center min-vh-100 py-6">
      <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
        {/* Displaying the logo */}
        <Logo width={300} />

        {/* Card container for authentication content */}
        <Card>
          <Card.Body className="p-4 p-sm-5">
            {/* Render child routes/components */}
            <Outlet />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Section>
);

export default AuthSimpleLayout;
