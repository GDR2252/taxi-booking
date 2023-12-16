import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../utils/routes";
import SignupForm from "../Authentication/RiderSignUp/RiderSignupForm";

import "./Header.scss";
import { useSelector } from "react-redux";
import { authenticaitonItems } from "../../redux/selectors/authenticationSelector";
import { AuthenticationItems } from "../../utils/enums";

const Header = () => {
  const navigate = useNavigate();
  const authenticationItems = useSelector(authenticaitonItems);
  console.log("authenticationItems", authenticationItems);

  const handleSignUp = () => {
    navigate(clientRoutes.signup_main_screen);
  };
  const handleLogin = () => {
    navigate(clientRoutes.signin_main_screen);
  };
  const handleHelp = () => {
    navigate(clientRoutes.help);
  };

  return (
    <div className="header-main-contain">
      <div className="header-content">
        <div className="header-nav-contain">
          <div className="header-logo">Texicog</div>
          <div>
            <ul className="header-nav">
              <li>Home</li>
              <li>Safety</li>
              <li onClick={handleHelp} >Help</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="header-buttons">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <button className="login-button" onClick={handleSignUp}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
