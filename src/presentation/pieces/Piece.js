import React from "react";
import { useDispatch } from "react-redux";
import { selection } from "../../redux/reducers";
import { EMPTY } from "../../core/domain/Pieces";

export default function Piece({ icon, pieceId, position, isMarked }) {
  const dispatch = useDispatch();

  const handleSelection = () => {
    dispatch(selection({ pieceId, position }));
  };

  const key = `${pieceId}-${position}`;
  const markedPiece = pieceId != EMPTY;

  return (
    <>
      {isMarked && markedPiece && (
        <div
          onClick={() => handleSelection()} onMouseUp={() => handleSelection()}
          className="border-8 border-rose-950 w-20 h-20 rounded-full absolute transform opacity-50"
        ></div>
      )}
      {isMarked && !markedPiece && (
        <div
          onClick={() => handleSelection()} onMouseUp={() => handleSelection()}
          className="w-10 h-10 bg-rose-950 rounded-full absolute transform opacity-50"
        ></div>
      )}
      <div key={key} onMouseDown={() => handleSelection()} onMouseUp={() => handleSelection()}>
        {icon}
      </div>
    </>
  );
}
