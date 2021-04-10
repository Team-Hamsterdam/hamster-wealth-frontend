import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import LoggedOutNavbar from "./LoggedOutNavbar";
import styled from "styled-components";
import {
  GithubLoginButton,
  GoogleLoginButton,
  DiscordLoginButton,
} from "react-social-login-buttons";
import { api } from "../utils/API";

const StyledContainer = styled(Container)`
  background-color: #1f2937;
`;

const LoginContainer = styled.div`
  background-color: #323b48;
  padding: 50px;
`;

const Login = () => {
  return (
    <>
      <LoggedOutNavbar />
      <StyledContainer md={12} className="d-flex justify-content-center" fluid>
        <Row md={12}>
          <Col md={12}>
            <h4 className="display-4 white mb-4">Log In</h4>
            <LoginContainer className="rounded">
              <a href={`${api}/login`}>
                <GoogleLoginButton />
              </a>
              <a href={`${api}/githublogin`}>
                <GithubLoginButton />
              </a>
              <a href={`${api}/discordlogin`}>
                <DiscordLoginButton />
              </a>
            </LoginContainer>
          </Col>
        </Row>
      </StyledContainer>
    </>
  );
};

export default Login;
