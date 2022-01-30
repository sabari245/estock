import React from "react";

import { person } from "react-icons/fa";

const Contactus = () => {
  return (
    <div
      id="contactus"
      className="flex items-center justify-center bg-deep-blue px-10 py-14"
    >
      <div className="flex flex-col">
        <div className="text-white text-5xl font-bold mb-5 text-center">
          Thank you for Visiting our site!
        </div>
        <div className="text-gray text-xl mb-14 text-center">
          Feel free to contact us if you have any questions or comments.
        </div>
        <div className="mb-56 mt-5 flex items-center justify-center">
          <a href="https://linktr.ee/dinakardhanush" target="_blank">
            <div className="flex items-center justify-center bg-green text-white font-bold py-3 px-5 rounded-md w-36">
              Contact Us
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
