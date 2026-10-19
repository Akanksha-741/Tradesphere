import React, { useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/allPositions",
          { withCredentials: true }
        );

        setPositions(response.data);
      } catch (err) {
        console.error("Error fetching positions:", err);
        setError("Unable to load positions. Please log in again if needed.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return <h3 className="title">Loading positions...</h3>;
  }

  if (error) {
    return <h3 className="title">{error}</h3>;
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((stock) => {
              const qty = Number(stock.qty) || 0;
              const avg = Number(stock.avg) || 0;
              const price = Number(stock.price) || 0;
              const curValue = price * qty;
              const profitLoss = curValue - avg * qty;

              const profitClass = profitLoss >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td className={profitClass}>
                    {profitLoss.toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {positions.length === 0 && (
          <p>No positions found in your account.</p>
        )}
      </div>
    </>
  );
};

export default Positions;