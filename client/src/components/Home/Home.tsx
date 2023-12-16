import React from "react";
import Header from "../Header/Header";
import ImageSlider from "./Slider";
import Footer from "../Footer/Footer";
import Services from "./Services";
import WhatWeCanDo from "./WhatWeCanDo";
import AvailableCar from "./AvailableCar";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Header />
      <ImageSlider />
      <WhatWeCanDo />
      <Services />
      <AvailableCar />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
