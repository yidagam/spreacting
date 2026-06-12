import React, { useState, useEffect } from "react";
import axios from "axios";
import Music from "./Music";

export default function MusicList() {
  const [musics, setMusics] = useState([]); // 배열로 전달되므로 배열로 저장

  useEffect(() => {
    //백엔드와 통신하는 코드
    axios
      .get("/musiclist")
      .then((response) => {
        setMusics(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <ul>
        {musics.map((music, index) => (
          <Music key={index} {...music} />
        ))}
      </ul>
    </div>
  );
}
