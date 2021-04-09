import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";

const DarkNavbar = styled(Navbar)`
  background-color: #1f2937;
`;

const GreenSpan = styled.span`
  color: #28cd83;
`;

const LoggedOutNavbar = () => {
  return (
    <DarkNavbar expand="lg">
      <Navbar.Brand href="/">
        <span className="white">Hamster </span>
        <GreenSpan>Wealth</GreenSpan>
      </Navbar.Brand>
    </DarkNavbar>
  );
};

export default LoggedOutNavbar;
