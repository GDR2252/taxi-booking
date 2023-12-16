import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticationItems } from "../../utils/enums";
import { authenticationActions } from "../../redux/features/authenticaitonReducer";
import { authenticaitonItems } from "../../redux/selectors/authenticationSelector";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../utils/routes";
import Header from "./Header";

import "./SignupMainScreen.scss";

const SignupMainScreen = () => {
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
      navigate(clientRoutes.riderSignUp);
    }
  };

  return (
    <div className="main-screen-content">
      <Header />
      <div className="main-screen">
        <div>
          <div className="main-text" onClick={handleDriver}>
            Sign up to drive & deliver
          </div>
          <div className="border"></div>
        </div>
        <div>
          <div className="main-text" onClick={handleRider}>
            Create a rider account
          </div>
          <div className="border"></div>
        </div>
      </div>
    </div>
  );
};

export default SignupMainScreen;
