import { GlobalState } from "../stores/StateStore";

export default function HowTo({ showKeyboard, onKeyboardToggle, onNewGame }) {
  const darkMode = GlobalState.useState((s) => s.darkMode);

  return (
    <>
      <button
        className={`btn text-${darkMode ? "light" : "dark"}`}
        style={{ fontSize: "2rem", position: "fixed", top: 0, right: 0 }}
        data-bs-toggle="modal"
        data-bs-target="#howToModal"
      >
        ⓘ
      </button>

      <div
        className="modal fade"
        id="howToModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Wie zu spielen?{" "}
                <img
                  src="https://c.tenor.com/QQWvIARgbdAAAAAC/tenor.gif"
                  alt="Yoda telling you why you fail"
                  style={{ height: "50px" }}
                />
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start">
              <ol>
                <li>
                  Beginne damit ein <b>fünf</b>-stelliges Wort deiner Wahl an
                  dem Textfeld mit den Pfeilen einzugeben.
                </li>
                <li>
                  Wenn du das eingegebene Wort überprüfen lassen möchtest,
                  drücke <button className="btn btn-outline-primary">OK</button>{" "}
                  oder die Enter-Taste.
                </li>
                <li>
                  Du bekommst nun Hinweise angezeigt:
                  <ul>
                    <li>
                      <span className="bg-secondary text-light p-1 rounded">
                        Graue
                      </span>{" "}
                      Buchstaben kommen im gesuchten Wort nicht vor
                    </li>
                    <li>
                      <span className="bg-warning text-light p-1 rounded">
                        Gelbe
                      </span>{" "}
                      Buchstaben kommen im gesuchten Wort vor, sind aber noch an
                      der falschen Stelle
                    </li>
                    <li>
                      <span className="bg-success text-light p-1 rounded">
                        Grüne
                      </span>{" "}
                      Buchstaben sind bereits an der richtigen Stelle
                    </li>
                  </ul>
                  <li>
                    Versuche jetzt mit den Tipps das gesuchte Wort zu finden!
                  </li>
                </li>
              </ol>
              <h4 className="fw-bold">
                Frohes Rätseln{" "}
                <span role="img" aria-label="Kuss-Emoji">
                  😘
                </span>
              </h4>
            </div>
            <div className="modal-footer justify-content-between">
              <div className="text-start">
                <div>
                  <input
                    type="checkbox"
                    checked={showKeyboard}
                    id="keyboardToggle"
                    name="keyboardToggle"
                    onChange={() => onKeyboardToggle(!showKeyboard)}
                  />{" "}
                  <label htmlFor="keyboardToggle">Tastatur anzeigen</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    id="dakrModeToggle"
                    name="dakrModeToggle"
                    onChange={() =>
                      GlobalState.update((s) => {
                        s.darkMode = !darkMode;
                      })
                    }
                  />{" "}
                  <label htmlFor="dakrModeToggle">Darkmode</label>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => onNewGame()}
                data-bs-dismiss="modal"
              >
                Neu starten
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
