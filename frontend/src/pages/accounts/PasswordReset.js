import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function PasswordReset() {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const dataForm = {};
    dataForm.email = email;
    console.log(dataForm);
  };
  return (
    <Container className="mt-5">
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="dark" size="lg" type="submit">
                Password Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PasswordReset;
