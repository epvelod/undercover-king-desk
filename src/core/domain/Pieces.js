export const bishop = "bishop";
export const knight = "knight";
export const queen = "queen";
export const pawn = "pawn";
export const rook = "rook";
export const king = "king";

export const EMPTY = 0;
export const BISHOP = 1;
export const KNIGHT = 2;
export const QUEEN = 3;
export const PAWN = 4;
export const ROOK = 5;
export const KING = 6;

export const WHITE_PIECE = 8;
export const BLACK_PIECE = WHITE_PIECE * 2;
export const MARKERST = WHITE_PIECE * 3;

export const WHITE_BISHOP = BISHOP + WHITE_PIECE;
export const WHITE_KNIGHT = KNIGHT + WHITE_PIECE;
export const WHITE_QUEEN = QUEEN + WHITE_PIECE;
export const WHITE_PAWN = PAWN + WHITE_PIECE;
export const WHITE_ROOK = ROOK + WHITE_PIECE;
export const WHITE_KING = KING + WHITE_PIECE;

export const BLACK_BISHOP = BISHOP + BLACK_PIECE;
export const BLACK_KNIGHT = KNIGHT + BLACK_PIECE;
export const BLACK_QUEEN = QUEEN + BLACK_PIECE;
export const BLACK_PAWN = PAWN + BLACK_PIECE;
export const BLACK_ROOK = ROOK + BLACK_PIECE;
export const BLACK_KING = KING + BLACK_PIECE;

export const MARKER_SELECTED = MARKERST + 1;
export const MARKER_POSIBLE_OPTION = MARKERST + 2;
export const MARKER_POSIBLE_WITH_ENEMY = MARKERST + 3;

export function getName(pieceId) {
  switch ((pieceId % WHITE_PIECE) % BLACK_PIECE) {
    case BISHOP:
      return bishop;
    case KNIGHT:
      return knight;
    case QUEEN:
      return queen;
    case PAWN:
      return pawn;
    case ROOK:
      return rook;
    case KING:
      return king;
  }
}

export function getPieceId(pieceName, pieceType) {
  switch (pieceName) {
    case bishop:
      return BISHOP + pieceType;
    case knight:
      return KNIGHT + pieceType;
    case queen:
      return QUEEN + pieceType;
    case pawn:
      return PAWN + pieceType;
    case rook:
      return ROOK + pieceType;
    case king:
      return KING + pieceType;
  }
}

export function getPieceWithoutColor(pieceId) {
  return (pieceId % WHITE_PIECE) % BLACK_PIECE;
}

export function getPieceColor(pieceId) {
  return pieceId >= BLACK_PIECE
    ? BLACK_PIECE
    : pieceId >= WHITE_PIECE
    ? WHITE_PIECE
    : EMPTY;
}

export function tooglePieceColor(pieceId) {
  return getPieceColor(pieceId) === WHITE_PIECE
    ? pieceId + WHITE_PIECE
    : pieceId - WHITE_PIECE;
}

export function getPieceIdWithoutColor(pieceId) {
  return pieceId % WHITE_PIECE;
}