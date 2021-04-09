import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import LoggedInNavbar from "./LoggedInNavbar";
import TradingViewWidget, { IntervalTypes } from "react-tradingview-widget";
import styled from "styled-components";

const PortfolioContainer = styled(Container)`
  background-color: #f0f0f0;
  padding-bottom: 50px;
`;
const ChartCol = styled(Col)`
  height: 500px;
`;

const PortfoliosRow = styled(Row)`
  background-color: #e8e8e8;
`;

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [cash, setCash] = useState(0);
  const [netPortfolio, setNetPortfolio] = useState(0);
  const [todaysChange, setTodaysChange] = useState(0);
  const [chartTicker, setChartTicker] = useState("");

  useEffect(() => {
    setPortfolios([
      {
        portfolio_id: 1,
        title: "Portfolio 1",
        cash: 9999999999.33131,
      },
      {
        portfolio_id: 2,
        title: "Portfolio 2",
        cash: 9999999999.33131,
      },
      {
        portfolio_id: 3,
        title: "Portfolio 3",
        cash: 9999999999.33131,
      },
      {
        portfolio_id: 4,
        title: "Portfolio 4",
        cash: 9999999999.33131,
      },
      {
        portfolio_id: 5,
        title: "Portfolio 5",
        cash: 9999999999.33131,
      },
    ]);

    setHoldings([
      {
        stock_id: "2000",
        ticker: "ASX:BPH",
        company: "BPH Energy Ltd.",
        live_price: 200.2,
        change: "0.002 (7.69%)",
        profit_loss: "6,400.00 (133.33%)",
        units: 4200,
        avg_price: 0.15,
        value: 0.08,
        weight: 10,
      },
      {
        stock_id: "2000",
        ticker: "ASX:Z1P",
        company: "Z1P Co.",
        live_price: 200.2,
        change: "0.002 (7.69%)",
        profit_loss: "6,400.00 (133.33%)",
        units: 4200,
        avg_price: 0.15,
        value: 0.08,
        weight: 10,
      },
      {
        stock_id: "2000",
        ticker: "ASX:BPH",
        company: "BPH Energy Ltd.",
        live_price: 200.2,
        change: "0.002 (7.69%)",
        profit_loss: "6,400.00 (133.33%)",
        units: 4200,
        avg_price: 0.15,
        value: 0.08,
        weight: 10,
      },
      {
        stock_id: "2000",
        ticker: "ASX:BPH",
        company: "BPH Energy Ltd.",
        live_price: 200.2,
        change: "0.002 (7.69%)",
        profit_loss: "6,400.00 (133.33%)",
        units: 4200,
        avg_price: 0.15,
        value: 0.08,
        weight: 10,
      },
    ]);

    setCash(4356214321);

    setNetPortfolio(94929494);
  }, []);
  return (
    <>
      <LoggedInNavbar />
      <PortfolioContainer>
        <Row>
          <Col className="px-4">
            <PortfoliosRow
              className="justify-content-start align-items-center my-3 rounded"
              md={12}
            >
              {portfolios.map((portfolio, key) => (
                <Button key={key} className="mx-2">
                  {portfolio.title}
                </Button>
              ))}
            </PortfoliosRow>
            <PortfoliosRow className="rounded align-items-center my-3 py-2" md={12}>
              <Col md={9}>
                <h4 className="py-0 my-0">Balance: ${cash}</h4>
              </Col>
              <Col className="d-flex px-0 justify-content-end" md={3}>
                <Button className="mx-2">Add Cash</Button>
                <Button className="mx-2">Add Stock</Button>
              </Col>
            </PortfoliosRow>
            <PortfoliosRow className="align-items-center my-3 py-2 rounded" md={12}>
              <Col md={12}>
                <h4 className="py-0 my-0">
                  Net Portfolio: ${netPortfolio} | Today's Change: $999999999 (%99999)
                </h4>
              </Col>
            </PortfoliosRow>
            <PortfoliosRow className="align-items-center my-3 p-2 rounded" md={12}>
              <ChartCol md={12}>
                <TradingViewWidget symbol={`${chartTicker}`} interval={IntervalTypes.D} autosize />
              </ChartCol>
            </PortfoliosRow>
            <PortfoliosRow className="align-items-center my-3 py-2 rounded" md={12}>
              <Col md={12} className="table-col px-2">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Ticker</th>
                      <th>Company</th>
                      <th>Change</th>
                      <th>Profit/Loss</th>
                      <th>Units</th>
                      <th>Average Purchase Price</th>
                      <th>Market Value</th>
                      <th>Weight</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((stock, key) => (
                      <tr
                        onClick={() => {
                          setChartTicker(stock.ticker);
                        }}
                        key={key}
                      >
                        <td>{key + 1}</td>
                        <td>{stock.ticker}</td>
                        <td>{stock.company}</td>
                        <td>${stock.live_price}</td>
                        <td>{stock.change}</td>
                        <td>{stock.units}</td>
                        <td>${stock.avg_price}</td>
                        <td>${stock.value}</td>
                        <td>{stock.weight}%</td>
                        <td>
                          <Row md={12} className="align-items-center justify-content-center">
                            <Button className="mx-1">Sell</Button>
                            <Button className="mx-1">Remove</Button>
                          </Row>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </PortfoliosRow>
          </Col>
        </Row>
      </PortfolioContainer>
    </>
  );
};

export default Portfolios;
