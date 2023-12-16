import React, { useState } from "react";
import AadharCardField from "./AadharCardField";
import { authenticationActions } from "../../../../redux/features/authenticaitonReducer";
import { useDispatch } from "react-redux";

import "./AadharCard.scss";

const AadharCard = () => {
  const dispatch = useDispatch();

  const [aadharCard, setAadharCard] = useState("");

  const handleAadharCardChange = (value: string) => {
    setAadharCard(value);
  };
  const [image, setImage] = useState();

  const handleFileInputChange = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setImage(selectedFile.name);
    }
  };

  const handleSubmit = () => {
    dispatch(
      authenticationActions.updateProfileField({
        addhar_card: aadharCard,
        addharCard_image: image,
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
          <h1 className="main-text">Let's find your Aadhaar card</h1>
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
          <AadharCardField
            value={aadharCard}
            onChange={handleAadharCardChange}
          />
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
          <div className="aadhar-signup">
            <button
              className="aadhar-button"
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

export default AadharCard;
