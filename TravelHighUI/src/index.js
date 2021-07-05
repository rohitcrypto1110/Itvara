import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppComp from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

ReactDOM.render(<AppComp />, document.getElementById("root"));

registerServiceWorker();