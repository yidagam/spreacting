import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import YouTube from "react-youtube";
import { useIMPStore, useMLRStore } from "../store/settings.js";

let globalIsActivated = false;

export default function MusicPlayer({
  videoId,
  thumbnail,
  title,
  author,
  duration,
}) {
  //사용자 동작 감지
  // eslint-disable-next-line no-unused-vars
  const [isActivated, setIsActivated] = useState(false);
  const { isIMP } = useIMPStore();
  const { toggleIsMLR } = useMLRStore();

  //사용자 동작 감지 시에만 컴포넌트가 작동하도록 함
  useEffect(() => {
    if (globalIsActivated) return;

    const handleUserGesture = () => {
      setIsActivated(true);
      globalIsActivated = true;
      window.removeEventListener("click", handleUserGesture);
    };
    window.addEventListener("click", handleUserGesture);
    return () => window.removeEventListener("click", handleUserGesture);
  }, []);

  const playerOpened = async () => {
    // 재생 중인 노래 isPlaying=true 설정
    // eslint-disable-next-line no-unused-vars
    let res = await axios({
      method: "Post",
      url: "http://localhost:8080/musicplayer/open",
      data: { video_id: videoId },
    });

    console.log("playerOpened");
    console.log(res);
  };

  const playerClosed = async () => {
    // 다음노래 재생
    let url = isIMP ? "/repeat" : "/close";

    // eslint-disable-next-line no-unused-vars
    let res = await axios({
      method: "Post",
      url: "http://localhost:8080/musicplayer" + url,
      data: { video_id: videoId },
    });

    console.log("playerClosed");
    console.log(res);
    toggleIsMLR(); //musicList 리-렌더링
  };

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  // 사용자 동작이 감지되지 않았을 때에는 유튜브 태그(음원재생기능) 리턴하지 않음
  if (!globalIsActivated) {
    return (
      <div>
        <music-card className="playing">
          <cd-wrapper>
            <img
              className="staticIMG"
              id="img"
              src={thumbnail}
              width="144"
              height="108"
              alt={title}
            />
          </cd-wrapper>
          <music-info>
            <span className="title">{title}</span>
            <span className="author">―― {author}</span>
            {parseInt(duration / 60)}:{duration % 60}
          </music-info>
        </music-card>
      </div>
    );
  }

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={playerOpened}
        onEnd={playerClosed}
      />
      <music-card
        className="playing"
        style={{ backgroundColor: "rgb(233 233 233)" }}
      >
        <cd-wrapper>
          <img
            className="playingIMG"
            id="img"
            src={thumbnail}
            width="144"
            height="108"
            alt={title}
          />
        </cd-wrapper>
        <music-info>
          <span className="title">{title}</span>
          <span className="author">―― {author}</span>
          {parseInt(duration / 60)}:{duration % 60}
        </music-info>
      </music-card>
    </div>
  );
}
