import React, { useState } from "react";
import LanguageField from "./LanguageField";
import { authenticationActions } from "../../../../redux/features/authenticaitonReducer";
import { useDispatch } from "react-redux";

import "./Language.scss";

const Language = () => {
  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageChange = (selectedLanguage: string) => {
    setSelectedLanguage(selectedLanguage);

    dispatch(
      authenticationActions.updateProfileField({
        language: selectedLanguage,
      })
    );
  };
  return (
    <div className="language-content">
      <div className="container">
        <div className="header">
          <div className="logo">Texicog</div>
          <div className="help">
            <div>Help</div>
          </div>
        </div>
        <div className="main">
          <h1 className="main-text">Select your language</h1>
          <p className="language-para">
            You can change your language on this screen or at any time in Help.
          </p>
          <div className="language-field">
            <LanguageField onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
