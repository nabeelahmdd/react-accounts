import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [eye, setEye] = useState(true);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
    setEye(!eye);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const dataForm = {};
    dataForm.first_name = firstName;
    dataForm.last_name = lastName;
    dataForm.email = email;
    dataForm.phone_number = phoneNumber;
    dataForm.password = password;
    console.log(dataForm);
  };
  return (
    <Container className="mt-5">
      <Form onSubmit={submitHandler}>
        <Row>
          <Col className="col-md-3 offset-md-3">
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-3">
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="col-md-3 offset-md-3">
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
          </Col>
          <Col className="col-md-3">
            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required={true}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 offset-md-3">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required={true}
              />
              <i
                onClick={togglePassword}
                className={`toggle-password fa ${
                  eye ? "fa-eye-slash" : "fa-eye"
                } password-view`}
              ></i>
            </Form.Group>
            <PasswordStrengthBar password={password} />
            <div className="d-grid gap-2">
              <Button variant="dark" type="submit">
                Register
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Register;
