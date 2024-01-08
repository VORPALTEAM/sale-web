import React from "react";
import ReactDOM from "react-dom/client";
import Model3D from "./model";
import "./style/app.scss";
import Page from "./page";
import { Provider } from "react-redux";
import store from "./state/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Model3D />
      <Page />
    </Provider>
  </React.StrictMode>
);
