import React from "react";
import "./Licence.scss";

interface LicenceFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const LicenceField: React.FC<LicenceFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <div className="input-main-licence">
      <div className="text-main">Licence number</div>
      <input
        type="text"
        id="licence"
        placeholder="DL0000000000"
        onChange={handleChange}
        pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
        title="Licence card number should be in the format XXXX XXXX XXXX"
        maxLength={14}
      />
    </div>
  );
};

export default LicenceField;
