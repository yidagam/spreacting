import React from "react";
// import { useEffect, useState } from "react";
import axios from "axios";
// import MusicReload from "./MusicList";
import "../style.css";

export default function Music({
  videoId,
  thumbnail,
  title,
  author,
  duration,
  votes,
}) {
  // const [voteDynamic, setVoteDynamic] = useState(votes);

  async function PlusVotes() {
    // const const_vote = votes + 1;
    // setVoteDynamic(voteDynamic + 1);
    //MusicController.java랑 같이 보면서 수정해야됨 (특히 parameter...)
    // eslint-disable-next-line no-unused-vars
    let res = await axios({
      method: "Post",
      url: "http://localhost:8080/musicvotes",
      data: { video_id: videoId },
    });

    // console.log(res);
    // window.location.reload(); // 화면이 깜빡이며 새로고침됨.
    // MusicReload();
  }

  return (
    // eslint-disable-next-line react/style-prop-object
    <music-card>
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
      <vote-button>
        <button className="vote-button" onClick={() => PlusVotes()}>
          {votes}
        </button>
      </vote-button>
    </music-card>
  );
}
