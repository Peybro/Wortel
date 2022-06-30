import { useState, useEffect } from "react";
import { GlobalState } from "./stores/StateStore";
import { isMobile } from "react-device-detect";

import "./styles/App.css";

import HowTo from "./components/HowTo";
import Row from "./components/Row";
import Keyboard from "./components/Keyboard";
import NewGame from "./components/NewGame";

import wordListRaw from "./wordList";
const wordList = wordListRaw.split(" ");

export default function App() {
  const round = GlobalState.useState((s) => s.round);
  const userWordList = GlobalState.useState((s) => s.wordList);
  const darkMode = GlobalState.useState((s) => s.darkMode);
  const secretWord = GlobalState.useState((s) => s.secretWord);

  const [showKeyboard, setShowKeyboard] = useState(isMobile);

  const [finish, setFinish] = useState(false);
  const [wordFound, setWordFound] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  function newGame() {
    setFinish(false);
    setWordFound(false);
    GlobalState.update((s) => {
      s.round = 0;
      s.wordList = [[], [], [], [], [], []];
      s.hints = [];
      s.secretWord =
        wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    });
  }

  /**
   * Sets hints that are used to show the colors.
   *
   * 0: white - letter not in secret word included
   * 1: green - letter at correct digit
   * 2: yellow - letter included in secret word but wrong digit
   */
  function checkWord() {
    const word = userWordList[round];

    // TODO: just show one yellow letter if word contains it just once as well
    GlobalState.update((s) => {
      s.hints.push([
        {
          letter: word[0],
          hint:
            word[0] === secretWord[0]
              ? 1
              : secretWord.includes(word[0])
              ? 2
              : 0,
        },
        {
          letter: word[1],
          hint:
            word[1] === secretWord[1]
              ? 1
              : secretWord.includes(word[1])
              ? 2
              : 0,
        },
        {
          letter: word[2],
          hint:
            word[2] === secretWord[2]
              ? 1
              : secretWord.includes(word[2])
              ? 2
              : 0,
        },
        {
          letter: word[3],
          hint:
            word[3] === secretWord[3]
              ? 1
              : secretWord.includes(word[3])
              ? 2
              : 0,
        },
        {
          letter: word[4],
          hint:
            word[4] === secretWord[4]
              ? 1
              : secretWord.includes(word[4])
              ? 2
              : 0,
        },
      ]);
    });

    if (
      // word.every((letter,i)=>{
      //   letter === secretWord[i]
      // })
      word[0] === secretWord[0] &&
      word[1] === secretWord[1] &&
      word[2] === secretWord[2] &&
      word[3] === secretWord[3] &&
      word[4] === secretWord[4]
    ) {
      setWordFound(true);
      setFinish(true);
      return;
    }

    if (round === 5) {
      setFinish(true);
      return;
    }

    GlobalState.update((s) => {
      s.round++;
    });
  }

  return (
    <div className={`App bg-${darkMode ? "dark" : "light"}`}>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <h1
            className={`mx-auto text-${darkMode ? "light" : "dark"}`}
            style={{ fontSize: "3rem" }}
          >
            Wortel
          </h1>
          <HowTo
            showKeyboard={showKeyboard}
            onKeyboardToggle={(bool) => setShowKeyboard(bool)}
            onNewGame={() => newGame()}
          />
        </div>
      </nav>

      <div className="container mt-4" style={{ width: "300px" }}>
        {Array(6)
          .fill(0)
          .map((row, i) => (
            <Row
              key={`${row}_${i}`}
              rowNum={i}
              onCheckWord={() => checkWord()}
            />
          ))}
      </div>

      {finish && (
        <NewGame
          success={wordFound}
          onNewGame={() => newGame()}
          word={secretWord}
        ></NewGame>
      )}
      {showKeyboard && !finish && <Keyboard onCheckWord={() => checkWord()} />}
    </div>
  );
}
