import React from "react";
import "../style.css";
import { useState } from "react";

let globalInfinitePlay = false;
let globalAllowChange = false;

// set/get Global-Infinite-Play
export function setGIP(b) {
  globalInfinitePlay = b;
  console.log("globalInfinitePlay: " + b);
}
export function getGIP() {
  return globalInfinitePlay;
}

// set/get Global-Allow-Change-(Music)
export function setGAC(b) {
  globalAllowChange = b;
  console.log("globalAllowChange: " + b);
}
export function getGAC() {
  return globalAllowChange;
}

/* ************************************ */

export default function Settings() {
  // eslint-disable-next-line no-unused-vars
  const [rerender, setRerender] = useState();
  // eslint-disable-next-line no-unused-vars
  const [rerender2, setRerender2] = useState();

  const onClickGIP = (b) => {
    setGIP(b);
    setRerender(b);
  };

  const onClickGAC = (b) => {
    setGAC(b);
    setRerender2(b);
  };

  return (
    <div>
      <ul style={{ "padding-left": 0 }}>
        <li style={{ display: "inline-block", "margin-right": "20px" }}>
          연속재생{" "}
          {globalInfinitePlay ? (
            <button id="toggled" onClick={() => onClickGIP(false)}>
              ✓
            </button>
          ) : (
            <button id="toggle" onClick={() => onClickGIP(true)}></button>
          )}
        </li>
        <li style={{ display: "inline-block" }}>
          재생 중인 노래 교체{" "}
          {globalAllowChange ? (
            <button id="toggled" onClick={() => onClickGAC(false)}>
              ✓
            </button>
          ) : (
            <button id="toggle" onClick={() => onClickGAC(true)}></button>
          )}
        </li>
      </ul>
    </div>
  );
}
