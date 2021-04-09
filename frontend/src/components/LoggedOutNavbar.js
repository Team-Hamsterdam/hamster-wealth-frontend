import React, { useEffect } from "react";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const LoggedOutNavbar = () => {
  const DarkNavbar = styled(Navbar)`
    background-color: #1f2937;
  `;

  const GreenSpan = styled.span`
    color: #28cd83;
  `;

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
