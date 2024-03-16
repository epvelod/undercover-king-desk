import PieceBehavior, { DOWN, LEFT, LEFT_DOWN, LEFT_UP, RIGHT, RIGHT_DOWN, RIGHT_UP, UP } from "./PieceBehavior";

export default class QueenBehavior extends PieceBehavior{
    constructor(game, position, team) {
        super(game, position, team);
    }

    actionArea() {
        return [
            ...this.availableMovesByDirection(UP),
            ...this.availableMovesByDirection(DOWN),
            ...this.availableMovesByDirection(LEFT),
            ...this.availableMovesByDirection(RIGHT),
            ...this.availableMovesByDirection(LEFT_DOWN),
            ...this.availableMovesByDirection(LEFT_UP),
            ...this.availableMovesByDirection(RIGHT_DOWN),
            ...this.availableMovesByDirection(RIGHT_UP)
        ];
    }
}