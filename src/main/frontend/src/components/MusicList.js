import React, { useEffect, useState } from "react";
import axios from "axios";
import Music from "./Music";
import MusicPlayer from "./MusicPlayer";
import { useACMStore, useMLRStore } from "../store/settings.js";

function MusicComponent() {
  const [musics, setMusics] = useState([]); //musics와 musics에 값을 할당하는 setMusics
  const { isACM } = useACMStore();
  const { isMLR } = useMLRStore();

  const loadMusicList = (url) => {
    axios
      .get(url)
      .then((response) => {
        setMusics(response.data); //url로 가져오는 데이터를 setMusics에 넣어서 작동
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const url = isACM ? "/musiclist/democ" : "/musiclist";
    loadMusicList(url); //url을 매개로 받아서 전달
  }, [isACM, isMLR]); //둘중 하나라도 바뀌면 재실행(isMLR=음악 삭제 시에 변경됨)

  // sse
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/sse/subscribe");

    eventSource.addEventListener("connect", (event) => {
      console.log("SSE 연결 상태:", event.data);
    });

    eventSource.addEventListener("refresh", (event) => {
      console.log("목록을 갱신합니다.");
      const url = isACM ? "/musiclist/democ" : "/musiclist";
      loadMusicList(url);
    });

    eventSource.onerror = (error) => {
      console.error("SSE 에러 발생:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isACM]);

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
