import React, { useState } from "react";
import "./Profile.scss";
import { authenticationActions } from "../../../../redux/features/authenticaitonReducer";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  console.log("image", image);

  const handleFileInputChange = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setImage(selectedFile.name);
    }
  };
  const handleSubmit = () => {
    dispatch(
      authenticationActions.updateProfileField({
        profile_photo: image,
      })
    );
  };
  return (
    <div className="profile-main-content">
      <div className="profile-content">
        <div className="container">
          <div className="header">
            <div className="logo">Texicog</div>
            <div className="help">
              <div>Help</div>
            </div>
          </div>
          <div className="profile-main">
            <h1 className="main-text">Take your profile photo</h1>
            <p className="profile-para">
              Your profile photo helps people recognise you. Please note that
              once you <br />
              have submitted your profile photo, it cannot be changed.
            </p>
            <div className="profile-content-text">
              <div className="profile-sub-content">
                1.Face the camera and make sure your eyes and mouth are clearly
                visible
              </div>
              <div className="profile-sub-content">
                2.Make sure the photo is well lit, free of glare and in focus
              </div>
              <div className="profile-sub-content">
                3.No photos of a photo, filters or alterations
              </div>
            </div>
            <div className="profile-image">
              <img src="/images/profile_photo_global.png"></img>
            </div>
            <div className="profile-signup">
              <label
                htmlFor="fileInput"
                className="custom-file-input  profile-button"
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
            <div className="profile-signup">
              <button
                className="profile-button"
                type="submit"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
