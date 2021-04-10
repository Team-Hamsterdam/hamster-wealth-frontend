import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import LoggedInNavbar from "./LoggedInNavbar";
import { api } from "../utils/API";

const LeaderboardContainer = styled(Container)`
  background-color: #2c3542;
  padding-bottom: 50px;
`;

const PortfoliosRow = styled(Row)`
  background-color: #262f3d;
`;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const getLeaderboard = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await api.getAPIRequestToken("user/list", token);
        const data = await res.json();
        if (res.ok) {
          setLeaderboard(data.users);
        } else {
          console.warn(data.message);
        }
      } catch (e) {
        console.warn(e);
      }
    };

    getLeaderboard();
    setLeaderboard([
      {
        username: "Steven Stevenson",
        portfolio_name: "Meme Stocks",
        change_percent: 1000,
      },
      {
        username: "Michael Jackson",
        portfolio_name: "Growth Stocks",
        change_percent: 120,
      },
      {
        username: "Steven Stevenson",
        portfolio_name: "Meme Stocks",
        change_percent: 1000,
      },
      {
        username: "Steven Stevenson",
        portfolio_name: "Meme Stocks",
        change_percent: 1000,
      },
      {
        username: "Steven Stevenson",
        portfolio_name: "Meme Stocks",
        change_percent: 1000,
      },
      {
        username: "Steven Stevenson",
        portfolio_name: "Meme Stocks",
        change_percent: 1000,
      },
    ]);
  }, []);
  return (
    <>
      <LoggedInNavbar />
      <LeaderboardContainer>
        <Row>
          <Col className="px-4">
            <PortfoliosRow className="rounded align-items-center my-3 py-2 px-2" md={12}>
              <h2 className="my-0">Your Portfolios</h2>
            </PortfoliosRow>
            <PortfoliosRow className="rounded align-items-center mb-0  mt-3 py-2 px-2" md={12}>
              <h2 className="my-0">Leaderboard</h2>
            </PortfoliosRow>

            {leaderboard.map((user, key) => (
              <>
                <PortfoliosRow className="align-items-center py-2 px-2" md={12}>
                  <Col md={8} className="p-0 m-0">
                    <p className="my-2">
                      {key + 1}. <span className="green">{user.username}</span> |{" "}
                      {user.portfolio_name}
                    </p>
                  </Col>
                  <Col md={4} className="d-flex p-0 m-0 justify-content-end">
                    <p className={user.change_percent >= 0 ? "green" : "red"}>
                      {user.change_percent}%
                      <span className={user.change_percent >= 0 ? "green ml-1" : "d-none"}>▲</span>
                      <span className={user.change_percent < 0 ? "red ml-1" : "d-none"}>▼</span>
                    </p>
                  </Col>
                </PortfoliosRow>
              </>
            ))}
          </Col>
        </Row>
      </LeaderboardContainer>
    </>
  );
};

export default Leaderboard;
