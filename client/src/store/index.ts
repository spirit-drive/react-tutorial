import { configureStore, combineReducers } from '@reduxjs/toolkit'
import theme from './reducers/theme';

export const store = configureStore({
  reducer: combineReducers({
    theme
  }),
})

export type RootState = ReturnType<typeof store.getState>