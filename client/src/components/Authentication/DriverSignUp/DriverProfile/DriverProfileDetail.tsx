import React, { useState } from "react";
import Header from "../../Header";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useNavigate } from "react-router-dom";
import { clientRoutes } from "../../../../utils/routes";
import { useSelector } from "react-redux";
import { driverDetail } from "../../../../redux/selectors/authenticationSelector";
import AuthApiServices from "../../../../helpers/apis/authenticationApiServices";
import { toast } from "react-toastify";

import "./DriverProfileDetail.scss";

const driverDetailsLinks = [
  { route: clientRoutes.licence, label: "Licence Number" },
  { route: clientRoutes.pancard, label: "Pancard Number" },
  { route: clientRoutes.language, label: "Language" },
  { route: clientRoutes.profile, label: "Profile Photo" },
  { route: clientRoutes.aadharcard, label: "Aadhaar Card" },
  { route: clientRoutes.vehicle, label: "Vehicle Permit" },
];
const DriverProfileDetail = () => {
  const profile = useSelector(driverDetail);
  const navigate = useNavigate();

  const retrievedUserData = JSON.parse(localStorage.getItem("userData") as any);

  const userId = retrievedUserData?._id;

  const values: { [key: string]: any } = {
    user_id: userId,
  };

  profile.forEach((detail: any, index: number) => {
    for (const key in detail) {
      if (detail.hasOwnProperty(key)) {
        values[`${key}`] = detail[key];
      }
    }
  });
  console.log("values", values);

  const handleSubmit = async () => {
    try {
      const res = await AuthApiServices.driverDetail(values as any);
      if (res?.data.success && res?.data.response_code === "CREATE_SUCCESS") {
        navigate(clientRoutes.driverLogin);
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="driverProfile-content">
      <Header />
      <div className="driverProfile-main-content">
        <h1 className="driverProfile-user">Welcome, </h1>
        <div className="driver-title">
          Here's what you need to do to set up your account
        </div>
        {driverDetailsLinks.map((link, index) => (
          <div key={index} className="form-data">
            <Link to={link.route} className="form-data-content">
              <div className="addharcard">{link.label}</div>
              <div className="arrow-icon">
                <ArrowForwardIosIcon />
              </div>
            </Link>
            <div className="line"></div>
          </div>
        ))}
      </div>
      <div className="aadhar-signup" onClick={handleSubmit}>
        <button className="aadhar-button" type="submit">
          Next
        </button>
      </div>
    </div>
  );
};

export default DriverProfileDetail;
