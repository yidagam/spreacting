import React from "react";
import ReactDOM from "react-dom/client";
import MusicList from "./components/MusicList";
import MusicForm from "./components/MusicForm";
import Settings from "./components/Settings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Settings />
    <MusicForm />
    <MusicList />
  </React.StrictMode>
);
