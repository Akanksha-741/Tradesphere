import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  LearnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container  border-top mb-5 ">
      <div className="row mt-5 ">
        <div className="col-md-6 ">
          <img src={imageURL} />
        </div>
        <div className="col-md-6 p-3 mt-5">
          <h3>{productName}</h3>
          <p>{productDescription}</p>

          <div>
            <a href={tryDemo} className="mt-2 p-3">
              {" "}
              Try Demo
            </a>
            <a href={LearnMore} className=" ms-2 p-3">
              {" "}
              Learn More{" "}
            </a>
          </div>

          <div className="mt-3">
            <a href={googlePlay} className=" ms-2">
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore} className=" ms-2">
              <img src="media/images/appStoreBadge.svg  " />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
