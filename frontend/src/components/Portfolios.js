import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import LoggedInNavbar from "./LoggedInNavbar";
import TradingViewWidget, { IntervalTypes, Themes } from "react-tradingview-widget";
import styled from "styled-components";
import CashModal from "./CashModal";
import StockModal from "./StockModal";
import SellStockModal from "./SellStockModal";
import { api } from "../utils/API";

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
  // const max_portfolios = 9;
  // const [portfolios, setPortfolios] = useState([]);
  const [currPortfolioId, setCurrPortfolioId] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [cash, setCash] = useState(0);
  const [netPortfolio, setNetPortfolio] = useState(0);
  const [todaysChange, setTodaysChange] = useState(0);
  const [chartTicker, setChartTicker] = useState("");
  const [stockToSell, setStockToSell] = useState();
  const [showAddCash, setShowAddCash] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [showSellStock, setShowSellStock] = useState(false);

  const handleCloseCash = () => setShowAddCash(false);
  const handleShowCash = () => setShowAddCash(true);
  const handleCloseStock = () => setShowAddStock(false);
  const handleShowStock = () => setShowAddStock(true);
  const handleCloseSellStock = () => setShowSellStock(false);
  const handleShowSellStock = () => setShowSellStock(true);

  // const handleAddPortfolio = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch(`${api}/portfolios/create`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `${token}`,
  //       },
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       setPortfolios([
  //         ...portfolios,
  //         {
  //           portfolio_id: data.portfolio_id,
  //           title: `Virtual Portfolio`,
  //           cash: 0,
  //         },
  //       ]);
  //     } else {
  //       console.warn(data.message);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //     console.warn("Could not add portfolio");
  //     // history.push("/");
  //   }
  // };
  // const handleChangePortfolio = (portfolioId) => {
  //   setCurrPortfolioId(portfolioId);
  // };

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${api}/portfolios/list`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          if (data) {
            setCurrPortfolioId(data.portfolio_list[0].portfolio_id);
          }
        } else {
          console.warn(data.message);
        }
      } catch (e) {
        console.warn(e);
        console.warn("Could not get portfolios");
      }
    };
    loadPortfolios();
  }, []);

  useEffect(() => {
    const loadHoldings = async () => {
      const token = localStorage.getItem("token");

      const query = { portfolio_id: currPortfolioId };
      try {
        const res = await fetch(`${api}/portfolio/holdings?` + new URLSearchParams(query), {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setHoldings([...data.holdings]);
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

      const query = { portfolio_id: currPortfolioId };
      try {
        const res = await fetch(`${api}/portfolio/getbalance?` + new URLSearchParams(query), {
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
        return a + parseFloat(b.value.substring(1));
      }, 0);
      setNetPortfolio(sum);
    };

    const loadTodaysChange = () => {
      const changeValue = holdings.reduce(function (a, b) {
        if (b.change_value.startsWith("-")) {
          return a - parseFloat(b.change_value.substring(2));
        } else {
          return a + parseFloat(b.change_value.substring(1));
        }
      }, 0);
      setTodaysChange(`$${changeValue}`);
    };

    loadHoldings();
    loadBalance();
    loadNetPortfolio();
    loadTodaysChange();
  }, [currPortfolioId, holdings]);

  // const handleDeletePortfolio = async () => {
  //   const token = localStorage.getItem("token");
  //   const query = { portfolio_id: currPortfolioId };

  //   try {
  //     const res = await fetch(`${api}/portfolios/removeportfolio?` + new URLSearchParams(query), {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `${token}`,
  //       },
  //     });
  //     const data = await res.json();

  //     if (res.ok) {
  //       const index = portfolios.map((e) => e.portfolio_id).indexOf(currPortfolioId);
  //       const newPortfoliosList = portfolios;
  //       newPortfoliosList.splice(index, 1);
  //       setPortfolios([...newPortfoliosList]);

  //       setCurrPortfolioId(newPortfoliosList[0].portfolio_id);
  //     } else {
  //       console.warn(data.message);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //     console.warn("Could not get portfolios");
  //   }
  // };

  const handleSetChartTicker = (ticker) => {
    if (ticker.endsWith(".AX")) {
      const newTicker = ticker.slice(0, -3);
      setChartTicker(`ASX:${newTicker}`);
    } else {
      setChartTicker(ticker);
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
      <SellStockModal
        show={showSellStock}
        handleClose={handleCloseSellStock}
        portfolioId={currPortfolioId}
        setHoldings={setHoldings}
        holdings={holdings}
        cash={cash}
        setCash={setCash}
        stock={stockToSell}
      />
      <PortfolioContainer>
        <Row>
          <Col className="px-4">
            {/* <PortfoliosRow
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
            </PortfoliosRow> */}
            <PortfoliosRow className="rounded align-items-center my-3 py-2" md={12}>
              <Col md={9}>
                <h4 className="py-0 my-0">
                  Balance: <span className={cash < 0 ? "red" : "green"}>${cash}</span>
                </h4>
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
                <h4 className="py-0 my-0">
                  Net Portfolio:{" "}
                  <span className={netPortfolio < 0 ? "red" : "green"}>
                    ${parseFloat(netPortfolio).toFixed(2)}
                  </span>
                </h4>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <h4 className="py-0 my-0">
                  Today's Change:{" "}
                  <span
                    className={
                      holdings.reduce(function (a, b) {
                        if (b.change_value.startsWith("-")) {
                          return a - parseFloat(b.change_value.substring(2));
                        } else {
                          return a + parseFloat(b.change_value.substring(1));
                        }
                      }, 0) < 0
                        ? "red"
                        : "green"
                    }
                  >
                    {todaysChange && todaysChange.substring(1).startsWith("-")
                      ? `-$${todaysChange && todaysChange.substring(2)}`
                      : `$${todaysChange && todaysChange.substring(1)}`}
                  </span>
                </h4>
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
                    <Table style={{ backgroundColor: "#293240" }} striped hover>
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
                                handleSetChartTicker(stock.ticker);
                              }}
                            >
                              {key + 1}
                            </td>
                            <td
                              className="stock-clickable"
                              onClick={() => {
                                handleSetChartTicker(stock.ticker);
                              }}
                            >
                              {stock.ticker}
                            </td>
                            <td
                              className="stock-clickable"
                              onClick={() => {
                                handleSetChartTicker(stock.ticker);
                              }}
                            >
                              {stock.company}
                            </td>
                            <td>{stock.units}</td>
                            <td>{stock.avg_price}</td>
                            <td>{stock.live_price}</td>
                            <td>{stock.value}</td>
                            <td>{stock.profit_loss}</td>
                            <td>{stock.change}</td>
                            <td>{stock.change_value}</td>
                            <td>{stock.weight}%</td>
                            <td>
                              <Row md={12} className="align-items-center justify-content-center">
                                <Button
                                  onClick={() => {
                                    setStockToSell(stock);
                                    handleShowSellStock();
                                  }}
                                  className="mx-2 my-0 w-100"
                                >
                                  Sell
                                </Button>
                                {/* <Button className="mx-2 mt-1 w-100">Remove</Button> */}
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

            {/* <PortfoliosRow
              className="justify-content-start align-items-center my-3 p-2 rounded"
              md={12}
            >
              <Button
                variant="danger"
                className={portfolios.length <= 1 ? "d-none" : "w-100"}
                onClick={() => handleDeletePortfolio()}
              >
                Delete Portfolio
              </Button>
            </PortfoliosRow> */}
          </Col>
        </Row>
      </PortfolioContainer>
    </>
  );
};

export default Portfolios;
