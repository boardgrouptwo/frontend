import React from "react";
import "antd/dist/reset.css";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ImageUploader from "./service/imageUploader";
import "@fortawesome/fontawesome-free/js/all.js";
import { legacy_createStore } from "redux";
import reducer from "./components/auth/reducer";
import { Provider } from "react-redux";

const store = legacy_createStore(reducer);

const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App imageUploader={imageUploader} />
    </BrowserRouter>
  </Provider>
);
