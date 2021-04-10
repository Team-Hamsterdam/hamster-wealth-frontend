import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import LoggedOutNavbar from "./LoggedOutNavbar";
import styled from "styled-components";
import { api } from "../utils/API";
import { useHistory } from "react-router-dom";

const StyledContainer = styled(Container)`
  background-color: #1f2937;
`;

const LoginContainer = styled.div`
  background-color: #323b48;
  padding: 50px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    if (!username) {
      setShowAlert(true);
      setAlertType("danger");
      setAlertText("Username can't be empty");
      return;
    }
    if (!password) {
      setShowAlert(true);
      setAlertText("Password can't be empty");
      return;
    }

    const body = {
      username: username,
      password: password,
    };
    try {
      const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        history.push("/portfolios");
      } else {
        setShowAlert(true);
        setAlertText(`${data.message}`);
      }
    } catch (e) {
      console.warn(e);
      setShowAlert(true);
      setAlertText("Invalid Credentials. Please check your username/password and try again");
    }
  };
  return (
    <>
      <LoggedOutNavbar />
      <StyledContainer md={12} className="d-flex justify-content-center" fluid>
        <Row md={12}>
          <Col md={12}>
            <h4 className="display-4 white mb-4">Log In</h4>
            <LoginContainer className="rounded">
              <Form>
                <Alert
                  style={{ maxWidth: 240 }}
                  onClose={() => setShowAlert(false)}
                  dismissible
                  show={showAlert}
                  variant={alertType}
                >
                  {alertText}
                </Alert>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <span class="white">Username</span>
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    placeholder="Username"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                    <span class="white">Password</span>
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Row className="mx-0 d-flex justify-content-center align-items-center">
                  <Button
                    variant="primary w-100"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    Log In
                  </Button>
                </Row>
                <Row className="mx-0 d-flex justify-content-center align-items-center">
                  <p className="my-0 mt-4">Need an account?</p>
                </Row>
                <Row className="mx-0 mt-2 p-0 d-flex justify-content-center align-items-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      history.push("/register");
                    }}
                  >
                    Register
                  </Button>
                </Row>
              </Form>
            </LoginContainer>
          </Col>
        </Row>
      </StyledContainer>
    </>
  );
};

export default Login;
