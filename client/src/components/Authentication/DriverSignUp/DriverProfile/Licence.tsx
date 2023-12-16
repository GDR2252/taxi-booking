  import React, { useState } from "react";
import LicenceField from "./LicenceField";
import AuthApiServices from "../../../../helpers/apis/authenticationApiServices";
import { authenticationActions } from "../../../../redux/features/authenticaitonReducer";
import { useDispatch } from "react-redux";

import "./Licence.scss";

const Licence = () => {
  const dispatch = useDispatch();
  const [licence, setLicence] = useState("");

  const handleLicenceChange = (value: string) => {
    setLicence(value);
  };
  const retrievedUserData = JSON.parse(localStorage.getItem("userData") as any);
  const userId = retrievedUserData?._id;

  const handleSubmit = () => {
    dispatch(
      authenticationActions.updateProfileField({
        licence_number: licence,
      })
    );
  };

  return (
    <div className="licence-content-sec">
      <div className="container">
        <div className="header">
          <div className="logo">Texicog</div>
          <div className="help">
            <div>Help</div>
          </div>
        </div>
        <div className="main">
          <h1 className="main-text">Enter your licence number</h1>
          <div className="licence-card">
            <img
              src="../images/licence.png"
              className="licence-card-image"
            ></img>
          </div>
          <LicenceField value={licence} onChange={handleLicenceChange} />
          <div className="licence-signup">
            <button
              className="licence-button"
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Licence;
