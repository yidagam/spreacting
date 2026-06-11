import { useState } from "react";
import React from "react";
import axios from "axios";

export default function MusicForm() {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  async function getoEmbedData(value) {
    // get_oEmbed_Data()
    // value를 https://www.youtube.com/oembed?url={value}로 해서
    // title, author_name, thumbnail_url, html 을 받아온다.

    // console.log("getoEmbedData");
    const url = "https://www.youtube.com/oembed?url=";
    var musicData = {};

    try {
      let res = await axios({
        method: "get", // 데이터 요청이므로 get 사용 (맞나?)
        url: url + value, // oEmbed링크 뒤에 사용자가 입력한 url입력
        responseType: "json", // default

        maxContentLength: 2000, // http 응답 내용의 max 사이즈
        validateStatus: function (status) {
          return status >= 200 && status < 300; // default
        },
      });

      // oEmbed페이지에서 받아오는 정보를 data에 할당
      // oEmbed페이지에서 보낸 res 객체 내부의 data에 접근해야 값을 확인할 수 있음.
      // (musicData는 DB에 적재하기 위한 용도)
      var videoId = res.data.thumbnail_url.split("/")[4];
      musicData.url = "https://www.youtube.com/watch?v=" + videoId;
      musicData.videoId = videoId;
      musicData.title = res.data.title;
      musicData.author = res.data.author_name;
      musicData.thumbnail = res.data.thumbnail_url;
      musicData.iframe = res.data.html;

      console.log(res);
      console.log(musicData);
    } catch (err) {
      console.log(err);
      console.log(musicData);

      throw new Error(err);
    }

    return musicData;
  } // getoEmbedData

  async function sendToOracle() {
    // console.log("sendToOracle");
    var musicData = await getoEmbedData(value);

    //폼에 입력한 내용을 인수로 받아서
    //자바 함수 실행시키기 (자바: 전달 받은 값을 db에 저장)
    try {
      // console.log("sendToOracle2");
      let res = await axios({
        method: "Post",
        url: "http://localhost:8080/music",
        data: musicData,
      });
      console.log(res);
      setValue(""); //버튼 누르고 난 뒤 폼 입력창 초기화
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  } // sendToOracle

  return (
    <div /*className="form"*/>
      <input //여기에 작성한 value(url)이 함수로 전달되어야 함
        id="music" //이거 굳이 필요없지 않나?
        value={value}
        placeholder="플레이리스트에 추가할 유튜브 링크를 입력해 주세요."
        onChange={handleInputChange} //OnChange에 set{} 함수 들어가야함
      />
      &nbsp;
      <button
        className="create-button"
        onClick={sendToOracle} //폼에 작성한 내용이 함수를 거쳐 자바(db)로 전송
      >
        추가
      </button>
    </div>
  );
}
