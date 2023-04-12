import "./App.scss";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Wrapper from "./components/utils/wrapper/wrapper";
import AboutGame from "./components/about-game/about-game.component";
import GameLayout from "./components/game-layout/game-layout.component";
import Game from "./components/game/game.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route path="/" element={<AboutGame />} />
        <Route path="game" element={<GameLayout />} />
        <Route path="start/:selectedStart" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
