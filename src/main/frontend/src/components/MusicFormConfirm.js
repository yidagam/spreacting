import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import "../style.css";

export default function MusicFormConfirm({ data }) {
  // 영상 길이 저장
  const [duration, setDuration] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setIsClosed(false);
  }, [data.videoId]);

  async function sendToOracle() {
    console.log("sendToOracle");

    const musicData = {
      ...data,
      duration: duration,
    };

    //폼에 입력한 내용을 인수로 받아서
    //자바 함수 실행시키기 (자바: 전달 받은 값을 db에 저장)
    try {
      console.log("sendToOracle2");

      // eslint-disable-next-line no-unused-vars
      let res = await axios({
        method: "Post",
        url: "http://localhost:8080/musicform",
        data: musicData,
      });
      console.log(res); //이걸 주석처리하면 상단 eslint~ 주석을 반드시 설정해야함
      //   setValue(""); //버튼 누르고 난 뒤 폼 입력창 초기화
      setIsClosed(true);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }

    return musicData;
  } // sendToOracle

  const opts = {
    height: "195",
    width: "320",
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };

  const handlePlayerReady = (event) => {
    const player = event.target; //유튜브 플레이어 인스턴스 객체
    setDuration(player.getDuration());
  };

  const deleteVideo = () => {
    setIsClosed(true);
  };

  if (isClosed) {
    return null;
  }

  return (
    <div>
      <music-card>
        {/* react-youtube 라이브러리의 컴포넌트입니다. */}
        <YouTube
          videoId={data.videoId}
          opts={opts}
          onReady={handlePlayerReady}
        />

        <music-info style={{ width: "415px" }}>
          <span className="title">{data.title}</span>
          <span className="author">{data.author}</span>
          {parseInt(duration / 60)}분 {duration % 60}초
          <br />
          {duration >= 600 ? (
            <warn style={{ color: "red" }}>
              음원의 길이를 다시 한 번 확인해 주세요.
            </warn>
          ) : null}
          <button onClick={sendToOracle}>추가</button>
          <button onClick={deleteVideo}>취소</button>
        </music-info>
      </music-card>
    </div>
  );
}
