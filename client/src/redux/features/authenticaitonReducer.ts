import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthenticationPayload {
  role: string;
  profileDetails: {
    licence_number?: string;
    pancard_number?: string;
    pancard_image?: string;
    language?: string;
    profile_photo?: string;
    addhar_card?: string;
    addharCard_image?: string;
    vehicle_permit?: string;
  }[];
}
const initialState: IAuthenticationPayload = {
  role: "",
  profileDetails: [],
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    roleItems: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    updateProfileField: (state, action: PayloadAction<any>) => {
      const updatedField = action.payload;

      if (!Array.isArray(state.profileDetails)) {
        state.profileDetails = [];
      }

      state.profileDetails.push(updatedField);
    },
    clearProfileDetails: (state) => {
      state.profileDetails = [];
    },
  },
});

export const authenticationActions = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
