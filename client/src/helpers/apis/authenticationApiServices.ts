import {
  IDriverDetailRequestPayload,
  ILoginOtpVerifyRequestPayload,
  IOtpVerifyRequestPayload,
  IProfileRequestPayload,
  IResendOtpVerifyRequestPayload,
  IRiderSignInRequestPayload,
  ISignUpRequestPayload,
} from "../../@types/apis/IAuthServices";
import { IApiResponse } from "../IApis";
import { axiosAuthInstance } from "../axois";
import { jsonToForm } from "../helpers";
import { AxiosResponse, CancelTokenSource } from "axios";

class AuthApiServices {
  static signup = async (
    values: ISignUpRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/user/signUp", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
  static otpVerify = async (
    values: IOtpVerifyRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/user/signUp/verify-otp", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
  static resendOtpVerify = async (
    values: IResendOtpVerifyRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/user/resend-otp", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
  static profile = async (
    values: IProfileRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/user/rider/profile", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
  static driverProfile = async (
    values: IProfileRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/user/driver/profile", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
  static signIn = async (
    values: IRiderSignInRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/user/signIn", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
  static loginOtpVerify = async (
    values: ILoginOtpVerifyRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/user/signIn/verify-otp", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
  static driverDetail = async (
    values: IDriverDetailRequestPayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post(
      "/user/driver/profile-detail",
      formValues,
      {
        cancelToken: cancelToken?.token,
      }
    );
  };
}

export default AuthApiServices;
