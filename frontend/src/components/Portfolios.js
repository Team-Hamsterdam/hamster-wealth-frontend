import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import LoggedInNavbar from "./LoggedInNavbar";
import TradingViewWidget, { IntervalTypes, Themes } from "react-tradingview-widget";
import styled from "styled-components";
import CashModal from "./CashModal";
import StockModal from "./StockModal";
import API from "../utils/API";
import { useHistory } from "react-router-dom";

const PortfolioContainer = styled(Container)`
  background-color: #2c3542;
  padding-bottom: 50px;
`;
const ChartCol = styled(Col)`
  height: 500px;
`;

const PortfoliosRow = styled(Row)`
  background-color: #262f3d;
`;

const Portfolios = () => {
  const max_portfolios = 9;
  const [portfolios, setPortfolios] = useState([]);
  const [currPortfolioId, setCurrPortfolioId] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [cash, setCash] = useState(0);
  const [netPortfolio, setNetPortfolio] = useState(0);
  const [todaysChange, setTodaysChange] = useState(0);
  const [chartTicker, setChartTicker] = useState("");
  const [showAddCash, setShowAddCash] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);

  const history = useHistory();

  const handleCloseCash = () => setShowAddCash(false);
  const handleShowCash = () => setShowAddCash(true);
  const handleCloseStock = () => setShowAddStock(false);
  const handleShowStock = () => setShowAddStock(true);

  const handleAddPortfolio = async () => {
    try {
      const api = new API();
      const token = localStorage.getItem("token");
      const res = await fetch(`${api.url}/portfolios/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = res.json();
      if (res.ok) {
        setPortfolios([
          ...portfolios,
          {
            portfolio_id: data.portfolio_id,
            title: `Portfolio ${portfolios.length + 1}`,
            cash: 0,
          },
        ]);
      } else {
        console.warn(data.message);
      }
    } catch (e) {
      console.warn(e);
      console.warn("Could not add portfolio");
      // history.push("/");
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const api = new API();
        const res = await fetch(`${api.url}/gettoken`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.json();
        if (res.ok) {
          localStorage.setItem("token", data);
          console.log("token is", data);
        } else {
          console.warn(data.message);
          // history.push("/");
        }
      } catch (e) {
        console.warn(e);
        console.warn("Could not get token");
        // history.push("/");
      }
    };

    const loadPortfolios = async () => {
      try {
        const api = new API();
        const token = localStorage.getItem("token");
        const res = await fetch(`${api.url}/portfolios/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          Authorization: `${token}`,
        });
        const data = await res.json();

        if (res.ok) {
          setPortfolios([...data]);
        } else {
          console.warn(data.message);
        }
      } catch (e) {
        console.warn(e);
        console.warn("Could not get portfolios");
      }
    };

    getToken();
    loadPortfolios();

    setPortfolios([
      {
        portfolio_id: 1,
        title: "Portfolio 1",
      },
      {
        portfolio_id: 2,
        title: "Portfolio 2",
      },
      {
        portfolio_id: 3,
        title: "Portfolio 3",
      },
      {
        portfolio_id: 4,
        title: "Portfolio 4",
      },
      {
        portfolio_id: 5,
        title: "Portfolio 5",
      },
    ]);

    setHoldings([
      {
        stock_id: "2000",
        ticker: "ASX:BPH",
        company: "BPH Energy Ltd.",
        live_price: 200.2,
        change: "0.002 (7.69%)",
        change_value: 600.4,
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
        change_value: 600.4,
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
        change_value: 600.4,
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
        change_value: 600.4,
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

  const handleChangePortfolio = (portfolioId) => {
    setCurrPortfolioId(portfolioId);
  };

  useEffect(() => {
    const loadHoldings = async () => {
      const token = localStorage.getItem("token");
      const api = new API();
      const query = { portfolio_id: currPortfolioId };
      try {
        const res = await fetch(`${api.url}/portfolio/holdings/?` + new URLSearchParams(query), {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setHoldings([...data]);
        } else {
          console.warn(data.message);
        }
      } catch (e) {
        console.warn(e);
        console.warn("Could not get portfolios");
      }
    };

    const loadBalance = async () => {
      const token = localStorage.getItem("token");
      const api = new API();
      const query = { portfolio_id: currPortfolioId };
      try {
        const res = await fetch(`${api.url}/portfolio/getbalance/?` + new URLSearchParams(query), {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setCash(data.balance);
        } else {
          console.warn(data.message);
        }
      } catch (e) {
        console.warn(e);
        console.warn("Could not get balance for portfolio");
      }
    };

    const loadNetPortfolio = () => {
      const sum = holdings.reduce(function (a, b) {
        return a + b.value;
      }, 0);
      setNetPortfolio(sum);
    };

    const loadTodaysChange = () => {
      const changeValue = holdings.reduce(function (a, b) {
        return a + b.change_value;
      }, 0);

      const changePercent = holdings.reduce(function (a, b) {
        return a + b.change;
      }, 0);

      const avgChangePercent =
        holdings.length !== 0 ? (changePercent / holdings.length).toFixed(2) : 0;
      setTodaysChange(`$${changeValue} (${avgChangePercent}%)`);
    };

    loadHoldings();
    loadBalance();
    loadNetPortfolio();
    loadTodaysChange();
  }, [currPortfolioId]);

  const handleDeletePortfolio = async () => {
    const token = localStorage.getItem("token");
    const api = new API();
    const query = { portfolio_id: currPortfolioId };
    try {
      const res = await fetch(
        `${api.url}/portfolios/removeportfolio/?` + new URLSearchParams(query),
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        const index = portfolios.map((e) => e.portfolio_id).indexOf(currPortfolioId);
        const newPortfoliosList = portfolios;
        newPortfoliosList.splice(index, 1);
        setPortfolios(newPortfoliosList);
      } else {
        console.warn(data.message);
      }
    } catch (e) {
      console.warn(e);
      console.warn("Could not get portfolios");
    }
  };
  return (
    <>
      <LoggedInNavbar />
      <CashModal
        show={showAddCash}
        handleClose={handleCloseCash}
        portfolioId={currPortfolioId}
        setCash={setCash}
        cash={cash}
      />
      <StockModal
        show={showAddStock}
        handleClose={handleCloseStock}
        portfolioId={currPortfolioId}
        setHoldings={setHoldings}
        holdings={holdings}
      />
      <PortfolioContainer>
        <Row>
          <Col className="px-4">
            <PortfoliosRow
              className={
                portfolios.length !== max_portfolios
                  ? "justify-content-start align-items-center my-3 py-2 rounded"
                  : "justify-content-between align-items-center my-3 py-2 rounded"
              }
              md={12}
            >
              {portfolios.map((portfolio, key) => (
                <Button
                  key={key}
                  className="mx-2"
                  onClick={() => handleChangePortfolio(portfolio.portfolio_id)}
                >
                  {portfolio.title}
                </Button>
              ))}

              {portfolios.length < max_portfolios ? (
                <Button
                  onClick={() => {
                    handleAddPortfolio();
                  }}
                  className="rounded-circle mx-2"
                >
                  +
                </Button>
              ) : (
                ""
              )}
            </PortfoliosRow>
            <PortfoliosRow className="rounded align-items-center my-3 py-2" md={12}>
              <Col md={9}>
                <h4 className="py-0 my-0">Balance: ${cash}</h4>
              </Col>
              <Col className="d-flex px-0 justify-content-end" md={3}>
                <Button
                  className="mx-2"
                  onClick={() => {
                    handleShowCash();
                  }}
                >
                  Add Cash
                </Button>
                <Button
                  className="mx-2"
                  onClick={() => {
                    handleShowStock();
                  }}
                >
                  Buy Stock
                </Button>
              </Col>
            </PortfoliosRow>
            <PortfoliosRow className="align-items-center my-3 py-2 rounded" md={12}>
              <Col md={6} className="d-flex justify-content-start">
                <h4 className="py-0 my-0">Net Portfolio: ${netPortfolio}</h4>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <h4 className="py-0 my-0">Today's Change: {todaysChange}</h4>
              </Col>
            </PortfoliosRow>
            <PortfoliosRow
              className={
                chartTicker.length !== 0 ? "align-items-center my-3 p-2 rounded" : "d-none"
              }
              md={12}
            >
              <ChartCol md={12}>
                <TradingViewWidget
                  theme={Themes.DARK}
                  symbol={`${chartTicker}`}
                  interval={IntervalTypes.D}
                  autosize
                />
              </ChartCol>
            </PortfoliosRow>
            {holdings.length !== 0 ? (
              <>
                <PortfoliosRow
                  className={
                    chartTicker.length === 0 ? "align-items-center my-3 p-2 rounded" : "d-none"
                  }
                  md={12}
                >
                  <div>Click on a ticker or company to show its chart</div>
                </PortfoliosRow>
                <PortfoliosRow className="align-items-center my-3 py-2 rounded" md={12}>
                  <Col md={12} className="table-col px-2">
                    <Table style={{ backgroundColor: "#293240" }} striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Ticker</th>
                          <th>Company</th>
                          <th>Units</th>
                          <th>Purchase Price</th>
                          <th>Last Price</th>
                          <th>Market Value</th>
                          <th>Profit/Loss</th>
                          <th>Change</th>
                          <th>Change Value</th>
                          <th>Weight</th>
                          <th>Settings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdings.map((stock, key) => (
                          <tr key={key}>
                            <td
                              className="stock-clickable"
                              onClick={() => {
                                setChartTicker(stock.ticker);
                              }}
                            >
                              {key + 1}
                            </td>
                            <td
                              className="stock-clickable"
                              onClick={() => {
                                setChartTicker(stock.ticker);
                              }}
                            >
                              {stock.ticker}
                            </td>
                            <td
                              className="stock-clickable"
                              onClick={() => {
                                setChartTicker(stock.ticker);
                              }}
                            >
                              {stock.company}
                            </td>
                            <td>{stock.units}</td>
                            <td>${stock.avg_price}</td>
                            <td>${stock.live_price}</td>
                            <td>${stock.value}</td>
                            <td>${stock.profit_loss}</td>
                            <td>${stock.change}</td>
                            <td>${stock.change_value}</td>
                            <td>{stock.weight}%</td>
                            <td>
                              <Row md={12} className="align-items-center justify-content-center">
                                <Button className="mx-2 mb-1 w-100">Sell</Button>
                                <Button className="mx-2 mt-1 w-100">Remove</Button>
                              </Row>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </PortfoliosRow>{" "}
              </>
            ) : (
              <PortfoliosRow
                className="justify-content-center align-items-center my-3 p-2 rounded"
                md={12}
              >
                <div>Get started by buying your first stock!</div>
              </PortfoliosRow>
            )}

            <PortfoliosRow
              className="justify-content-start align-items-center my-3 p-2 rounded"
              md={12}
            >
              <Button variant="danger" className="w-100" onClick={() => handleDeletePortfolio()}>
                Delete Portfolio
              </Button>
            </PortfoliosRow>
          </Col>
        </Row>
      </PortfolioContainer>
    </>
  );
};

export default Portfolios;
