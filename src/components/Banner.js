import React from "react";
import design from "../assets/design.svg";
import spacer from "../assets/spacer.svg";

const Banner = () => {
  return (
    <div className="flex items-center justify-between bg-deep-blue px-10 py-14">
      <div className="flex flex-col w-2/6">
        <div className="text-white text-5xl font-bold mb-5">
          Best Site For Stock Price Prediction
        </div>
        <div className="text-gray text-xl mb-14">
          Stock market prediction is the act of trying to determine the future
          value of a company stock or other financial instrument traded on an
          exchange.
        </div>

        <a href="#search">
          <div className="flex items-center justify-center bg-green text-white font-bold py-3 px-5 rounded-md w-36">
            Get Started
          </div>
        </a>
        <div className="h-20"></div>
        <img src={spacer} className="h-32" alt="price" />
      </div>
      <div>
        <img src={design} alt="React Logo" />
      </div>
    </div>
  );
};

export default Banner;
