import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticationItems } from "../../utils/enums";
import { authenticationActions } from "../../redux/features/authenticaitonReducer";
import { authenticaitonItems } from "../../redux/selectors/authenticationSelector";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../utils/routes";
import Header from "./Header";

import "./SigninMainScreen.scss";

const SigninMainScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticationItems = useSelector(authenticaitonItems);
  const handleDriver = () => {
    dispatch(authenticationActions.roleItems(AuthenticationItems.driver));
    if (authenticationItems === AuthenticationItems.driver) {
      navigate(clientRoutes.driverSignUp);
    }
  };
  const handleRider = () => {
    dispatch(authenticationActions.roleItems(AuthenticationItems.rider));
    if (authenticationItems === AuthenticationItems.rider) {
      navigate(clientRoutes.riderLogin);
    }
  };
  return (
    <div className="main-screen-content-signin">
      <Header />
      <div className="signin-main-screen">
        <div>
          <div className="signin-main-text" onClick={handleDriver}>
            Sign in to drive & deliver
          </div>
          <div className="border"></div>
        </div>
        <div>
          <div className="signin-main-text" onClick={handleRider}>
            Sign in to ride
          </div>
          <div className="border"></div>
        </div>
      </div>
    </div>
  );
};

export default SigninMainScreen;
