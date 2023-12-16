import React, { useState } from "react";
import { clientRoutes } from "../../../utils/routes";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { IRiderSignInRequestPayload } from "../../../@types/apis/IAuthServices";
import { toast } from "react-toastify";
import AuthApiServices from "../../../helpers/apis/authenticationApiServices";
import { axiosAuthInstance } from "../../../helpers/axois";
import { useNavigate } from "react-router-dom";

import "./DriverLogin.scss";

const DriverLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    isSubmitting: boolean;
    errors: string[];
    isLoading: boolean;
  }>({
    isSubmitting: false,
    errors: [],
    isLoading: false,
  });
  const handleSubmit = async (values: { email: string }) => {
    setState({
      ...state,
      errors: [],
      isSubmitting: true,
    });
    try {
      const authValues: IRiderSignInRequestPayload = {
        email: values.email,
        role: "driver",
      };
      const res = await AuthApiServices.signIn(authValues);
      if (res?.data.success && res?.data.response_code === "LOGIN_SUCCESS") {
        localStorage.setItem("access_token", res?.data?.data.access_token);
        axiosAuthInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        navigate(clientRoutes.driverLoginMobileVerification);
        toast.success(res?.data?.message);
      }
      if (
        res?.data.success === false &&
        res?.data.response_code === "USER_NOT_FOUND"
      ) {
        toast.success(res?.data?.message);
      }
    } catch (error: any) {}
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // validationSchema: createProjectValidationSchema,
    onSubmit: handleSubmit,
  });
  const handleSignup = () => {
    navigate(clientRoutes.driverSignUp);
  };
  return (
    <div className="driver-login-content">
      <div className="signup-header-content">
        <div className="signup-header">
          <div className="header-logo">Texicog</div>
        </div>
      </div>
      <div className="signup-main-content">
        <div className="email-text">
          What's your phone number or <br />
          email?
        </div>
        <form className="form-container" onSubmit={formik.handleSubmit}>
          <div className="name-rider-login-input">
            <TextField
              hiddenLabel
              placeholder="Enter email here"
              InputLabelProps={{
                shrink: true,
                className: "selector-lable-name",
              }}
              name="email"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.email}
              fullWidth
              helperText={formik.errors.email}
              error={
                Boolean(formik.errors.email) && Boolean(formik.touched.email)
              }
            />
          </div>
          <div className="signin-button">
            <button className="signin-button" type="submit">
              Sign in
            </button>
          </div>
          <div className="link">
            Don't have an account?{" "}
            <span className="login-link" onClick={handleSignup}>
              Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverLogin;
