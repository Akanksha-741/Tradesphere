import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

// BUY ACTION WINDOW
const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow, refreshDashboard } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");

  const [loading, setLoading] = useState(false);

  const handleBuyClick = async (e) => {
    e.preventDefault();

    if (
      Number(stockQuantity) <= 0 ||
      !Number.isInteger(Number(stockQuantity)) ||
      !Number.isFinite(Number(stockPrice)) ||
      Number(stockPrice) <= 0
    ) {
      alert("Please enter a valid quantity and price.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        {
          withCredentials: true,
        },
      );

      alert(response.data.message || "Stock purchased successfully!");

      closeBuyWindow();
      refreshDashboard();
    } catch (error) {
      console.error(
        "Error placing buy order:",
        error.response?.data || error.message,
      );

      alert(
        error.response?.data?.message ||
          "Unable to place the buy order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              step="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              min="0.01"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Margin required ₹
          {(Number(stockQuantity) * Number(stockPrice || 0)).toFixed(2)}
        </span>

        <div>
          <Link
            className="btn btn-blue"
            to="#"
            onClick={handleBuyClick}
            aria-disabled={loading}
          >
            {loading ? "Processing..." : "Buy"}
          </Link>

          <Link className="btn btn-grey" to="#" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

// SELL ACTION WINDOW
export const SellActionWindow = ({ uid }) => {
  const { closeSellWindow, refreshDashboard } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSellClick = async (e) => {
    e.preventDefault();

    if (
      Number(stockQuantity) <= 0 ||
      !Number.isInteger(Number(stockQuantity)) ||
      !Number.isFinite(Number(stockPrice)) ||
      Number(stockPrice) <= 0
    ) {
      alert("Please enter a valid quantity and price.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL",
        },
        {
          withCredentials: true,
        },
      );

      alert(response.data.message || "Sell order placed successfully!");
      closeSellWindow();
      refreshDashboard();
    } catch (error) {
      console.error(
        "Error placing sell order:",
        error.response?.data || error.message,
      );

      alert(
        error.response?.data?.message ||
          "Unable to place the sell order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="sell-qty"
              min="1"
              step="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="sell-price"
              min="0.01"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Sell order</span>

        <div>
          <Link
            className="btn btn-blue"
            to="#"
            onClick={handleSellClick}
            aria-disabled={loading}
          >
            {loading ? "Processing..." : "Sell"}
          </Link>

          <Link className="btn btn-grey" to="#" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
