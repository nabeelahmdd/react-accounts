import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userActions";
import userImage from "../../assets/images/user.png";

function Profile() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("first_name", firstName);
    dataForm.append("last_name", lastName);
    dataForm.append("email", email);
    dataForm.append("phone_number", phoneNumber);
    dataForm.append("gender", gender);
    dataForm.append("image", image, image.name);
    dispatch(updateUserProfile(dataForm));
  };

  useEffect(() => {
    if (!user || !user.email) {
      dispatch(getUserDetails("profile"));
    } else {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPhoneNumber(user.phone_number);
      setGender(user.gender);
    }
  }, [dispatch, user]);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={12} className="text-center  mb-5">
          {user.image ? (
            <Image
              src={`${process.env.REACT_APP_API_ENDPOINT}${user.image}`}
              thumbnail
              style={{ width: "90px", height: "90px" }}
            />
          ) : (
            <Image src={userImage} thumbnail />
          )}
        </Col>
      </Row>
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
          <Col className="col-md-3 offset-md-3">
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select Gender</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="r">Rather not say</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="col-md-3">
            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>Profile Pic</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-6 offset-md-3">
            <div className="d-grid gap-2">
              <Button
                variant="dark"
                type="submit"
                disabled={loading ? true : false}
              >
                {loading ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Profile;
