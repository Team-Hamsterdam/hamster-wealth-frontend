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

  useEffect(() => {
    console.log(window.location.href);
  }, []);
  return (
    <DarkNavbar expand="lg">
      <Navbar.Brand href="/portfolios">
        <span className="white">Hamster </span>
        <GreenSpan>Wealth</GreenSpan>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" defaultActiveKey="/portfolios">
          <Nav.Link as={NavLink} to="/portfolios">
            <span className="white">Portfolios</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/leaderboard">
            <span className="white">Leaderboard</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/">
            <span className="white">Sign Out</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </DarkNavbar>
  );
};

export default LoggedOutNavbar;
