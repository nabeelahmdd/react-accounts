import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
function Login() {
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
    console.log(dataForm, "dataForm");
  };
  return (
    <Container fluid>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                required
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                name="password"
                required
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                onClick={togglePassword}
                className={`toggle-password fa ${
                  eye ? "fa-eye-slash" : "fa-eye"
                } password-view`}
              ></i>
            </div>
            <PasswordStrengthBar password={password} />
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label">Remember me</label>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-lg btn-secondary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
