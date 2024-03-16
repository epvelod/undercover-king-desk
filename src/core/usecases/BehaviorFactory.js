import { BLACK_BISHOP, BLACK_KING, BLACK_KNIGHT, BLACK_PAWN, BLACK_PIECE, BLACK_QUEEN, BLACK_ROOK, EMPTY, WHITE_BISHOP, WHITE_KING, WHITE_KNIGHT, WHITE_PAWN, WHITE_PIECE, WHITE_QUEEN, WHITE_ROOK } from "../domain/Pieces";
import BishopBehavior from "./BishopBehabior";
import KingBehavior from "./KingBehavior";
import KnightBehavior from "./KnightBehavior";
import PawnBehavior from "./PawnBehavior";
import QueenBehavior from "./QueenBehavior";
import RookBehavior from "./RookBehavior";
import SquareBehavior from "./SquareBehavior";

const factories = {
    [EMPTY]: (game, position) => new SquareBehavior(game, position),
    [WHITE_BISHOP]: (game, position) => new BishopBehavior(game, position, WHITE_PIECE),
    [WHITE_KNIGHT]: (game, position) => new KnightBehavior(game, position, WHITE_PIECE),
    [WHITE_QUEEN]: (game, position) => new QueenBehavior(game, position, WHITE_PIECE),
    [WHITE_PAWN]: (game, position) => new PawnBehavior(game, position, WHITE_PIECE),
    [WHITE_ROOK]: (game, position) => new RookBehavior(game, position, WHITE_PIECE),
    [WHITE_KING]: (game, position) => new KingBehavior(game, position, WHITE_PIECE),
    [BLACK_BISHOP]: (game, position) => new BishopBehavior(game, position, BLACK_PIECE),
    [BLACK_KNIGHT]: (game, position) => new KnightBehavior(game, position, BLACK_PIECE),
    [BLACK_QUEEN]: (game, position) => new QueenBehavior(game, position, BLACK_PIECE),
    [BLACK_PAWN]: (game, position) => new PawnBehavior(game, position, BLACK_PIECE),
    [BLACK_ROOK]: (game, position) => new RookBehavior(game, position, BLACK_PIECE),
    [BLACK_KING]: (game, position) => new KingBehavior(game, position, BLACK_PIECE),
  };
export default class BehaviorFactory {
    constructor(game) {
        this.game = game;
        this.behaviors = [];
    }

    factory(pieceId, position) {
        return factories[pieceId](this.game, position);
    }
}