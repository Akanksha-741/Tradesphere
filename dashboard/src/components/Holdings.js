import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [error, setError] = useState("");

  const { openSellWindow, refreshTrigger } = useContext(GeneralContext);

  
 useEffect(() => {
  const fetchHoldings = async () => {
    try {
      setError("");

      const response = await axios.get("https://tradesphere-backend-7kg3.onrender.com/allHoldings", {
  withCredentials: true,
});

      setAllHoldings(response.data);
    } catch (error) {
      console.error("Error fetching holdings:", error);
      setError("Unable to load holdings.");
    }
  };

  fetchHoldings();
}, [refreshTrigger]);

  // Calculate investment and current value
  const totalInvestment = allHoldings.reduce((total, stock) => {
    return total + Number(stock.avg || 0) * Number(stock.qty || 0);
  }, 0);

  const currentValue = allHoldings.reduce((total, stock) => {
    return total + Number(stock.price || 0) * Number(stock.qty || 0);
  }, 0);

  const totalPnL = currentValue - totalInvestment;

  const totalPnLPercent =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const pnlClass = totalPnL >= 0 ? "profit" : "loss";

  // Chart data
  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price || 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (error) {
    return <p className="loss">{error}</p>;
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const curValue = price * qty;
              const investment = avg * qty;
              const profitLoss = curValue - investment;

              const profitPercent =
                investment > 0
                  ? ((profitLoss / investment) * 100).toFixed(2)
                  : "0.00";

              const profitClass = profitLoss >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>

                  <td className={profitClass}>
                    {profitLoss.toFixed(2)}
                  </td>

                  <td className={profitClass}>
                    {profitPercent}%
                  </td>

                  <td className={dayClass}>
                    {stock.day ?? "—"}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => openSellWindow(stock.name)}
                      className="btn btn-danger btn-sm"
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {allHoldings.length === 0 && (
          <p>No holdings found in your account.</p>
        )}
      </div>

      {/* Dynamic Investment Summary */}
      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={pnlClass}>
            {totalPnL.toFixed(2)} ({totalPnLPercent.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;