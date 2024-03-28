import { useDispatch, useSelector } from "react-redux";
import "./Chessboard.css";
import Piece from "../pieces/Piece";
import { flatIcons } from "../pieces/IconCatalog";
import { useEffect, useState } from "react";
import { WHITE_PIECE } from "../../core/domain/Pieces";
import { clearSelection } from "../../redux/reducers";

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
  const dispatch = useDispatch();
  const isWhiteTurn = useSelector((state) => state.game.turn === WHITE_PIECE);
  const board = useSelector((state) => state.game.board);
  const marks = useSelector((state) => state.game.availableMovements);
  const selection = useSelector((state) => state.game.selection.pieceId);
  const isCheckmate = useSelector((state) => state.game.isCheckmate);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dispatch(clearSelection());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseMove = (event) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - containerRect.left - 30,
      y: event.clientY - containerRect.top - 30,
    });
  };

  const distribution = isWhiteTurn ? buildUIBoard(board, marks): buildUIBoard(board, marks);//.reverse();

  const uiBoard = Array.from({ length: 64 }, (_, index) => (
    <div
      key={index}
      className={`size-20 flex justify-center items-center ${
        ((index - parseInt(index / 8)) % 2) /*^ isWhiteTurn */ ? "bg-slate-400" : ""
      }`}
    >
      {distribution[index]}
    </div>
  ));

  return (
    <div className="grid grid-cols-8 w-fit" onMouseMove={handleMouseMove}>
      {isCheckmate && (
      <div className="absolute bg-rose-950 text-white p-2 rounded-lg">
        Checkmate!
      </div>
      )}
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
