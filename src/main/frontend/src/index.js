import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

// d:\work\study\prac\src\main\frontend\src> npm run build
// (react.js 빌드 오류로) java run이 실패한 경우 상단 경로/명령어를 통해 react.js 빌드 과정 중 무슨 오류가 발생한 것인지 알 수 있음.
// 기존 경로의 gradlew clean도 큰 도움이 됨. (JS 재빌드)
