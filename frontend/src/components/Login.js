import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import LoggedOutNavbar from "./LoggedOutNavbar";
import styled from "styled-components";
import {
  GithubLoginButton,
  GoogleLoginButton,
  DiscordLoginButton,
} from "react-social-login-buttons";

const Login = () => {
  const StyledContainer = styled(Container)`
    background-color: #e8e8e8;
    height: 90vh;
  `;

  const LoginContainer = styled.div`
    border: 1px solid black;
    background-color: white;
  `;
  return (
    <>
      <LoggedOutNavbar />
      <StyledContainer md={12} className="d-flex justify-content-center" fluid>
        <Row md={12}>
          <Col md={12}>
            <h4 className="display-4">Log In</h4>
            <LoginContainer className="rounded p-4 mb-4">
              <GoogleLoginButton />
              <GithubLoginButton />
              <DiscordLoginButton />
            </LoginContainer>
          </Col>
        </Row>
      </StyledContainer>
    </>
  );
};

export default Login;
