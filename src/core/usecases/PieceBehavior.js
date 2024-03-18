import { BISHOP, EMPTY, KING, KNIGHT, PAWN, QUEEN, ROOK, getPieceColor } from "../domain/Pieces";

export const LEFT = 0;
export const RIGHT = 1;
export const UP = 2;
export const DOWN = 3;
export const LEFT_UP = 4;
export const LEFT_DOWN = 5;
export const RIGHT_UP = 6;
export const RIGHT_DOWN = 7;

const strategyOperateDiraction = {
  [LEFT]: (position, i) => position - i,
  [RIGHT]: (position, i) => position + i,
  [UP]: (position, i) => position - i * 8,
  [DOWN]: (position, i) => position + i * 8,
  [LEFT_UP]: (position, i) => position - i * 9,
  [LEFT_DOWN]: (position, i) => position + i * 7,
  [RIGHT_UP]: (position, i) => position - i * 7,
  [RIGHT_DOWN]: (position, i) => position + i * 9,
};

export function availableMovesByDirection(
  { board, position, pieceId },
  direction,
  maxMovements = 8
) {
  const mapMovements = {
    [LEFT]: position % 8,
    [RIGHT]: 7 - (position % 8),
    [UP]: Math.floor(position / 8),
    [DOWN]: 7 - Math.floor(position / 8),
    [LEFT_UP]: Math.min(position % 8, Math.floor(position / 8)),
    [LEFT_DOWN]: Math.min(position % 8, 7 - Math.floor(position / 8)),
    [RIGHT_UP]: Math.min(7 - (position % 8), Math.floor(position / 8)),
    [RIGHT_DOWN]: Math.min(7 - (position % 8), 7 - Math.floor(position / 8)),
  };
  const movements = Math.min(mapMovements[direction], maxMovements);
  const operateDiraction = strategyOperateDiraction[direction];
  return availableMoves({
    board,
    position,
    pieceId,
    movements,
    operateDiraction,
  });
}

export function availableMoves({
  board,
  position,
  pieceId,
  movements,
  operateDiraction,
}) {
  const team = getPieceColor(pieceId);
  const possibleMoves = [];
  for (let i = 1; i <= movements; i++) {
    let nextMove = operateDiraction(position, i);
    let piece = board[nextMove];
    if (piece !== EMPTY && getPieceColor(piece) === team) {
      break;
    }
    possibleMoves.push(nextMove);
    if (piece !== EMPTY) {
      break;
    }
  }
  return possibleMoves;
}

function pawnBehavior({ board, position, pieceId }) {
  const MAX_MOVEMENTS = 1;
  const direction = getPieceColor(pieceId) === WHITE_PIECE ? UP : DOWN;
  return availableMovesByDirection(
    { board, position, pieceId },
    direction,
    MAX_MOVEMENTS
  );
}

function bishopBehavior({ board, position, pieceId }) {
  return [
    ...availableMovesByDirection({ board, position, pieceId }, LEFT_DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, LEFT_UP),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT_DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT_UP),
  ];
}

function kingBehavior({ board, position, pieceId }) {
  const MAX_MOVEMENTS = 1;
  return [
    ...availableMovesByDirection(
      { board, position, pieceId },
      UP,
      MAX_MOVEMENTS
    ),
    ...availableMovesByDirection(
      { board, position, pieceId },
      DOWN,
      MAX_MOVEMENTS
    ),
    ...availableMovesByDirection(
      { board, position, pieceId },
      LEFT,
      MAX_MOVEMENTS
    ),
    ...availableMovesByDirection(
      { board, position, pieceId },
      RIGHT,
      MAX_MOVEMENTS
    ),
    ...availableMovesByDirection(
      { board, position, pieceId },
      LEFT_DOWN,
      MAX_MOVEMENTS
    ),
    ...availableMovesByDirection(
      { board, position, pieceId },
      LEFT_UP,
      MAX_MOVEMENTS
    ),
    ...availableMovesByDirection(
      { board, position, pieceId },
      RIGHT_DOWN,
      MAX_MOVEMENTS
    ),
    ...availableMovesByDirection(
      { board, position, pieceId },
      RIGHT_UP,
      MAX_MOVEMENTS
    ),
  ];
}

function queenBehavior({ board, position, pieceId }) {
  return [
    ...availableMovesByDirection({ board, position, pieceId }, UP),
    ...availableMovesByDirection({ board, position, pieceId }, DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, LEFT),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT),
    ...availableMovesByDirection({ board, position, pieceId }, LEFT_DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, LEFT_UP),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT_DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT_UP),
  ];
}

function rookBehavior({ board, position, pieceId }) {
  return [
    ...availableMovesByDirection({ board, position, pieceId }, UP),
    ...availableMovesByDirection({ board, position, pieceId }, DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, LEFT),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT),
  ];
}

function squareBehavior({ board, position, pieceId }) {}

function strategyBehavior(pieceId) {
  switch (pieceId % WHITE_PIECE % BLACK_PIECE) {
    case BISHOP:
      return bishopBehavior;
    case KNIGHT:
      return squareBehavior;
    case QUEEN:
      return queenBehavior;
    case PAWN:
      return pawnBehavior;
    case ROOK:
      return rookBehavior;
    case KING:
      return kingBehavior;
  }
}
