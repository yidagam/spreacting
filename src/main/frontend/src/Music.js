import React from "react";
import axios from "axios";

export default function Music({
  videoId,
  thumbnail,
  title,
  author,
  duration,
  votes,
}) {
  async function PlusVotes() {
    // const const_vote = votes + 1;

    //MusicController.java랑 같이 보면서 수정해야됨 (특히 parameter...)
    // eslint-disable-next-line no-unused-vars
    let res = await axios({
      method: "Post",
      url: "http://localhost:8080/musicvotes",
      data: { video_id: videoId },
    });

    console.log(res);
  }

  return (
    <div>
      <img id="img" src={thumbnail} width="144" height="108" alt={title} />
      <div>
        제목: {title}
        <br />
        채널명: {author}
        <br />
        길이: {parseInt(duration / 60)}분 {duration % 60}초 // {videoId}
        <br />
        추천수: <button onClick={PlusVotes}>{votes}</button>
      </div>
    </div>
  );
}
