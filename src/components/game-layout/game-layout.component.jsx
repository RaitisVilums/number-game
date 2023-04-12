import "./game-layout.styles.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const GameLayout = () => {
  const [selectStart, setSelectStart] = useState(null);
  const selectWhenStart = (event) => {
    const { value } = event.target;
    setSelectStart(value);
  };

  return (
    <div className="game-layout">
      <Link className="game-layout-absolute" to={"/"}>
        Uz sākumu
      </Link>
      <h1>Izvēlies, kurš tu gribi sākt?</h1>
      <div className="game-layout-btns">
        <input
          className="game-layout-btns-input"
          type="radio"
          id="pirmais"
          name="player"
          value={1}
          onChange={selectWhenStart}
        />
        <label className="game-layout-btns-label" htmlFor="pirmais">
          Pirmais
        </label>
        <input
          className="game-layout-btns-input"
          type="radio"
          id="otrais"
          name="player"
          value={2}
          onChange={selectWhenStart}
        />
        <label className="game-layout-btns-label" htmlFor="otrais">
          Otrais
        </label>
      </div>
      <Link className="game-layout-link" to={`/start/${selectStart}`}>
        start
      </Link>
    </div>
  );
};

export default GameLayout;
