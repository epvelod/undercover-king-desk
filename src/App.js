import "./App.css";
import Chessboard from "./presentation/Chessboard/Chessboard";
import Game from "./core/usecases/Board";
import { useState } from "react";

function App() {

  const game = new Game();

  const [board, setBoard] = useState(game.getUIBoard())
  const [markers, setMarkers] = useState(game.getUIMarkers())

  game.setUpdateBoard(setBoard);
  game.setUpdateMarkers(setMarkers);

  return (
    <div className="w-full bg-teal-900 flex justify-center">
      <div className="p-16 m-10 rounded-lg bg-stone-200">
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative" }}>
            <Chessboard distribution={board}></Chessboard>
          </div>
          <div style={{ position: "absolute", top: "0" }}>
            {/* <Chessboard distribution={markers}></Chessboard> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
