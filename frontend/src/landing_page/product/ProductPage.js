import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import Navbar from "../Navbar";
import Footer from "../Footer";

function ProductPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <LeftSection
        imageURL="media/images/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo=""
        LearnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="media/images/console.png"
        productName="Console"
        productDescription="The central dashboard for your Zerodha account.
         Gain insights into your trades and investments with in-depth reports and visualisations."
        LearnMore=""
      />

      <LeftSection
        imageURL="media/images/coin.png"
        productName="Coin"
        productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo=""
        LearnMore=""
        googlePlay=""
        appStore=""
      />

      <RightSection
        imageURL="media/images/kiteconnect.png"
        productName="Kite Connect API"
        productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        LearnMore=""
      />

      <LeftSection
        imageURL="media/images/varsity.png"
        productName="Varsity"
        productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
        tryDemo=""
        LearnMore=""
        googlePlay=""
        appStore=""
      />
    <h5 className="text-center  " style={{ fontSize: '16px' , marginTop: '20px' }}>Want to know more about our technology stack? </h5><h5 className="text-center mb-5 " style={{ fontSize: '16px',}}>Check out the <a href="/" className="text-decoration-none">Zerodha.tech</a> blog.</h5>

      <Universe/> 
      <Footer />
    </>
  );
}

export default ProductPage;
