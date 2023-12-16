import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  // blacklist: ["widgetList",  "timeTrackerWidget","projects"],
  blacklist: ["settings"],
  key: "dashboard-redux-root-state",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
