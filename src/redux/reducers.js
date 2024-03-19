import { createSlice } from '@reduxjs/toolkit';
import { initialBoard } from '../core/usecases/Board';
import { pieceStrategyBehavior } from '../core/usecases/PieceBehavior';
import { BLACK_PIECE, EMPTY, WHITE_PIECE, getPieceColor } from '../core/domain/Pieces';

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
  name: 'game',
  initialState,
  reducers: {
    selection: (state, action) => {
      const { pieceId, position } = action.payload;
      const { board, availableMovements, playedMovements } = state;

      if (availableMovements.includes(position)) {
        const { pieceId: previousPieceId, position: previousPosition } = state.selection;

        board[position] = previousPieceId;
        board[previousPosition] = EMPTY;

        state.availableMovements = [];
        state.playedMovements.push([previousPosition, position]);
        state.turn = state.turn === WHITE_PIECE ? BLACK_PIECE : WHITE_PIECE;
        state.selection = { pieceId: -1, position: -1 };
      } else if (getPieceColor(pieceId) === state.turn) {
        const getAvailableMovements = pieceStrategyBehavior(pieceId);
        const availableMovements = getAvailableMovements({ board, position, pieceId, playedMovements });

        state.availableMovements = availableMovements || [];
        state.selection = { pieceId, position };
      }

    },
  },
});

export const { selection } = gameSlice.actions;

export default gameSlice.reducer;
