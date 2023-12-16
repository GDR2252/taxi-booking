import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./Slider.scss";
import BookingAuthApiServices from "../../helpers/apis/bookingApiServices";
import { toast } from "react-toastify";

const language = [
  { label: "English" },
  { label: "German" },
  { label: "Spanish" },
  { label: "French" },
  { label: "Italian" },
  { label: "Russian" },
];

const ImageSlider = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const handleOrderNow = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        toast.error("To place a booking, please sign in first.");

        return;
      }
      const values = {
        pickup_location: pickupLocation,
        destination_location: destination,
        phone_number: phoneNumber,
      };

      const res = await BookingAuthApiServices.signup(values as any);
      if (res?.data.success && res?.data.response_code === "CREATE_SUCCESS") {
        toast.success(res?.data?.message);
      }
      console.log("API Response:", res.data);
    } catch (error: any) {
      console.error("API Error:", error.message);
    }
  };
  return (
    <div className="slider-container">
      <div className="image-container">
        <Slider {...settings}>
          <div>
            <img src="./images/slider1.jpg" alt="Slider Image 1" />
          </div>
          <div>
            <img src="./images/slider2.jpg" alt="Slider Image 2" />
          </div>
          <div>
            <img src="./images/slider3.jpg" alt="Slider Image 3" />
          </div>
        </Slider>
        <div className="form-content">
          <div className="get-texy-content">
            <div className="get-texy-text">GET A TEXY NOW</div>
            <div className="call-text">
              <CallIcon
                style={{ color: "white", width: "40px", height: "38px" }}
              />
              <span>1-800-123-1234</span>
            </div>
            <p className="get-texy-des">
              Trust the leading and the most reliable US taxi operator.
            </p>
          </div>

          <div>
            <form
              className="form-container"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* ... (your form fields) */}
              <div>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="form-input"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="form-input"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="form-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="order">
                <button className="order-button" onClick={handleOrderNow}>
                  Order now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
