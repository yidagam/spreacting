import React from "react";

import MusicList from "./components/MusicList";
import MusicForm from "./components/MusicForm";
import Settings from "./components/Settings";

export default function App() {
  return (
    <>
      <Settings />
      <MusicForm />
      <MusicList />
    </>
  );
}
