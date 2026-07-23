import React from "react";
import "../style.css";
import { useADMStore, useACMStore, useIMPStore } from "../store/settings.js";

/* ************************************ */

export default function Settings() {
  const { isIMP, toggleIsIMP } = useIMPStore();
  const { isACM, toggleIsACM } = useACMStore();
  const { isADM, toggleIsADM } = useADMStore();

  return (
    <div>
      <ul style={{ "padding-left": 0 }}>
        <li style={{ display: "inline-block", "margin-right": "20px" }}>
          연속재생{" "}
          {isIMP ? (
            <button id="toggled" onClick={toggleIsIMP}>
              ✓
            </button>
          ) : (
            <button id="toggle" onClick={toggleIsIMP}></button>
          )}
        </li>
        <li style={{ display: "inline-block", "margin-right": "20px" }}>
          재생 중인 노래 교체{" "}
          {isACM ? (
            <button id="toggled" onClick={toggleIsACM}>
              ✓
            </button>
          ) : (
            <button id="toggle" onClick={toggleIsACM}></button>
          )}
        </li>
        <li style={{ display: "inline-block" }}>
          노래 삭제 허용{" "}
          {isADM ? (
            <button id="toggled" onClick={toggleIsADM}>
              ✓
            </button>
          ) : (
            <button id="toggle" onClick={toggleIsADM}></button>
          )}
        </li>
      </ul>
    </div>
  );
}
