import React, { useState } from "react";
import Header from "../Authentication/Header";
import Footer from "../Footer/Footer";
import "./Help.scss"; // Import the CSS file

const Help = () => {
  return (
    <div>
      <Header />
      <div className="image-container">
        <img src="./images/slider1.jpg" alt="Slider Image 1" />
        <div className="form-content">
          <div className="get-texy-content">
            <div className="get-texy-text">
              <h2>HOW CAN I HELP YOU?</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
