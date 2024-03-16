import { EMPTY, getPieceColor } from "../domain/Pieces";

export const LEFT = 0;
export const RIGHT = 1;
export const UP = 2;
export const DOWN = 3;
export const LEFT_UP = 4;
export const LEFT_DOWN = 5;
export const RIGHT_UP = 6;
export const RIGHT_DOWN = 7;

export default class PieceBehavior {
  constructor(game, position, team) {
    this.game = game;
    this.board = game.board;
    this.position = position;
    this.team = team;
  }

  updatePosition(position) {
    this.position = position;
  }

  actionArea() {
    return [];
  }

  onClick() {
    const posibleMoves = this.game.getPosibleMoves();
    console.log(posibleMoves);
    
    if (posibleMoves.includes(this.position)) {
        console.log("position", this.position);
        this.game.movePiece(this.position);
        this.game.setPieceToMove(-1);
        this.game.setPosibleMoves([]);
    } else {
        console.log("actionArea", this.actionArea());
        this.game.setPieceToMove(this.position);
        this.game.setPosibleMoves(this.actionArea());
    }
  }

  availableMovesByDirection(direction, maxMovements = 8) {
    let mapMovements = {
      [LEFT]: this.position % 8,
      [RIGHT]: 7 - (this.position % 8),
      [UP]: Math.floor(this.position / 8),
      [DOWN]: 7 - Math.floor(this.position / 8),
      [LEFT_UP]: Math.min(this.position % 8, Math.floor(this.position / 8)),
      [LEFT_DOWN]: Math.min(
        this.position % 8,
        7 - Math.floor(this.position / 8)
      ),
      [RIGHT_UP]: Math.min(
        7 - (this.position % 8),
        Math.floor(this.position / 8)
      ),
      [RIGHT_DOWN]: Math.min(
        7 - (this.position % 8),
        7 - Math.floor(this.position / 8)
      ),
    };

    let mapOperateDiraction = {
      [LEFT]: (position, i) => position - i,
      [RIGHT]: (position, i) => position + i,
      [UP]: (position, i) => position - i * 8,
      [DOWN]: (position, i) => position + i * 8,
      [LEFT_UP]: (position, i) => position - i * 9,
      [LEFT_DOWN]: (position, i) => position + i * 7,
      [RIGHT_UP]: (position, i) => position - i * 7,
      [RIGHT_DOWN]: (position, i) => position + i * 9,
    };

    return this.availableMoves(
      Math.min(mapMovements[direction], maxMovements),
      mapOperateDiraction[direction]
    );
  }

  availableMoves(movements, operateDiraction) {
    const position = this.position;
    const team = this.team;
    const possibleMoves = [];
    const board = this.board;

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
}
