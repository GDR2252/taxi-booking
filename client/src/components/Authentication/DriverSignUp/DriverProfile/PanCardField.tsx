import React, { useState } from "react";
import "./PanCardField.scss";

interface AadharCardFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const PanCardField: React.FC<AadharCardFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue
      .replace(/[^\d]/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    onChange(formattedValue);
  };

  return (
    <div className="input-main-pancard">
      <div className="text-main">Pancard number</div>
      <input
        type="text"
        id="panCard"
        placeholder="0000 0000 0000"
        value={value}
        onChange={handleChange}
        pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
        title="Aadhar card number should be in the format XXXX XXXX XXXX"
        maxLength={14}
      />
    </div>
  );
};

export default PanCardField;
