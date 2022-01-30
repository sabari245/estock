import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-deep-blue pt-7 pb-5">
      <h1 className="ml-10 text-green text-4xl font-bold">EStock</h1>
      <div className="flex items-center mr-9">
        <a href="#search" className="text-white px-4">
          Search
        </a>
        <a href="#contactus" className="text-white px-4">
          Contact us
        </a>
      </div>
    </div>
  );
};

export default Navbar;
