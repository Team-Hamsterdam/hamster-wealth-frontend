import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { api } from "../utils/API";

const SellStockModal = ({
  show,
  handleClose,
  portfolioId,
  setHoldings,
  holdings,
  cash,
  setCash,
  stock,
}) => {
  const [sellPrice, setSellPrice] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleAddCash = async () => {
    const token = localStorage.getItem("token");

    if (!sellPrice || sellPrice <= 0 || isNaN(sellPrice) || isNaN(parseFloat(sellPrice))) {
      setAlertText(`Please specify a valid price to sell at`);
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    } else if (
      !sellQuantity ||
      parseFloat(sellQuantity) <= 0 ||
      isNaN(sellQuantity) ||
      isNaN(parseFloat(sellQuantity)) ||
      parseFloat(sellQuantity) !== parseInt(sellQuantity, 10) ||
      parseFloat(sellQuantity) > (stock ? stock.units : 99999999)
    ) {
      console.log(sellQuantity !== parseInt(sellQuantity, 10));
      console.log(typeof sellQuantity);
      console.log(stock.units);
      setAlertText(`Please specify a valid number of units to sell`);
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    }

    const body = {
      portfolio_id: portfolioId,
      ticker: stock.ticker,
      avg_price: parseFloat(sellPrice),
      quantity: parseInt(sellQuantity),
    };

    console.log(body);
    try {
      const res = await fetch(`${api}/portfolio/sellholding`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowAlert(false);
        handleClose();
        setCash(parseFloat(parseFloat(cash) - parseFloat(sellPrice) * parseInt(sellQuantity)));

        const newQuantity = stock && stock.quantity - sellQuantity;
        const index = holdings.map((e) => e.ticker).indexOf(stock.ticker);
        const newHoldings = holdings;
        if (newQuantity <= 0) {
          newHoldings.splice(index, 1);
          setHoldings([...newHoldings]);
        }
        // should deduct newQuantity from stock here but live update works XD
      } else {
        setAlertText("An unexpected error has occured. Please try again.");
        setShowAlert(true);
        await delay(3000);
        setShowAlert(false);
      }
    } catch (e) {
      console.warn(e);
      setAlertText("An unexpected error has occured. Please try again.");
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selling {stock && stock.ticker}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Alert variant="danger" show={showAlert}>
              {alertText}
            </Alert>

            <Form.Group controlId="sellprice">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control
                maxLength={7}
                onChange={(e) => {
                  setSellPrice(e.target.value);
                }}
                type="text"
                placeholder="421.41"
              />
              <Form.Text className="text-muted">
                The latest quoted price was {stock ? stock.live_price : 0}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="sellprice">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setSellQuantity(e.target.value);
                }}
                type="text"
                placeholder="63289"
              />
              <Form.Text className="text-muted">
                You have {stock ? stock.units : 0} units available
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                handleAddCash();
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SellStockModal;
