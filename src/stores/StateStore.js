import { registerInDevtools, Store } from "pullstate";

export const GlobalState = new Store({
  round: 0,
  wordList: [[], [], [], [], [], []],
  hints: [],
  darkMode: false,
  secretWord: ""
});

registerInDevtools({
  GlobalState,
});
