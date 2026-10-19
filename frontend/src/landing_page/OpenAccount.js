import React from 'react';
import { useNavigate } from "react-router-dom";

function NotFound () {
    const navigate = useNavigate();
    return ( 
        <div className="container p-5 mb-5">
            <div className='row, text-center' >
                   <h3>Open a Zerodha account</h3>
                   <p className='text-muted'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                  
                       <button
          className="p-3 btn btn-primary mb-5 fs-5"
          style={{ width: "30%", margin: "0 auto" }}
          onClick={() => navigate("/signup")}
        >
          Sign up for free
        </button>
            </div>
        </div>
     );
}

export default NotFound;
