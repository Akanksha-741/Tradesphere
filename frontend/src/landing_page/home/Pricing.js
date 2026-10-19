import React from 'react';

function Pricing () {
    
        return(
            <div className='container'>          
            <div className='row'>
            <div className='col-4'>
                  <h3 className='mb-3 p-3'>Unbeatable pricing</h3>
               <p>We pioneered the concept of discount broking and price transparency in India. 
                Flat fees and no hidden charges</p>
                <a href='' className='mx-5' style={{textDecoration: "none"}}>See pricing <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div className='col-8'>
                <div className='row'>
                    <div className='col-4'>
                           <img src="/Media/images/pricing0 (1).svg" alt="PriceOne"  className="img-fluid" style={{width:"70%" }}/> 
                       <br/>    <p className='mt-3'>Free account opening</p>
                    </div>
                    <div className='col-4'> 
                              <img src="/Media/images/pricing0.svg" alt="PriceOne"  className="img-fluid" style={{width:"70%" }} /> 
                                <p>Free equity delivery and direct mutual funds </p>
                    </div>
                    <div className='col-4'>
                           <img src="/Media/images/intradayTrades.svg" alt="PriceOne"  className="img-fluid" style={{width:"70%" }}/>
                             <p>Intraday andF&O</p>
                    </div>
                </div>
                
                
                
            </div>

            <div className='row'>
                <div className='col-6 p-5'>
                    <img src="/Media/images/education.svg" alt="PriceOne"  className="img-fluid " style={{width:"100%" , maxWidth:"550px"}}/>
                </div>
                 <div className='col-6 p-5 '>
                    <h3 className='mb-3 mt-5 , text-center'>Free and open market education</h3>

                    <p  className = "text-center"> Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                      <a href='' className='mx-5' style={{textDecoration: "none"}}>Varsity<i class="fa-solid fa-arrow-right"></i> </a>


                      <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                      <a href='' className='mx-5' style={{textDecoration: "none"}}>TradingQ&A<i class="fa-solid fa-arrow-right"></i> </a>


                </div>
            </div>
            


            {/* <div className='row, text-center' >
                   <h3>Open a Zerodha account</h3>
                   <p className='text-muted'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                   <button  className="p-3, btn btn-primary mb-5  fs-5"    style={{width:"30%", margin :"0 auto"}}>Sign up for free</button>
             
            </div> */}
        </div>
    </div>
    )
        

}

export default Pricing ;