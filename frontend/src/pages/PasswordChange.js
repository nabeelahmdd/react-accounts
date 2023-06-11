import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { PASSWORD_CHANGE_RESET } from "../redux/constants/userConstants";

function PasswordChange() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPasswordCHange = useSelector((state) => state.userPasswordCHange);
  const { passwordChnage, loading } = userPasswordCHange;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [eyeOld, setOldEye] = useState(true);
  const [eyeNew, setEyeNew] = useState(true);

  const toggleOldPassword = () => {
    setOldPasswordVisible(!oldPasswordVisible);
    setOldEye(!eyeOld);
  };

  const toggleNewPassword = () => {
    setNewPasswordVisible(!newPasswordVisible);
    setEyeNew(!eyeNew);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const dataForm = {};
    dataForm.old_password = oldPassword;
    dataForm.new_password = newPassword;
    dispatch(changePasswordAction(dataForm));
  };

  useEffect(() => {
    if (passwordChnage) {
      dispatch({ type: PASSWORD_CHANGE_RESET });
      navigate("/");
    }
  }, [passwordChnage, dispatch, navigate]);
  return (
    <Container className="mt-5">
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Group className="mb-3" controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type={oldPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                required={true}
              />
              <i
                onClick={toggleOldPassword}
                className={`toggle-password fa ${
                  eyeOld ? "fa-eye-slash" : "fa-eye"
                } password-view`}
              ></i>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type={newPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required={true}
              />
              <i
                onClick={toggleNewPassword}
                className={`toggle-password fa ${
                  eyeNew ? "fa-eye-slash" : "fa-eye"
                } password-view`}
              ></i>
            </Form.Group>
            <PasswordStrengthBar password={newPassword} />

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
                  "Change Password"
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PasswordChange;
