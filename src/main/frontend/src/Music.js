import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Music({ title, author, thumbnail, votes }) {
  // 데이터가 배열 형태로 들어오므로 초기값을 빈 배열([])로 설정합니다.
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    axios
      .get("/music")
      .then((response) => {
        // 백엔드에서 받아온 배열 데이터를 상태에 저장합니다.
        setMusics(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>뮤-직</h2>
      <ul>
        {musics.map((example, index) => (
          <li key={index}>
            {/* 오라클 테이블의 컬럼명이 대문자이므로 key값도 대문자로 접근해야 합니다. */}
            이름: {example.name} / 이메일: {example.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
