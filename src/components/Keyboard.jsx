import { GlobalState } from "./../stores/StateStore";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { BsFillCheckCircleFill, BsFillBackspaceFill } from "react-icons/bs";

export default function Keyboard({ onCheckWord }) {
  const round = GlobalState.useState((s) => s.round);
  const wordList = GlobalState.useState((s) => s.wordList);
  const hints = GlobalState.useState((s) => s.hints);
  const darkMode = GlobalState.useState((s) => s.darkMode);

  function filterHints(letter) {
    const letterInHints = [];

    hints.forEach((hint) => {
      hint.forEach((digit) => {
        if (digit.letter === letter) {
          letterInHints.push(digit.hint);
        }
      });
    });

    const uniqueLetterInHints = [...new Set(letterInHints)];

    return uniqueLetterInHints.includes(1)
      ? "btn-success text-light"
      : uniqueLetterInHints.includes(2)
      ? "btn-warning text-dark"
      : uniqueLetterInHints.includes(0)
      ? `btn-dark ${darkMode && "btn-outline-secondary"}`
      : "btn-outline-secondary";
  }

  if (!useDetectKeyboardOpen())
    return (
      <div
        className="container"
        style={{
          position: "absolute",
          bottom: "4rem",
        }}
      >
        {[
          ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
          ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
          ["Enter", "Y", "X", "C", "V", "B", "N", "M", "Back"],
        ].map((row, i) => {
          return (
            <div key={`${row}_${i}`} className="row mb-1">
              {row.map((letter, j) => {
                return (
                  <button
                    key={`${letter}_${j}`}
                    className={`col mx-1 btn ${
                      letter !== "Enter" &&
                      letter !== "Back" &&
                      filterHints(letter)
                    } ${
                      letter === "Enter"
                        ? "btn-primary"
                        : letter === "Back"
                        ? "btn-danger"
                        : darkMode
                        ? "btn-secondary text-light"
                        : "btn-outline-secondary"
                    } px-2`}
                    onClick={() => {
                      if (letter === "Enter") {
                        onCheckWord();
                      } else if (letter === "Back") {
                        GlobalState.update((s) => {
                          s.wordList[round].pop();
                        });
                      } else {
                        if (wordList[round].length < 5)
                          GlobalState.update((s) => {
                            s.wordList[round].push(letter);
                          });
                      }
                    }}
                    disabled={
                      (letter === "Enter" && wordList[round].length < 5) ||
                      (letter === "Back" && wordList[round].length === 0)
                    }
                  >
                    {letter === "Enter" && <BsFillCheckCircleFill />}
                    {letter === "Back" && <BsFillBackspaceFill />}
                    {letter !== "Enter" && letter !== "Back" && letter}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    );
}
