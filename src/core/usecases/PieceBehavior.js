import {
  BISHOP,
  BLACK_PIECE,
  BLACK_ROOK,
  EMPTY,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  WHITE_PIECE,
  WHITE_ROOK,
  getPieceColor,
  getPieceWithoutColor,
  knight,
  tooglePieceColor,
} from "../domain/Pieces";

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

function pawnBehavior({ board, position, pieceId, playedMovements }) {
  const MAX_MOVEMENTS = position < 16 || position > 47 ? 2 : 1;
  const colorPiece = getPieceColor(pieceId);
  const colorOponent = tooglePieceColor(colorPiece);
  const direction = colorPiece === WHITE_PIECE ? UP : DOWN;
  const diagonal = [];

  const leftDiagonal = colorPiece === WHITE_PIECE ? position - 9 : position + 7;
  const rightDiagonal =
    colorPiece === WHITE_PIECE ? position - 7 : position + 9;

  if (position % 8 && getPieceColor(board[leftDiagonal]) === colorOponent) {
    diagonal.push(leftDiagonal);
  }

  if (
    position % 8 !== 7 &&
    getPieceColor(board[rightDiagonal]) === colorOponent
  ) {
    diagonal.push(rightDiagonal);
  }

  return [
    ...diagonal,
    ...availableMovesByDirection(
      { board, position, pieceId },
      direction,
      MAX_MOVEMENTS
    ),
  ];
}

function bishopBehavior({ board, position, pieceId, playedMovements }) {
  return [
    ...availableMovesByDirection({ board, position, pieceId }, LEFT_DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, LEFT_UP),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT_DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT_UP),
  ];
}

function kingBehavior({ board, position, pieceId, playedMovements }) {
  const MAX_MOVEMENTS = 1;
  const castlingMovements = castling({ board, position, pieceId, playedMovements });
  return [
    ...castlingMovements,
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

function knightBehavior({ board, position, pieceId, playedMovements }) {
  const possibleMoves = [];
  const colorPiece = getPieceColor(pieceId);
  const directions = [
    position - 17,
    position - 15,
    position - 10,
    position - 6,
    position + 6,
    position + 10,
    position + 15,
    position + 17,
  ];
  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    if (
      direction >= 0 &&
      direction < 64 &&
      Math.abs((direction % 8) - (position % 8)) < 3
    ) {
      const piece = board[direction];
      if (piece === EMPTY || getPieceColor(piece) !== colorPiece) {
        possibleMoves.push(direction);
      }
    }
  }

  return possibleMoves;
}

function queenBehavior({ board, position, pieceId, playedMovements }) {
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

function rookBehavior({ board, position, pieceId, playedMovements }) {
  return [
    ...availableMovesByDirection({ board, position, pieceId }, UP),
    ...availableMovesByDirection({ board, position, pieceId }, DOWN),
    ...availableMovesByDirection({ board, position, pieceId }, LEFT),
    ...availableMovesByDirection({ board, position, pieceId }, RIGHT),
  ];
}

function squareBehavior({ board, position, pieceId, playedMovements }) {}

export function pieceStrategyBehavior(pieceId) {
  switch ((pieceId % WHITE_PIECE) % BLACK_PIECE) {
    case BISHOP:
      return bishopBehavior;
    case KNIGHT:
      return knightBehavior;
    case QUEEN:
      return queenBehavior;
    case PAWN:
      return pawnBehavior;
    case ROOK:
      return rookBehavior;
    case KING:
      return kingBehavior;
    case EMPTY:
      return squareBehavior;
  }
}

export function move({ board, from, to, playedMovements }) {
  const pieceId = board[from];

  if (isCastling({ pieceId, from, to })) {
    const rookPosition = from - to === 2 ? from - 4 : from + 3;
    const newRookPosition = from - to === 2 ? from - 1 : from + 1;
    const rook = board[rookPosition];
    console.log(rookPosition, newRookPosition, rook);
    board[rookPosition] = EMPTY;
    board[newRookPosition] = rook;
  }

  board[to] = pieceId;
  board[from] = EMPTY;
  return board;
}

function isCastling({ pieceId, from, to}) {
  return getPieceWithoutColor(pieceId) === KING && Math.abs(from - to) === 2;
}

function castling({ board, position, pieceId, playedMovements }) {
  const isKingMoved = playedMovements.some(
    (movement) => movement.pieceId === pieceId
  );

  if (isKingMoved) {
    return [];
  }
  const rookId =
    getPieceColor(pieceId) === WHITE_PIECE ? WHITE_ROOK : BLACK_ROOK;

  const isLeftRookMoved = playedMovements.some(
    (movement) => movement.from % 8 === 0 && movement.pieceId === rookId
  );
  const isRightRookMoved = playedMovements.some(
    (movement) => movement.from % 8 === 7 && movement.pieceId === rookId
  );

  if (isLeftRookMoved && isRightRookMoved) {
    return [];
  }

  const movements = [];

  if (
    !isLeftRookMoved &&
    !isCheckForPosition({ board, position: position - 1, pieceId, playedMovements }) &&
    !isCheckForPosition({ board, position: position - 2, pieceId, playedMovements }) &&
    board[position - 1] === EMPTY &&
    board[position - 2] === EMPTY &&
    board[position - 3] === EMPTY 
  ) {
    movements.push(position - 2);
  }

  if (
    !isRightRookMoved &&
    !isCheckForPosition({ board, position: position + 1, pieceId, playedMovements }) &&
    !isCheckForPosition({ board, position: position + 2, pieceId, playedMovements }) &&
    board[position + 1] === EMPTY &&
    board[position + 2] === EMPTY
  ) {
    movements.push(position + 2);
  }

  return movements;
}

export function isCheckForPosition({ board, position, pieceId, playedMovements }) {
  const colorPiece = getPieceColor(pieceId);
  const colorOponent = tooglePieceColor(colorPiece);
  const oponentPieces = board
    .map((piece, position) => [piece, position])
    .filter(
      ([piece]) =>
        getPieceColor(piece) === colorOponent &&
        getPieceWithoutColor(piece) !== KING
    );
  const oponentMovements = oponentPieces.flatMap(([piece, position]) =>
    pieceStrategyBehavior(piece)({ board, position, piece, playedMovements })
  );
  return oponentMovements.includes(position);
}

export function isCheck( board, turn ) {
  const kingPosition = board.findIndex(
    (piece) => getPieceWithoutColor(piece) === KING && getPieceColor(piece) === turn
  );
  return isCheckForPosition({ board, position: kingPosition, pieceId: board[kingPosition], playedMovements: [] });
}

/**
 * 
 * TODO:
 * - implement castling : in progress
 * - implement en passant
 * - verify movements to avoid check
 * - implement checkmate
 * - implement stalemate
 * - implement draw
 * - implement promotion
 * - implement 50-move rule
 * - implement threefold repetition
 * - implement time control
 * - implement draw by insufficient material
 * - implement draw by agreement
 * 
 */

