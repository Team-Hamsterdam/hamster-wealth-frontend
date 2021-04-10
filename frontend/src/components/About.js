import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import LoggedInNavbar from "./LoggedInNavbar";

const AboutContainer = styled(Container)`
  background-color: #2c3542;
  padding-bottom: 50px;
`;

const PortfoliosRow = styled(Row)`
  background-color: #262f3d;
`;

const About = () => {
  return (
    <>
      <LoggedInNavbar />
      <AboutContainer>
        <Row>
          <Col className="px-4">
            <PortfoliosRow className="rounded align-items-center mb-0  mt-3 py-2 px-2" md={12}>
              <h2 className="my-0">About</h2>
            </PortfoliosRow>
            <PortfoliosRow className="rounded align-items-center mb-0  mt-3 py-2 px-2" md={12}>
              <p className="my-0">
                This project was created by Team Hamsterdam for the Chronicle Hackathon 2021 hosted
                by the Google Developers Student Club @ University of Melbourne
              </p>
            </PortfoliosRow>
            <PortfoliosRow className="rounded align-items-center mb-0  mt-3 py-2 px-2" md={12}>
              <a href="https://github.com/Team-Hamsterdam">https://github.com/Team-Hamsterdam</a>
            </PortfoliosRow>
            <PortfoliosRow className="rounded align-items-center mb-0  mt-3 py-2 px-2" md={12}>
              <a href="https://github.com/Team-Hamsterdam/chronicle-frontend">
                Frontend Github Repository
              </a>
            </PortfoliosRow>
            <PortfoliosRow className="rounded align-items-center mb-0  mt-3 py-2 px-2" md={12}>
              <a href="https://github.com/Team-Hamsterdam/chronicle-backend">
                Backend Github Repository
              </a>
            </PortfoliosRow>
          </Col>
        </Row>
      </AboutContainer>
    </>
  );
};

export default About;
