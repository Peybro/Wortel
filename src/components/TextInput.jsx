import { useState, useEffect } from "react";
import { GlobalState } from "./../stores/StateStore";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

import arrows from "./../assets/arrows.gif";

export default function TextInput({ index, rowNum, onInput, onCheckWord }) {
  const round = GlobalState.useState((s) => s.round);
  const wordList = GlobalState.useState((s) => s.wordList);
  const hints = GlobalState.useState((s) => s.hints);
  const darkMode = GlobalState.useState((s) => s.darkMode);

  const [letter, setLetter] = useState("");

  useEffect(() => {
    onInput(letter.length > 1 ? letter.slice(-1) : letter);
  }, [letter]);

  return (
    <>
      {rowNum === 0 &&
        index === 0 &&
        !useDetectKeyboardOpen() &&
        !darkMode &&
        [...wordList[rowNum]].every((l) => l === "") && (
          <img
            alt="arrows showing where to begin"
            src={arrows}
            style={{
              position: "absolute",
              transform: "translate(-32%,-70%) scale(50%)",
            }}
          />
        )}
      <input
        type="text"
        id={`input-${rowNum}_${index}`}
        className={`text-center form-control ${
          hints[rowNum] === undefined ? "text-dark" : "text-light"
        } ${
          hints[rowNum] !== undefined &&
          (hints[rowNum][index] === undefined
            ? "bg-light"
            : hints[rowNum][index].hint === 2
            ? "bg-warning"
            : hints[rowNum][index].hint === 1
            ? "bg-success"
            : "bg-dark")
        } bg-gradient`}
        value={wordList[rowNum][index] ? wordList[rowNum][index] : ""}
        onInput={(e) => {
          setLetter(e.target.value.toUpperCase());
          if (index < 4 && e.target.value !== "")
            document.getElementById(`input-${rowNum}_${index + 1}`).focus();
        }}
        onKeyDown={(e) => {
          if (
            index === 4 &&
            e.key === "Enter" &&
            !wordList[rowNum].includes("")
          )
            onCheckWord();
          if (index > 0 && e.key === "Backspace" && letter === "") {
            document.getElementById(`input-${rowNum}_${index - 1}`).focus();
          }
        }}
        disabled={rowNum !== round}
      />
    </>
  );
}
