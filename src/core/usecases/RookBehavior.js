import PieceBehavior, { DOWN, LEFT, RIGHT, UP } from "./PieceBehavior";

export default class RookBehavior extends PieceBehavior{
    constructor(game, position, team) {
        super(game, position, team);
    }

    actionArea() {
        return [
            ...this.availableMovesByDirection(UP),
            ...this.availableMovesByDirection(DOWN),
            ...this.availableMovesByDirection(LEFT),
            ...this.availableMovesByDirection(RIGHT)
        ];
    }
}