import { WHITE_PIECE } from "../domain/Pieces";
import PieceBehavior, { DOWN, UP } from "./PieceBehavior";

export default class PawnBehavior extends PieceBehavior{
    constructor(game, position, team) {
        super(game, position, team);
    }

    actionArea() {
        const MAX_MOVEMENTS = 1;

        const direction = this.team === WHITE_PIECE ? UP : DOWN;
        
        return this.availableMovesByDirection(direction, MAX_MOVEMENTS);
    }
}