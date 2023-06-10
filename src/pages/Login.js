import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";

function Login() {
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
      console.log(userInfo, "userInfo");
    } else if (error) {
      console.log(error, "error");
    }
  }, [userInfo, error]);
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
              <button
                type="submit"
                className="btn btn-lg btn-secondary"
                disabled={loading ? true : false}
              >
                {loading ? (
                  <Spinner animation="grow" variant="dark" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
