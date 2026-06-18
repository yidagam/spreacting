import React from "react";
import ReactDOM from "react-dom/client";
import MusicList from "./components/MusicList";
import MusicForm from "./components/MusicForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MusicForm />
    <MusicList />
  </React.StrictMode>
);
