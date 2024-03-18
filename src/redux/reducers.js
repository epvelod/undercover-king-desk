import { createSlice } from '@reduxjs/toolkit';
import { initialBoard } from '../core/usecases/Board';

const board = initialBoard();

const initialState = {
  board,
  movements: [],
  selection: {
    position: -1,
    pieceId: -1,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selection: (state, action) => {
      console.log("action", action);
    },
  },
});

export const { selection } = gameSlice.actions;

export default gameSlice.reducer;
