import { flatIcons } from "../../presentation/pieces/IconCatalog";
import Piece from "../../presentation/pieces/Piece";
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
  WHITE_PIECE,
} from "../domain/Pieces";
import BehaviorFactory from "./BehaviorFactory";

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

export default class Game {
  constructor() {
    this.behaviorFactory = new BehaviorFactory(this);

    this.board = initialBoard();
    this.markers = emptyBoard();

    this.uiDistribution = this.buildUIBoard(this.board);
    this.uiMarkers = [];
    
    this.isWitheTurn = true;
    this.from = -1;
    this.posibleMoves = [];
    
    this.updateBoard = console.log;
    this.updateMarkers = console.log;
  }

  buildUIBoard(board) {
    const behaviorFactory = this.behaviorFactory;
    return board.map((p, index)=>
      Piece({icon: flatIcons[p], behavior: behaviorFactory.factory(p, index)}) 
    );
  }

  getUIBoard() {
    return this.uiDistribution;
  }

  getUIMarkers() {
    return this.uiMarkers;
  }

  movePiece(to) {
    const behaviorFactory = this.behaviorFactory;
    const from = this.from;

    const piece = this.board[from];
    this.board[to] = piece;
    this.board[from] = EMPTY;
    
    this.updateBoard(this.buildUIBoard(this.board));
    this.updateMarkers(this.markers);
  }

  setPieceToMove(from) {
    this.from = from;
  }

  setPosibleMoves(posibleMoves) {
    this.posibleMoves = posibleMoves;
  }

  getPosibleMoves() {
    return this.posibleMoves;
  } 

  setUpdateBoard(updateBoard) {
    this.updateBoard = updateBoard;
  }

  setUpdateMarkers(markers) {
    this.markers = markers;
  }
}
