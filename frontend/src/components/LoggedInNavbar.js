import React, { useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DarkNavbar = styled(Navbar)`
  background-color: #1f2937;
  color: white;
`;

const GreenSpan = styled.span`
  color: #28cd83;
`;

const LoggedOutNavbar = () => {
  useEffect(() => {
    console.log(window.location.href);
  }, []);
  return (
    <DarkNavbar expand="lg">
      <Navbar.Brand href="/portfolios">
        <span>Hamster </span>
        <GreenSpan>Wealth</GreenSpan>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav variant="pills" className="ml-auto" defaultActiveKey="/portfolios">
          <Nav.Link as={NavLink} to="/portfolios">
            <span>Portfolios</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/leaderboard">
            <span>Leaderboard</span>
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            exact
            to="/"
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            <span>Sign Out</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </DarkNavbar>
  );
};

export default LoggedOutNavbar;
