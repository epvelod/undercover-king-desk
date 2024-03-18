import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers'

export default configureStore({
  reducer: {
    game: gameReducer,
  }
});