import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./LanguageField.scss";

const languageOptions = [
  "English",
  "German",
  "Spanish",
  "French",
  "Italian",
  "Russian",
];

const LanguageField = ({ onLanguageChange }: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageChange = (event: any, newValue: any) => {
    setSelectedLanguage(newValue);
    onLanguageChange(newValue);
  };

  return (
    <div className="language-autocomplete">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={languageOptions}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select.."
            className="selector-input"
          />
        )}
      />
    </div>
  );
};

export default LanguageField;
