import React from "react";
import axios from "axios";

import YouTube from "react-youtube";

export default function MusicPlayer({ videoId }) {
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
