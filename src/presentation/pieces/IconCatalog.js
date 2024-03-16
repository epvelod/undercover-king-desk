import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessBishop,
  faChessKnight,
  faChessQueen,
  faChessPawn,
  faChessRook,
  faChessKing,
} from "@fortawesome/free-solid-svg-icons";
import { WHITE_BISHOP, WHITE_KNIGHT, WHITE_QUEEN, WHITE_PAWN, WHITE_ROOK, WHITE_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_QUEEN, BLACK_PAWN, BLACK_ROOK, BLACK_KING, WHITE_PIECE, BLACK_PIECE, EMPTY } from "../../core/domain/Pieces";

const pieceClassWhite = "min-w-16 min-h-16 text-lime-100 stroke-[5px] stroke-purple-950";
const pieceClassBlack = "min-w-16 min-h-16 text-gray-800";

export const whiteIconBishop = <FontAwesomeIcon icon={faChessBishop} className={pieceClassWhite} />;
export const whiteIconKnight = <FontAwesomeIcon icon={faChessKnight} className={pieceClassWhite} />;
export const whiteIconQueen = <FontAwesomeIcon icon={faChessQueen} className={pieceClassWhite} />;
export const whiteIconPawn = <FontAwesomeIcon icon={faChessPawn} className={pieceClassWhite} />;
export const whiteIconRook = <FontAwesomeIcon icon={faChessRook} className={pieceClassWhite} />;
export const whiteIconKing = <FontAwesomeIcon icon={faChessKing} className={pieceClassWhite} />;

export const blackIconBishop = <FontAwesomeIcon icon={faChessBishop} className={pieceClassBlack } />;
export const blackIconKnight = <FontAwesomeIcon icon={faChessKnight} className={pieceClassBlack } />;
export const blackIconQueen = <FontAwesomeIcon icon={faChessQueen} className={pieceClassBlack } />;
export const blackIconPawn = <FontAwesomeIcon icon={faChessPawn} className={pieceClassBlack } />;
export const blackIconRook = <FontAwesomeIcon icon={faChessRook} className={pieceClassBlack } />;
export const blackIconKing = <FontAwesomeIcon icon={faChessKing} className={pieceClassBlack } />;


export const iconEmpty = <div></div>; 
export const square = <div className="min-w-16 min-h-16"></div>; 

export const icons = {
  [WHITE_PIECE]: {
    [WHITE_BISHOP]: whiteIconBishop,
    [WHITE_KNIGHT]: whiteIconKnight,
    [WHITE_QUEEN]: whiteIconQueen,
    [WHITE_PAWN]: whiteIconPawn,
    [WHITE_ROOK]: whiteIconRook,
    [WHITE_KING]: whiteIconKing,
  },
  [BLACK_PIECE]: {
    [BLACK_BISHOP]: blackIconBishop,
    [BLACK_KNIGHT]: blackIconKnight,
    [BLACK_QUEEN]: blackIconQueen,
    [BLACK_PAWN]: blackIconPawn,
    [BLACK_ROOK]: blackIconRook,
    [BLACK_KING]: blackIconKing,
  }
};

export const flatIcons = {
  [EMPTY]: square,
  [WHITE_BISHOP]: whiteIconBishop,
  [WHITE_KNIGHT]: whiteIconKnight,
  [WHITE_QUEEN]: whiteIconQueen,
  [WHITE_PAWN]: whiteIconPawn,
  [WHITE_ROOK]: whiteIconRook,
  [WHITE_KING]: whiteIconKing,
  [BLACK_BISHOP]: blackIconBishop,
  [BLACK_KNIGHT]: blackIconKnight,
  [BLACK_QUEEN]: blackIconQueen,
  [BLACK_PAWN]: blackIconPawn,
  [BLACK_ROOK]: blackIconRook,
  [BLACK_KING]: blackIconKing,
};
