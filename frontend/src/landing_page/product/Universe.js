import React from "react";


function Universe(
  {
    imageURL, 
    productName, 
    productDescription, 
    LearnMore }
) {
  return (
   <div className="container  ">
      <div className="row text-center mb-5 mt-5">
        <h1>The Zerodha Universe</h1>


        <div className="col-4 p-3">
          <img src="media/images/zerodhaFundhouse.png"  className="mb-4" style={{width: '50%' }}  />
          <p style={{lineHeight: '0' , fontSize: '12px'}} className="text-muted">Our asset management venture</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">that is creating simple and transparent index</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">funds to help you save for your goals.</p>
        </div>

         <div className="col-4 p-3">
          <img src="media/images/sensibullLogo.svg"  className="mb-4" style={{width: '50%' }}  />
          <p style={{lineHeight: '0' , fontSize: '12px'}} className="text-muted">Options trading platform that lets you</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">creates strategies, analyze positions, and examine</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">data points like open interest,FII/DII, and more.</p>
        </div>

         <div className="col-4 p-3">
           <img src="media/images/streakLogo.png"  className="mb-4" style={{width: '50%' }}  />
          <p style={{lineHeight: '0' , fontSize: '12px'}} className="text-muted">Systematic trading platform</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">that allows you to create and backtest</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">strategies without coding. </p>
        </div>



         <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png"  className="mb-4" style={{width: '50%' }}  />
          <p style={{lineHeight: '0' , fontSize: '12px'}} className="text-muted">Thematic investing platform</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">that helps you invest in diversified</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">baskets of stocks on ETFs.</p>
        </div>

         <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png"  className="mb-4" style={{width: '50%' }}  />
          <p style={{lineHeight: '0' , fontSize: '12px'}} className="text-muted">Investment research platform</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">that offer detailed insights on stocks,</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">sectors,supply chain,and more.</p>
        </div>

         <div className="col-4 p-3 mt-5">
           <img src="media/images/dittoLogo.png"  className="mb-4" style={{width: '50%' }}  />
          <p style={{lineHeight: '0' , fontSize: '12px'}} className="text-muted">Personalized advice on life</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">and health insurance.No spam</p>
          <p style={{lineHeight: '0', fontSize: '12px'}} className="text-muted">and no mis-selling. </p>
        </div>


         <button  className="p-3, btn btn-primary mb-5  fs-5 mt-5"    style={{width:"30%", margin :"0 auto"}}>Sign up for free</button>
         
      </div>
      </div>
    
  );
}

export default Universe;