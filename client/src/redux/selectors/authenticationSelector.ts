import { ReduxStoreType } from "../features/rootReducer";

export const authenticaitonItems = (state: ReduxStoreType) =>
  state.authentication.role;

export const driverDetail = (state: ReduxStoreType) =>
  state.authentication.profileDetails;
