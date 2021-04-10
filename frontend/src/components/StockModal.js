import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { api } from "../utils/API";

const StockModal = ({ show, handleClose, portfolioId, setHoldings, holdings }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [ticker, setTicker] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const actualClose = () => {
    setShowAlert(false);
    handleClose();
  };

  const handleAddStock = async () => {
    const token = localStorage.getItem("token");
    if (ticker.length === 0) {
      setAlertText("Ticker cannot be empty");
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    } else if (purchasePrice <= 0) {
      setAlertText("Purchase price cannot be less than or equal to 0");
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    } else if (quantity <= 0) {
      setAlertText("Quantity cannot less than or equal to 0");
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    } else if (isNaN(purchasePrice) || isNaN(parseFloat(purchasePrice))) {
      setAlertText("Purchase price must be a valid number");
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    } else if (isNaN(quantity) || isNaN(parseFloat(quantity))) {
      setAlertText("Quantity must be a valid number");
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    }

    try {
      const body = {
        portfolio_id: portfolioId,
        ticker: ticker,
        avg_price: purchasePrice,
        quantity: quantity,
      };

      const res = await fetch(`${api}/portfolio/buyholding`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        setShowAlert(false);
        handleClose();
      } else {
        setAlertText(data.message);
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

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <>
      <Modal show={show} onHide={actualClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Alert variant="danger" show={showAlert}>
              {alertText}
            </Alert>

            <Form.Group controlId="ticker">
              <Form.Label>Ticker Symbol</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setTicker(e.target.value);
                }}
                type="text"
                placeholder="TSLA"
              />
              <Form.Text className="text-muted">
                Please enter the ticker symbol for stock. (Only American Stocks are officially
                supported)
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="avgprice">
              <Form.Label>Average Purchase Price</Form.Label>
              <Form.Control
                maxLength={7}
                onChange={(e) => {
                  setPurchasePrice(e.target.value);
                }}
                type="text"
                placeholder="8.42"
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                maxLength={20}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                type="text"
                placeholder="2000"
              />
            </Form.Group>
            <p className="black">
              Value: $
              {!isNaN(purchasePrice) &&
              !isNaN(parseFloat(purchasePrice)) &&
              !isNaN(quantity) &&
              !isNaN(parseFloat(quantity)) &&
              purchasePrice &&
              quantity
                ? (purchasePrice * quantity).toFixed(2)
                : "0"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                handleAddStock();
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

export default StockModal;
