import React from "react";

function RightSection({
    imageURL, 
    productName, 
    productDescription, 
    LearnMore }) {
  return (
    <div className="container mt-5 ">
      <div className="row ">
        <div className="col-6  p-5"  style={{ marginTop: "100px" }}>
          <h3>{productName}</h3>
          <p>{productDescription}</p>
          <a href={LearnMore} style={{marginLeft:"50px"}}>Learn More</a>
        </div>

        <div className="col-6">
          <img src={imageURL} />
        </div>
      </div>

      
    </div>
  );
}

export default RightSection;
