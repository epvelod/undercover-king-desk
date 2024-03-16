import PieceBehavior, { DOWN, LEFT, LEFT_DOWN, LEFT_UP, RIGHT, RIGHT_DOWN, RIGHT_UP, UP } from "./PieceBehavior";

export default class KingBehavior extends PieceBehavior {
    constructor(game, position, team) {
        super(game, position, team);
    }

    actionArea() {
        const MAX_MOVEMENTS = 1;
        return [
            ...this.availableMovesByDirection(UP, MAX_MOVEMENTS),
            ...this.availableMovesByDirection(DOWN, MAX_MOVEMENTS),
            ...this.availableMovesByDirection(LEFT, MAX_MOVEMENTS),
            ...this.availableMovesByDirection(RIGHT, MAX_MOVEMENTS),
            ...this.availableMovesByDirection(LEFT_DOWN, MAX_MOVEMENTS),
            ...this.availableMovesByDirection(LEFT_UP, MAX_MOVEMENTS),
            ...this.availableMovesByDirection(RIGHT_DOWN, MAX_MOVEMENTS),
            ...this.availableMovesByDirection(RIGHT_UP, MAX_MOVEMENTS)
        ];
    }
}