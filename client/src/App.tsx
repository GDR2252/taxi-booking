import React, { Suspense } from "react";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import { clientRoutes } from "./utils/routes";
import { ToastContainer } from "react-toastify";
import RiderSignupForm from "./components/Authentication/RiderSignUp/RiderSignupForm";
import DriverSignupForm from "./components/Authentication/DriverSignUp/DriverSignupForm";
import RiderProfile from "./components/Authentication/RiderSignUp/RiderProfile";
import DriverMobileVerification from "./components/Authentication/DriverSignUp/DriverMobileVerification";
import RiderMobileVerification from "./components/Authentication/RiderSignUp/RiderMobileVerification";
import RiderLogin from "./components/Authentication/RiderSignIn/RiderLogin";
import AadharCard from "./components/Authentication/DriverSignUp/DriverProfile/AadharCard";
import LoginRiderMobileVerification from "./components/Authentication/RiderSignIn/LoginRiderMobileVerification";
import PanCard from "./components/Authentication/DriverSignUp/DriverProfile/PanCard";
import Licence from "./components/Authentication/DriverSignUp/DriverProfile/Licence";
import VehiclePermit from "./components/Authentication/DriverSignUp/DriverProfile/VehiclePermit";
import Language from "./components/Authentication/DriverSignUp/DriverProfile/Language";
import Profile from "./components/Authentication/DriverSignUp/DriverProfile/Profile";
import SignupMainScreen from "./components/Authentication/SignupMainScreen";
import SigninMainScreen from "./components/Authentication/SigninMainScreen";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import DriverLogin from "./components/Authentication/DriverSignIn/DriverLogin";
import LoginDriverMobileVerification from "./components/Authentication/DriverSignIn/LoginDriverMobileVerification";
import DriverProfileDetail from "./components/Authentication/DriverSignUp/DriverProfile/DriverProfileDetail";
import DriverProfile from "./components/Authentication/DriverSignUp/DriverProfile";
import Help from "./components/Help/Help";


function App() {
  return (
    <div className="App" data-theme="dark">
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path={clientRoutes.home} element={<Home />} />
          <Route
            path={clientRoutes.riderSignUp}
            element={<RiderSignupForm />}
          />
          <Route
            path={clientRoutes.driverSignUp}
            element={<DriverSignupForm />}
          />
          <Route
            path={clientRoutes.riderMobileVerification}
            element={<RiderMobileVerification />}
          />
          <Route
            path={clientRoutes.driverMobileVerification}
            element={<DriverMobileVerification />}
          />
          <Route path={clientRoutes.riderLogin} element={<RiderLogin />} />
          <Route path={clientRoutes.driverLogin} element={<DriverLogin />} />

          <Route
            path={clientRoutes.riderLoginMobileVerification}
            element={<LoginRiderMobileVerification />}
          />
          <Route
            path={clientRoutes.driverLoginMobileVerification}
            element={<LoginDriverMobileVerification />}
          />
          <Route
            path={clientRoutes.signup_main_screen}
            element={<SignupMainScreen />}
          />
          <Route
            path={clientRoutes.signin_main_screen}
            element={<SigninMainScreen />}
          />
          <Route path={clientRoutes.riderProfile} element={<RiderProfile />} />
          <Route path={clientRoutes.aadharcard} element={<AadharCard />} />
          <Route path={clientRoutes.pancard} element={<PanCard />} />
          <Route path={clientRoutes.licence} element={<Licence />} />
          <Route path={clientRoutes.vehicle} element={<VehiclePermit />} />
          <Route path={clientRoutes.language} element={<Language />} />
          <Route path={clientRoutes.profile} element={<Profile />} />

          <Route
            path={clientRoutes.driverProfileDetail}
            element={<DriverProfileDetail />}
          />
          <Route
            path={clientRoutes.driverProfile}
            element={<DriverProfile />}
          />
          <Route
            path={clientRoutes.help}
            element={<Help />}
          />
        </Routes>

        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
