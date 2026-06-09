import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MusicForm from "./MusicForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <MusicForm />
  </React.StrictMode>
);
