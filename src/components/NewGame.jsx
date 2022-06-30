import { GlobalState } from "./../stores/StateStore";

export default function NewGame({ onNewGame, word, success }) {
  const darkMode = GlobalState.useState((s) => s.darkMode);

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className={`modal-header bg-${success ? "success" : "danger"}`}>
          {success && (
            <h5 className="modal-title">Du hast das Wort gefunden!</h5>
          )}
          {!success && (
            <h5 className="modal-title">
              Du hast das Wort leider nicht gefunden!
            </h5>
          )}
        </div>
        <div className="modal-body">
          {success && <h2>Du hast das Wort gefunden!</h2>}
          {!success && <h2>Das Wort war {word}.</h2>}
          <button className="btn btn-primary" onClick={() => onNewGame()}>
            Neues Spiel
          </button>
        </div>
      </div>
    </div>
  );
}
