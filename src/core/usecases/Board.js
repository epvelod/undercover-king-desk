import {
  EMPTY,
  WHITE_BISHOP,
  WHITE_KNIGHT,
  WHITE_QUEEN,
  WHITE_PAWN,
  WHITE_ROOK,
  WHITE_KING,
  BLACK_BISHOP,
  BLACK_KNIGHT,
  BLACK_QUEEN,
  BLACK_PAWN,
  BLACK_ROOK,
  BLACK_KING,
} from "../domain/Pieces";

export const initialBlack = [
  BLACK_ROOK,
  BLACK_KNIGHT,
  BLACK_BISHOP,
  BLACK_QUEEN,
  BLACK_KING,
  BLACK_BISHOP,
  BLACK_KNIGHT,
  BLACK_ROOK,
  BLACK_PAWN,
  BLACK_PAWN,
  BLACK_PAWN,
  BLACK_PAWN,
  BLACK_PAWN,
  BLACK_PAWN,
  BLACK_PAWN,
  BLACK_PAWN,
];
export const initialWhite = [
  WHITE_PAWN,
  WHITE_PAWN,
  WHITE_PAWN,
  WHITE_PAWN,
  WHITE_PAWN,
  WHITE_PAWN,
  WHITE_PAWN,
  WHITE_PAWN,
  WHITE_ROOK,
  WHITE_KNIGHT,
  WHITE_BISHOP,
  WHITE_QUEEN,
  WHITE_KING,
  WHITE_BISHOP,
  WHITE_KNIGHT,
  WHITE_ROOK,
];

export function initialBoard() {
  const empty = Array.from({ length: 32 }, (_, index) => EMPTY);

  return [...initialBlack, ...empty, ...initialWhite];
}


export function emptyBoard() {
  return Array.from({ length: 64 }, (_, index) => EMPTY);
}

// function movePiece(to) {
//   const behaviorFactory = this.behaviorFactory;
//   const from = this.from;

//   const piece = this.board[from];
//   this.board[to] = piece;
//   this.board[from] = EMPTY;
  
//   this.updateBoard(this.buildUIBoard(this.board));
//   this.updateMarkers(this.markers);
// }


// onClick() {
//   const posibleMoves = this.game.getPosibleMoves();
//   console.log(posibleMoves);

//   if (posibleMoves.includes(this.position)) {
//       console.log("position", this.position);
//       this.game.movePiece(this.position);
//       this.game.setPieceToMove(-1);
//       this.game.setPosibleMoves([]);
//   } else {
//       console.log("actionArea", this.actionArea());
//       this.game.setPieceToMove(this.position);
//       this.game.setPosibleMoves(this.actionArea());
//   }
// }