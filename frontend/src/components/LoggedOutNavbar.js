import React from "react";
import { Image, Navbar, NavLink } from "react-bootstrap";
import styled from "styled-components";
import logo from "../images/logo.png";

const DarkNavbar = styled(Navbar)`
  background-color: #1f2937;
`;

const GreenSpan = styled.span`
  color: #28cd83;
`;

const LoggedOutNavbar = () => {
  return (
    <DarkNavbar expand="lg">
      <Navbar.Brand as={NavLink} className="d-flex align-items-center" to="/portfolios">
        <Image
          style={{
            width: 60,
            height: 70,
          }}
          src={logo}
          className="d-inline-block align-top"
        />
        <span>Hamster </span>
        <GreenSpan>Wealth</GreenSpan>
      </Navbar.Brand>
    </DarkNavbar>
  );
};

export default LoggedOutNavbar;
