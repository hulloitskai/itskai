import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";

const el = document.getElementById("root");
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
