import { useSelector } from "react-redux";
import "./Chessboard.css";
import Piece from "../pieces/Piece";
import { flatIcons } from "../pieces/IconCatalog";

function buildUIBoard(board) {
  return board.map((p, index) =>
    Piece({ icon: flatIcons[p], pieceId: p, position: index })
  );
}

function Chessboard() {
  const board = useSelector((state) => state.game.board);
  const distribution = buildUIBoard(board);
  let uiBoard = Array.from({ length: 64 }, (_, index) => (
    <div
      key={index}
      className={`size-20 flex justify-center items-center ${
        (index - parseInt(index / 8)) % 2 ? "bg-slate-400" : ""
      }`}
    >
      {index}
      {distribution[index]}
    </div>
  ));
  return <div className="grid grid-cols-8 w-fit">{uiBoard}</div>;
}

export default Chessboard;
