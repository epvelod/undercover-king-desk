import { useSelector } from "react-redux";
import "./Chessboard.css";
import Piece from "../pieces/Piece";
import { flatIcons } from "../pieces/IconCatalog";
import { useState } from "react";

function buildUIBoard(board, marks) {
  return board.map((p, index) =>
    Piece({
      icon: flatIcons[p],
      pieceId: p,
      position: index,
      isMarked: marks.includes(index),
    })
  );
}

function Chessboard() {
  const board = useSelector((state) => state.game.board);
  const marks = useSelector((state) => state.game.availableMovements);
  const selection = useSelector((state) => state.game.selection.pieceId);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - containerRect.left - 30,
      y: event.clientY - containerRect.top - 30,
    });
  };

  const distribution = buildUIBoard(board, marks);

  const uiBoard = Array.from({ length: 64 }, (_, index) => (
    <div
      key={index}
      className={`size-20 flex justify-center items-center ${
        (index - parseInt(index / 8)) % 2 ? "bg-slate-400" : ""
      }`}
    >
      {distribution[index]}
    </div>
  ));

  return (
    <div className="grid grid-cols-8 w-fit" onMouseMove={handleMouseMove}>
      {uiBoard}
      {selection !== -1 && (
        <div
          className="absolute"
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
            pointerEvents: "none",
          }}
        >
          {flatIcons[selection]}
        </div>
      )}
    </div>
  );
}

export default Chessboard;
