import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../../utils/routes";
import Header from "../Header";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import AuthApiServices from "../../../helpers/apis/authenticationApiServices";
import { IProfileRequestPayload } from "../../../@types/apis/IAuthServices";

import "./DriverProfile.scss";

const DriverProfile = () => {
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
  const handleSubmit = async (values: {
    first_name: string;
    last_name: string;
  }) => {
    setState({
      ...state,
      errors: [],
      isSubmitting: true,
    });
    try {
      const retrievedUserData = JSON.parse(
        localStorage.getItem("userData") as any
      );
      const userId = retrievedUserData?._id;

      const Values: IProfileRequestPayload = {
        user_id: userId,
        first_name: values.first_name,
        last_name: values.last_name,
      };
      const res = await AuthApiServices.driverProfile(Values);
      if (res?.data.success && res?.data.response_code === "CREATE_SUCCESS") {
        navigate(clientRoutes.driverProfileDetail);
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
    },
    // validationSchema: createProjectValidationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="driver-profile-main-content">
      <Header />
      <div className="profile-content">
        <div className="text">What's your name?</div>
        <div className="text-profile">
          Let us know how to properly address you
        </div>
      </div>
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div className="name-profile-input">
          <TextField
            hiddenLabel
            placeholder="Enter First here"
            InputLabelProps={{
              shrink: true,
              className: "selector-lable-name",
            }}
            name="first_name"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            fullWidth
            helperText={formik.errors.first_name}
            error={
              Boolean(formik.errors.first_name) &&
              Boolean(formik.touched.first_name)
            }
          />
        </div>
        <div className="name-profile-input">
          <TextField
            hiddenLabel
            placeholder="Enter Last here"
            InputLabelProps={{
              shrink: true,
              className: "selector-lable-name",
            }}
            name="last_name"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            fullWidth
            helperText={formik.errors.last_name}
            error={
              Boolean(formik.errors.last_name) &&
              Boolean(formik.touched.last_name)
            }
          />
        </div>
        <div className="order-signup">
          <button className="order-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverProfile;
