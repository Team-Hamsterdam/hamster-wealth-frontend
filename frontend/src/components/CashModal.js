import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { api } from "../utils/API";

const CashModal = ({ show, handleClose, portfolioId, setCash, cash }) => {
  const [cashAmount, setCashAmount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const actualClose = () => {
    setShowAlert(false);
    handleClose();
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleAddCash = async () => {
    const token = localStorage.getItem("token");
    if (!cashAmount || cashAmount === 0 || isNaN(cashAmount) || isNaN(parseFloat(cashAmount))) {
      setAlertText("Please specify a valid amount of cash to add");
      setShowAlert(true);
      await delay(3000);
      setShowAlert(false);
      return;
    }
    const body = {
      portfolio_id: portfolioId,
      cash_amount: parseInt(cashAmount),
    };

    try {
      const res = await fetch(`${api}/portfolio/addcash`, {
        method: "POST",
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
        setCash(parseFloat(parseFloat(cash) + parseFloat(cashAmount)));
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
      <Modal show={show} onHide={actualClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Cash</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Alert variant="danger" show={showAlert}>
              {alertText}
            </Alert>

            <Form.Group controlId="cash">
              <Form.Label>Enter the amount of cash to add to your portfolio</Form.Label>
              <Form.Control
                maxLength={7}
                onChange={(e) => {
                  setCashAmount(e.target.value);
                }}
                type="text"
                placeholder="32841"
              />
              <Form.Text className="text-muted">
                You can also enter a negative number to remove cash from your portfolio.
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

export default CashModal;
