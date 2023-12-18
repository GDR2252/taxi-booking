import React, { useState } from "react";
import AadharCardField from "./AadharCardField";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../../../redux/features/authenticaitonReducer";
import PanCardField from "./PanCardField";

import "./AadharCard.scss";

const PanCard = () => {
  const dispatch = useDispatch();

  const [panCard, setPanCard] = useState("");
  const [image, setImage] = useState();

  const handleFileInputChange = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setImage(selectedFile.name);
    }
  };
  const handleAadharCardChange = (value: string) => {
    setPanCard(value);
  };
  const handleSubmit = () => {
    dispatch(
      authenticationActions.updateProfileField({
        pancard_number: panCard,
        pancard_image: image,
      })
    );
  };
  return (
    <div className="aadharcard-content">
      <div className="container">
        <div className="header">
          <div className="logo">Texicog</div>
          <div className="help">
            <div>Help</div>
          </div>
        </div>
        <div className="main">
          <h1 className="main-text">Let's find your Pan card</h1>
          <p className="main-para">
            Enter your Aadhaar and we'll get your information from UIDAI. By
            sharing <br />
            your Aadhaar details, you hereby confirm that you have shared such
            <br />
            details voluntarily.
          </p>
          <div className="aadhar-card">
            <img
              src="../images/aadhar-card.png"
              className="aadhar-card-image"
            ></img>
          </div>
          <PanCardField value={panCard} onChange={handleAadharCardChange} />
          {!image ? (
            <div className="aadhar-link">
              <label htmlFor="fileInput" className="custom-file-input">
                Upload document instead
              </label>

              <input
                type="file"
                id="fileInput"
                className="hidden-file-input"
                onChange={handleFileInputChange}
              />
            </div>
          ) : (
            <div className="image-name">{image}</div>
          )}
          <div className="aadhar-signup-button" onClick={handleSubmit}>
            <button className="aadhar-button-link" type="submit">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PanCard;
