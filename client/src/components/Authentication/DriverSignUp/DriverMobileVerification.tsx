import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { toast } from "react-toastify";
import AuthApiServices from "../../../helpers/apis/authenticationApiServices";
import { axiosAuthInstance } from "../../../helpers/axois";
import { clientRoutes } from "../../../utils/routes";

import "./DriverMobileVerification.scss";

const DriverMobileVerification: React.FC = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<Array<string | number>>([]);
  const [otp, setOtp] = useState();
  console.log("otp", otp);

  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  console.log("values", values);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0]!.focus();
    }
  }, []);

  const fillData = (index: number, clipData: string[]) => {
    for (let i = index; i < inputs.current.length; i++) {
      if (inputs.current[i]) {
        inputs.current[i]!.value = clipData.shift() || "";
      }
    }
  };

  const hasNoValue = (index: number) => {
    if (values[index] || values[index] === 0) return false;
    return true;
  };

  const handleKeyUp = (event: React.KeyboardEvent, index: number) => {
    const target = event.currentTarget as HTMLInputElement;
    if (event.code === "Backspace" && hasNoValue(index)) {
      if (index > 0) inputs.current[index - 1]!.focus();
    } else if (target.value !== "") {
      index < inputs.current.length - 1
        ? inputs.current[index + 1]!.focus()
        : target.blur();
    }
    const newValues = [...values];
    newValues[index] = target.value;
    setValues(newValues);

    if (newValues.every((value) => value || value === 0)) {
      const joinOtp = newValues.join("");
      setOtp(joinOtp as any);
    }
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (parseInt(target.value) > 10) {
      target.value = (parseInt(target.value) % 10).toString();
    }
  };
  const handlePaste = (event: React.ClipboardEvent, index: number) => {
    event.preventDefault();
    const clipData = (event.clipboardData?.getData("text") || "")
      .split("")
      .slice(0, 4);
    const newValues = [...values];

    for (let i = index; i < index + clipData.length; i++) {
      if (inputs.current[i] && clipData[i - index]) {
        inputs.current[i]!.value = clipData[i - index];
        newValues[i] = clipData[i - index];
      }
    }

    setValues(newValues);
    const lastInputIndex = Math.min(
      index + clipData.length,
      inputs.current.length - 1
    );
    const lastInput = inputs.current[lastInputIndex];
    if (lastInput) {
      lastInput.focus();
    }
  };

  const handleOtpVerify = async (e: any) => {
    e.preventDefault();
    try {
      const res = await AuthApiServices.otpVerify({ otp });
      console.log("res", res?.data.success);

      if (res?.data.success && res?.data.response_code === "VERIFY_SUCCESS") {
        localStorage.setItem("access_token", res?.data?.data.access_token);
        axiosAuthInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        toast.success(res?.data?.message);
        navigate(clientRoutes.driverProfile);
      } else if (
        res?.data.success === false &&
        res?.data?.response_code === "OTP_IS_INCORRECT"
      ) {
        toast.error(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleResendOtpVerify = async (e: any) => {
    e.preventDefault();
    const retrievedUserData = JSON.parse(
      localStorage.getItem("userData") as any
    );
    try {
      const email = retrievedUserData?.email;
      const res = await AuthApiServices.resendOtpVerify({ email });
      if (
        res?.data.success &&
        res?.data.response_code === "VERIFICATION_OTP_SENT"
      ) {
        toast.success(res?.data?.message);
      } else if (
        res?.data.success === false &&
        res?.data.response_code === "USER_NOT_FOUND"
      ) {
        toast.error(res?.data?.message);
      }
      console.log("res", res?.data.success);
    } catch (error: any) {
      toast.success(error);
    }
  };

  return (
    <div className="signup-content">
      <Header />
      <div className="mobile-verification-content">
        <div className="otp-text">
          Enter the 4-digit code sent to your
          <br /> at khushidayani17@gmail.com
        </div>
        <form className="form-container">
          <div className="row">
            <input
              ref={(ref) => (inputs.current[0] = ref)}
              type="number"
              min={0}
              max={9}
              step={1}
              aria-label="first digit"
              onKeyUp={(e) => handleKeyUp(e, 0)}
              onInput={handleInput}
              onPaste={(e) => handlePaste(e, 0)}
            />
            <input
              ref={(ref) => (inputs.current[1] = ref)}
              type="number"
              min={0}
              max={9}
              step={1}
              aria-label="second digit"
              onKeyUp={(e) => handleKeyUp(e, 1)}
              onInput={handleInput}
              onPaste={(e) => handlePaste(e, 1)}
            />
            <input
              ref={(ref) => (inputs.current[2] = ref)}
              type="number"
              min={0}
              max={9}
              step={1}
              aria-label="third digit"
              onKeyUp={(e) => handleKeyUp(e, 2)}
              onInput={handleInput}
              onPaste={(e) => handlePaste(e, 2)}
            />
            <input
              ref={(ref) => (inputs.current[3] = ref)}
              type="number"
              min={0}
              max={9}
              step={1}
              aria-label="fourth digit"
              onKeyUp={(e) => handleKeyUp(e, 3)}
              onInput={handleInput}
              onPaste={(e) => handlePaste(e, 3)}
            />
          </div>
          <div className="mobile-signup" onClick={handleOtpVerify}>
            <button className="mobile-button">Submit</button>
          </div>
          <div className="resend-content" onClick={handleResendOtpVerify}>
            <button className="resend-button">
              I haven't received a code? RESEND
            </button>
          </div>

          <div className="button-container">
            <div className="circle-container">
              <div className="circle">
                <div className="arrow left"></div>
              </div>
            </div>
            <button className="center-button" type="button" disabled>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverMobileVerification;
