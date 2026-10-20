import React from "react";

function Hero() {
  return (
    <div className="container  p-5 mb-5">
      <div className="row p-3 mt-5 text-center">
        <h3 className="mb-3">Charges</h3>
        <h5 className="text-muted fs-5">List of all charges and taxes</h5>
      </div>

      <div className="row p-5 mt-5 mb-5">
        <div className="col-4 p-3">
          <img src="/media/images/pricingEquity.svg" alt="Free equity delivery" />
          <h4>Free equity delivery</h4>
          <p>
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col-4 p-3 mb-5">
          <img src="/media/images/intradayTrades.svg " alt="Description of the image"/>
          <h4>Intraday and F&O trades</h4>
          <p>
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="col-4 p-3 mb-5">
          <img src="/media/images/pricingMF.svg"  alt="Free direct mutual funds"/>
          <h4>Free direct MF</h4>
          <p>
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>

      <h4 className="mb-5 ">Charges for account opening</h4>

      <table className="table " style={{ marginBottom: "7rem" , fontSize: "14px" }}>
        <thead>
          <tr>
            <th className="text-muted">Type of account</th>
            <th className="text-muted">Charges</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Individual account</td>
            <td>
              <span
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "5px 8px",
                  borderRadius: "2px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                FREE
              </span>
            </td>
          </tr>

          <tr>
            <td style={{backgroundColor: "#F9F8F6" }}>Minor account</td>
            <td>
              <span
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "5px 8px",
                  borderRadius: "2px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                FREE
              </span>
            </td>
          </tr>

          <tr>
            <td>NRI account</td>
            <td>₹ 500</td>
          </tr>

          <tr>
            <td>HUF account</td>

            <td style={{backgroundColor: "#F9F8F6"}}>
              <span
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "5px 8px",
                  borderRadius: "2px",
                  fontSize: "13px",
                }}
              >
                FREE
              </span>{" "}
              (online) / ₹500 (offline)
            </td>

            {/* <td>Free (online) / ₹ 500 (offline)</td> */}
          </tr>

          <tr>
            <td>Partnership, LLP, and Corporate accounts (offline only)</td>
            <td>₹ 500</td>
          </tr>
        </tbody>
      </table>

      <h4 className="mb-5  " style={{ marginTop: "7rem" }}>
        Demat AMC (Annual Maintenance Charge)
      </h4>
      <p>Free for first year*</p>
      <p className="mb-4" style={{fontSize: "12px"}}>From second year onwards, for BSDA accounts:</p>

      <table className="table " style={{ fontSize: "14px" }}>
        <thead>
          <tr>
            <th className="text-muted"> Value of holdings</th>
            <th className="text-muted">AMC</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Up to ₹4 lakh</td>
            <td>
              <span
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "5px 8px",
                  borderRadius: "2px",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                FREE
              </span>
            </td>
          </tr>

          <tr>
            <td style={{backgroundColor: "#F9F8F6"}} >₹4 lakh – ₹10 lakh</td>
            <td style={{backgroundColor: "#F9F8F6"}}>₹100 per year + 18% GST, charged quarterly</td>
          </tr>

          <tr>
            <td>Above ₹10 lakh</td>
            <td>₹300 per year + 18% GST, charged quarterly</td>
          </tr>
        </tbody>
      </table>

      <p style={{fontSize: "12px"}}>
        For a non-BSDA account, AMC is ₹300 per year + 18% GST, regardless of holdings value, charged quarterly.
      </p>
      <p style={{fontSize: "12px"}}>
        To learn more about BSDA, click here. To learn more about AMC, click here.
      </p>
      <p style={{fontSize: "12px" , marginBottom: "5rem"}}>*Resident individual accounts only.</p>


      <h4 className="mb-5  " style={{ marginTop: "2rem" }}>
        Charges for optional value added services
      </h4>

      <table className="table " style={{ fontSize: "14px" }}>
        <thead>
          <tr >
            <th className="text-muted">Service</th>
            <th className="text-muted">Billing Frequency</th>
            <th className="text-muted">Charges</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Tickertape</td>
            <td>Monthly / Quarterly / Annual</td>
            <td>Free: 0 | Pro: 249/699/2399</td>
          </tr>

          <tr >
            <td  style={{backgroundColor: "#F9F8F6"}}>Smallcase</td>
            <td style={{backgroundColor: "#F9F8F6"}}>Per transaction</td>
            <td style={{backgroundColor: "#F9F8F6"}}>Buy & Invest More: 100 | SIP: 10</td>
          </tr>

          <tr>
            <td>Kite Connect</td>
            <td>Monthly</td>
            <td>Connect: 500 | Personal: Free</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Hero;
