import React from "react";

import "./Services.scss";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      image: "../images/driving.png",
      title: "Fast Booking",
      description:
        "Donec varius sodales orci. Class aptent taciti sociosqu ad litora torquent per conubia",
    },
    {
      id: 2,
      image: "../images/rent.png",
      title: "Best Tariff",
      description:
        "Donec varius sodales orci. Class aptent taciti sociosqu ad litora torquent per conubia",
    },
    {
      id: 3,
      image: "../images/fast.png",
      title: "Fast & Safe",
      description:
        "Donec varius sodales orci. Class aptent taciti sociosqu ad litora torquent per conubia",
    },
    {
      id: 4,
      image: "../images/live.png",
      title: "Live Support",
      description:
        "Donec varius sodales orci. Class aptent taciti sociosqu ad litora torquent per conubia",
    },
    // Add more data objects as needed
  ];

  return (
    <div className="services-contain">
      <div className="our-services-text">OUR AWESOME SERVICES</div>
      <div className="card-container">
        {servicesData.map((service) => (
          <div className="card" key={service.id}>
            <img src={service.image} alt="Service" />
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
