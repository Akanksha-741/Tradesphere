import React from 'react';


function Hero () {
    return ( 
        <div className="container text-center p-5 mb-5">
              <h3 className="mb-3">Zerodha Products</h3>
              <h5 className="text-muted fs-5">Sleek, modern, and intuitive trading platforms</h5>
              <p className="text-muted mt-3">Check out our <a href="#" style= {{textDecoration: "none"}}>investment offerings <i class="fa-solid fa-arrow-right-long"></i></a></p>
        </div>
     );
}

export default Hero  ;