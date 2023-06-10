import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo, loading } = userLogin;

  const [email, setEmail] = useState("");
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
    dataForm.email = email;
    dataForm.password = password;
    dispatch(login(dataForm));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);
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

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                variant="dark"
                size="lg"
                type="submit"
                disabled={loading ? true : false}
              >
                {loading ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
