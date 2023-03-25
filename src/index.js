import React from "react";
import "antd/dist/reset.css";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ImageUploader from "./service/imageUploader";
import "@fortawesome/fontawesome-free/js/all.js";
const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App imageUploader={imageUploader} />
  </BrowserRouter>
);
