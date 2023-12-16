import React, { useState } from "react";
import "./VehiclePermit.scss";
import { authenticationActions } from "../../../../redux/features/authenticaitonReducer";
import { useDispatch } from "react-redux";

const VehiclePermit = () => {
  const dispatch = useDispatch();

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
        vehicle_permit: image,
      })
    );
  };
  return (
    <div className="vehicle-content">
      <div className="container">
        <div className="header">
          <div className="logo">Texicog</div>
          <div className="help">
            <div>Help</div>
          </div>
        </div>
        <div className="main">
          <h1 className="main-text">
            The document you sent isn't the one we
            <br /> requested
          </h1>
          <p className="vehicle-para">
            Please take a new photo. Make sure the document you're sending is
            <br />
            your Vehicle Permit.
          </p>
          <div className="vehicle-signup">
            <label
              htmlFor="fileInput"
              className="custom-file-input  vehicle-button"
            >
              Upload document instead
            </label>

            <input
              type="file"
              id="fileInput"
              onChange={handleFileInputChange}
              className="hidden-file-input"
            />
          </div>
          <div className="vehicle-signup">
            <button
              className="vehicle-button"
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

export default VehiclePermit;
