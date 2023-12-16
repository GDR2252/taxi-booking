export interface ISignUpRequestPayload {
  email: string;
  role: string;
}

export interface IOtpVerifyRequestPayload {
  otp: any;
}

export interface IResendOtpVerifyRequestPayload {
  email: string;
}

export interface IProfileRequestPayload {
  user_id: any;
  first_name: string;
  last_name: string;
}

export interface IRiderSignInRequestPayload {
  email: string;
  role?: string;
}

export interface ILoginOtpVerifyRequestPayload {
  otp: any;
}

export interface IDriverDetailRequestPayload {
  user_id: any;
  licence_number: any;
  dob: string;
  pancard_number: any;
  language: string;
  profile_photo: any;
  addhar_card: any;
  vehicle_permit: any;
}
