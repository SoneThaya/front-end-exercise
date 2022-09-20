import React, { useState } from "react";
import Message from "../components/Message";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { postFormData, SetOccupationAndStates } from "../utils/helperFunctions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const { occupations, states, error } = SetOccupationAndStates();

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      const postData = async () => {
        let result = await postFormData(
          name,
          email,
          password,
          occupation,
          state
        );
        if (result.status === 200) {
          setSuccess(true);
        } else {
          setRegisterError(true);
        }
      };
      postData();
    }
  };

  return (
    <Container className="form-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Register</h1>
          {success && (
            <Message variant="success">Registration successful!!!</Message>
          )}
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {registerError && (
            <Message variant="danger">Something went wrong!!!</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                autoComplete="on"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                autoComplete="on"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="occupation" className="mb-3">
              <Form.Label>Select Occupation</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setOccupation(e.target.value)}
                required
              >
                <option value="">Select occupation</option>
                {occupations.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="state" className="mb-3">
              <Form.Label>Select State</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">Select state</option>
                {states.map((item, index) => (
                  <option
                    value={`${item.name}, ${item.abbreviation}`}
                    key={index}
                  >
                    {item.name}, {item.abbreviation}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
