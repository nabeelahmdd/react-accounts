import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function PasswordReset() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/custom/accounts/password_reset/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(
            "Success! Please check your registered email for further instructions."
          );
          navigate("/");
        }
        setLoading(false);
        return response.json();
      })
      .then((json) => {
        toast.success(json.email);
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
              <Button
                variant="dark"
                size="lg"
                type="submit"
                disabled={loading ? true : false}
              >
                {loading ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  "Password Reset"
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PasswordReset;
