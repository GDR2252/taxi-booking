import React from "react";

import "./WhatWeCanDo.scss";

const WhatWeCanDo = () => {
  const data = [
    {
      image: "../images/image1.jpg",
      title: "BEST ROUTE",
      text: (
        <p>
          Donec varius sodales orci. Class aptent taciti sociosqu
          <br /> ad litora torquent per conubia nostra, per inceptos
          <br /> himenaeos. Aenean a arcu ullamcorper
        </p>
      ),
    },
    {
      image: "../images/image2.jpg",
      title: "maintenance",
      text: (
        <p>
          Donec varius sodales orci. Class aptent taciti sociosqu
          <br /> ad litora torquent per conubia nostra, per inceptos
          <br /> himenaeos. Aenean a arcu ullamcorper
        </p>
      ),
    },
    {
      image: "../images/image3.jpg",
      title: "car rental",
      text: (
        <p>
          Donec varius sodales orci. Class aptent taciti sociosqu
          <br /> ad litora torquent per conubia nostra, per inceptos
          <br /> himenaeos. Aenean a arcu ullamcorper
        </p>
      ),
    },
    // Add more objects here for additional images
  ];

  return (
    <div className="what-we-can-do-contain">
      <div className="what-text">What we do</div>

      <div className="what-we-can-do-content">
        {data.map((item, index) => (
          <div className="images" key={index}>
            <img src={item.image} alt={`Image ${index}`} />
            <h1 className="title-text">{item.title}</h1>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeCanDo;
