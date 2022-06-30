import { useState, useEffect } from "react";
import { GlobalState } from "./../stores/StateStore";

import TextInput from "./TextInput";

export default function Row({ rowNum, onCheckWord }) {
  const round = GlobalState.useState((s) => s.round);
  const secretWord = GlobalState.useState((s) => s.secretWord);

  const [word, setWord] = useState("");

  const [firstLetter, setFirstLetter] = useState("");
  const [secondLetter, setSecondLetter] = useState("");
  const [thirdLetter, setThirdLetter] = useState("");
  const [fourthLetter, setFourthLetter] = useState("");
  const [fifthLetter, setFifthLetter] = useState("");

  useEffect(() => {
    GlobalState.update((s) => {
      s.wordList[round] = word.split("");
    });
  }, [word]);

  useEffect(() => {
    setWord(
      firstLetter + secondLetter + thirdLetter + fourthLetter + fifthLetter
    );
  }, [firstLetter, secondLetter, thirdLetter, fourthLetter, fifthLetter]);

  useEffect(() => {
    setFirstLetter("");
    setSecondLetter("");
    setThirdLetter("");
    setFourthLetter("");
    setFifthLetter("");
  }, [secretWord]);

  return (
    <div className="input-group mb-1">
      {Array(5)
        .fill(0)
        .map((letter, i) => {
          return (
            <TextInput
              key={`textInput_${i}`}
              index={i}
              rowNum={rowNum}
              onInput={(val) => {
                if (i === 0) setFirstLetter(val);
                if (i === 1) setSecondLetter(val);
                if (i === 2) setThirdLetter(val);
                if (i === 3) setFourthLetter(val);
                if (i === 4) setFifthLetter(val);
              }}
              onCheckWord={() => onCheckWord()}
            />
          );
        })}
    </div>
  );
}
