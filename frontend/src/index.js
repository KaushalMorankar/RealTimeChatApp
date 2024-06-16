import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Authcontextprovider } from "./context/Authcontext"; // Correct import
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Authcontextprovider>
      <App />
    </Authcontextprovider>
  </BrowserRouter>,
  document.getElementById("root")
);
