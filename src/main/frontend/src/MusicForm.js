import { useState } from "react";
import React from "react";
import axios from "axios";

export default function MusicForm() {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  async function sendToOracle() {
    //폼에 입력한 내용을 인수로 받아서
    //자바 함수 실행시키기 (자바: 전달 받은 값을 db에 저장)
    try {
      let res = await axios({
        method: "Post",
        url: "http://localhost:8080/music",
        data: { music: value },
      });
      console.log(res);
      setValue("");
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  return (
    <div className="form">
      <input //여기에 작성한 value(url)이 함수로 전달되어야 함
        id="url"
        value={value}
        placeholder="플레이리스트에 추가할 유튜브 링크를 입력해 주세요."
        onChange={handleInputChange} //OnChange에 set{} 함수 들어가야함
      />
      &nbsp;
      <button
        className="create-button"
        onClick={sendToOracle} //폼에 작성한 내용을 자바(db)로 전송
      >
        추가
      </button>
    </div>
  );
}
