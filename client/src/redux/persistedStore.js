import persistStore from "redux-persist/lib/persistStore";
import { store } from "./store";

export const persistedStore = persistStore(store)