import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
         "https://tradesphere-backend-7kg3.onrender.com/allOrders",
          { withCredentials: true }
        );

        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h2>Order History ({orders.length})</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={cellStyle}>Stock</th>
              <th style={cellStyle}>Quantity</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={cellStyle}>{order.name}</td>

                <td style={cellStyle}>
                  {order.qty ?? "—"}
                </td>

                <td style={cellStyle}>
                  {Number.isFinite(Number(order.price))
                    ? `₹${Number(order.price).toLocaleString("en-IN")}`
                    : "—"}
                </td>

                <td
                  style={{
                    ...cellStyle,
                    color:
                      order.mode === "BUY" ? "#16a34a" : "#dc2626",
                    fontWeight: "600",
                  }}
                >
                  {order.mode}
                </td>

                <td style={cellStyle}>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("en-IN")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const cellStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #e0e0e0",
  whiteSpace: "nowrap",
};

export default Orders;