import React, { useEffect, useState } from "react";
import axios from "axios";
import Music from "./Music";
import MusicPlayer from "./MusicPlayer";

function MusicComponent() {
  const [musics, setMusics] = useState([]);

  const loadMusicList = () => {
    axios
      .get("/musiclist")
      .then((response) => {
        setMusics(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadMusicList();
  }, []);

  // sse
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/sse/subscribe");

    eventSource.addEventListener("connect", (event) => {
      console.log("SSE 연결 상태:", event.data);
    });

    eventSource.addEventListener("refresh", (event) => {
      console.log("목록을 갱신합니다.");
      loadMusicList();
    });

    eventSource.onerror = (error) => {
      console.error("SSE 에러 발생:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {musics.map((music, index) =>
        index === 0 ? (
          <MusicPlayer key={music.videoId} {...music} />
        ) : (
          <ul>
            <Music key={music.videoId} {...music} />
          </ul>
        )
      )}
    </div>
  );
}

export default MusicComponent;
