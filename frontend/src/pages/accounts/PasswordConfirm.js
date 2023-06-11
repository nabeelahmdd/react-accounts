import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function PasswordConfirm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const token = window.location.search;
  const final = token.split("?token=");

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
    setEye(!eye);
  };

  const validatePassword = (event) => {
    const password = event.target.value;
    if (
      validator.isStrongPassword(password, {
        minLength: 9,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
    ) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { password: password, token: final[1] };
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/custom/accounts/password_reset/confirm/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Your password has been reset successfully! ");
          setLoading(false);
          navigate("/");
        }
        return response.json();
      })
      .then((json) => {
        toast.success(json.detail);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };
  return (
    <Container className="mt-5">
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
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
                onKeyUp={validatePassword}
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
              <Button
                variant="dark"
                size="lg"
                type="submit"
                disabled={loading || passwordError ? true : false}
              >
                {loading ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  "Password Confirm"
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PasswordConfirm;
