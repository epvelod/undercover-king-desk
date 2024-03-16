import PieceBehavior, { LEFT_DOWN, LEFT_UP, RIGHT_DOWN, RIGHT_UP } from "./PieceBehavior";

export default class BishopBehavior extends PieceBehavior{
    constructor(game, position, team) {
        super(game, position, team);
    }

    actionArea() {
        return [
            ...this.availableMovesByDirection(LEFT_DOWN),
            ...this.availableMovesByDirection(LEFT_UP),
            ...this.availableMovesByDirection(RIGHT_DOWN),
            ...this.availableMovesByDirection(RIGHT_UP)
        ];
    }
}