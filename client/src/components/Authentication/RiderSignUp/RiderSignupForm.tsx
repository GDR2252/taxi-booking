import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../../utils/routes";
import Header from "../Header";
import { useFormik } from "formik";
import axios from "axios";
import { axiosAuthInstance } from "../../../helpers/axois";
import AuthApiServices from "../../../helpers/apis/authenticationApiServices";
import { AuthenticationItems } from "../../../utils/enums";
import { TextField } from "@mui/material";
import { ISignUpRequestPayload } from "../../../@types/apis/IAuthServices";
import { useSelector } from "react-redux";
import { authenticaitonItems } from "../../../redux/selectors/authenticationSelector";
import { toast } from "react-toastify";

import "./RiderSignupForm.scss";

const RiderSignupForm = () => {
  const navigate = useNavigate();
  const authSeletor = useSelector(authenticaitonItems);
  const [state, setState] = useState<{
    isSubmitting: boolean;
    errors: string[];
    isLoading: boolean;
  }>({
    isSubmitting: false,
    errors: [],
    isLoading: false,
  });
  const handleSubmit = async (values: { email: string; role: string }) => {
    setState({
      ...state,
      errors: [],
      isSubmitting: true,
    });
    try {
      const authValues: ISignUpRequestPayload = {
        email: values.email,
        role: values.role,
      };
      const res = await AuthApiServices.signup(authValues);

      if (res?.data.success && res?.data.response_code === "CREATE_SUCCESS") {
        localStorage.setItem("access_token", res?.data?.data.access_token);
        axiosAuthInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        localStorage.setItem("userData", JSON.stringify(res?.data?.data?.user));
        navigate(clientRoutes.riderMobileVerification);
        toast.success(res?.data?.message);
      } else if (
        res?.data.success === false &&
        res?.data.response_code === "EXIST_USER"
      ) {
        toast.error(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      role: authSeletor,
    },
    // validationSchema: createProjectValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleLogin = () => {
    navigate(clientRoutes.riderLogin);
  };

  return (
    <div className="signup-content">
      <Header />
      <div className="signup-main-content">
        <div className="email-text">
          What's your phone number or <br />
          email?
        </div>
        <form className="form-container" onSubmit={formik.handleSubmit}>
          <div className="name-input">
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
          <div className="order-signup">
            <button className="order-button" type="submit">
              Sign up
            </button>
          </div>
          <div className="link">
            Already have an account?{" "}
            <span className="login-link" onClick={handleLogin}>
              Sign In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiderSignupForm;
