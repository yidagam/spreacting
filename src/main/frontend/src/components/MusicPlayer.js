import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import YouTube from "react-youtube";

export default function MusicPlayer({ videoId }) {
  //사용자 동작 감지
  const [isActivated, setIsActivated] = useState(false);

  //사용자 동작 감지 시에만 컴포넌트가 작동하도록 함
  useEffect(() => {
    const handleUserGesture = () => {
      setIsActivated(true);
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

    // console.log(res);
  };

  const playerClosed = async () => {
    // 다음노래 재생
    // eslint-disable-next-line no-unused-vars
    let res = await axios({
      method: "Post",
      url: "http://localhost:8080/musicplayer/close",
      data: { video_id: videoId },
    });

    // console.log(res);
  };

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  // 사용자 동작이 감지되지 않았을 때에는 아무것도 리턴하지 않음
  if (!isActivated) {
    return "";
  }

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={playerOpened}
        onEnd={playerClosed}
      />
    </div>
  );
}
