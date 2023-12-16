import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PersistedIndex from "./PersistedIndex";

import "./index.css";
// import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <PersistedIndex>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PersistedIndex>
);
