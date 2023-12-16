import React from "react";

import "./AvailableCar.scss";

const carData = [
  {
    id: 1,
    imgSrc: "../images/car1.jpg",
    title: "DONEC VARIUS SODALES ORCI",
    description: (
      <p>
        Donec varius sodales orci. Class aptent taciti sociosqu ad litora
        <br />
        torquent per conubia nostra, per inceptos himenaeos. Aenean a arcu
        <br />
        ullamcorper eros viverra suscipit. Donec varius sodales orci.
        <br />
        Class aptent taciti sociosqu ad litora torquent per conubia
        <br />
        nostra, per inceptos himenaeos. Aenean a arcu ullamcorper.
      </p>
    ),
  },
  {
    id: 2,
    imgSrc: "../images/car2.jpg",
    title: "DONEC VARIUS SODALES ORCI",
    description: (
      <p>
        Donec varius sodales orci. Class aptent taciti sociosqu ad litora
        <br />
        torquent per conubia nostra, per inceptos himenaeos. Aenean a arcu
        <br />
        ullamcorper eros viverra suscipit. Donec varius sodales orci.
        <br />
        Class aptent taciti sociosqu ad litora torquent per conubia
        <br />
        nostra, per inceptos himenaeos. Aenean a arcu ullamcorper.
      </p>
    ),
  },
  {
    id: 3,
    imgSrc: "../images/car3.jpg",
    title: "DONEC VARIUS SODALES ORCI",
    description: (
      <p>
        Donec varius sodales orci. Class aptent taciti sociosqu ad litora
        <br />
        torquent per conubia nostra, per inceptos himenaeos. Aenean a arcu
        <br />
        ullamcorper eros viverra suscipit. Donec varius sodales orci.
        <br />
        Class aptent taciti sociosqu ad litora torquent per conubia
        <br />
        nostra, per inceptos himenaeos. Aenean a arcu ullamcorper.
      </p>
    ),
  },
  // Add other data objects here
];

const AvailableCar = () => {
  return (
    <div className="available-car-contain">
      <div className="available-car-type-text">AVAILABLE CAR TYPES</div>

      <div className="car-main-content">
        {carData.map((car) => (
          <div className="car-contain" key={car.id}>
            <div>
              <img src={car.imgSrc} alt={`car-${car.id}`} />
            </div>
            <div>
              <div className="car-sub-title">{car.title}</div>
              {car.description}
              <div>
                <button className="book-button">Book now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCar;
