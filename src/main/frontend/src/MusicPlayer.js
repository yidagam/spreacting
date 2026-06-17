import React from "react";
import axios from "axios";

import YouTube from "react-youtube";

export default function MusicPlayer({ videoId }) {
  const playerClosed = async () => {
    // 다음노래 재생

    let res = await axios({
      method: "Post",
      url: "http://localhost:8080/musicplayer",
      data: { video_id: videoId },
    });

    console.log(res);
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
      <YouTube videoId={videoId} opts={opts} onReady={} onEnd={playerClosed} />
    </div>
  );
}
