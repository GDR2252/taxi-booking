import { combineReducers } from "@reduxjs/toolkit";
  // import { leftSidebarReducer } from "./leftSidebarSlice";
// import { projectListReducer, projectListSaga } from "./projectsSlice";
// import { timeTrackWidgetReducer } from "./timeTrackerWidget/timeTrackWidgetSlice";
// import { widgetListReducer } from "./widgetListSlice";
import { all } from "redux-saga/effects";
import { authenticationReducer } from "./authenticaitonReducer";
// import { timeTrackReducer, timeTrackSaga } from "./TimeTrackLeftMenuSlice";
// import { browserReducer } from "./browserSlice";
// import { settingsReducer } from "./settingsSlice";

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

export function* rootSaga() {
  //   yield all([projectListSaga(), timeTrackSaga()]);
} 

export type ReduxStoreType = ReturnType<typeof rootReducer>;
