import React from "react";
import axios from "axios";
import "../style.css";
import { useADMStore, useMLRStore } from "../store/settings.js";

export default function Music({
  videoId,
  thumbnail,
  title,
  author,
  duration,
  votes,
}) {
  const { isADM } = useADMStore();
  const { toggleIsMLR } = useMLRStore();

  async function PlusVotes() {
    // 이거 수정할 거면 MusicController.java랑 같이 보면서 수정해야됨 (특히 parameter...)

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

  async function DeleteMusic() {
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("정말 삭제하시겠습니까?");

    if (isConfirm) {
      // eslint-disable-next-line no-unused-vars
      let res = await axios({
        method: "Post",
        url: "http://localhost:8080/deletemusic",
        data: { video_id: videoId },
      });
      toggleIsMLR(); //musicList 리-렌더링
    }
  }

  return (
    <div>
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
      {isADM ? <button onClick={() => DeleteMusic()}>X</button> : ""}
    </div>
  );
}
