import { createSlice } from "@reduxjs/toolkit";
import { initialBoard } from "../core/usecases/Board";
import {
  isCheck,
  move,
  pieceStrategyBehavior,
} from "../core/usecases/PieceBehavior";
import {
  BLACK_PIECE,
  EMPTY,
  WHITE_PIECE,
  getPieceColor,
} from "../core/domain/Pieces";

const board = initialBoard();

const initialState = {
  board,
  selection: {
    pieceId: -1,
    position: -1,
  },
  availableMovements: [],
  playedMovements: [],
  turn: WHITE_PIECE,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selection: (state, action) => {
      const { pieceId, position } = action.payload;
      const { board, availableMovements, playedMovements } = state;

      if (availableMovements.includes(position)) {
        state.board = move({
          board,
          from: state.selection.position,
          to: position,
          playedMovements,
        });
        state.playedMovements.push({
          pieceId,
          from: state.selection.position,
          to: position,
        });
        state.availableMovements = [];
        state.turn = state.turn === WHITE_PIECE ? BLACK_PIECE : WHITE_PIECE;
        state.selection = { pieceId: -1, position: -1 };

        console.log(isCheck(state.board, state.turn) ? "CHECK" : "NO CHECK");
      } else if (getPieceColor(pieceId) === state.turn) {
        const getAvailableMovements = pieceStrategyBehavior(pieceId);
        const availableMovements = getAvailableMovements({
          board,
          position,
          pieceId,
          playedMovements,
        });

        state.availableMovements = availableMovements || [];
        state.selection = { pieceId, position };
      }
    },
    clearSelection: (state) => {
      state.selection = { pieceId: -1, position: -1 };
      state.availableMovements = [];
    },
  },
});

export const { selection, clearSelection } = gameSlice.actions;

export default gameSlice.reducer;
