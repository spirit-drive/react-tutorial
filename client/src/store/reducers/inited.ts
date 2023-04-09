import { createSlice } from '@reduxjs/toolkit'
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import {RootState} from "../index";

const initialState = false

const initedSlice = createSlice<
  boolean,
  {
    init: CaseReducer<boolean>;
  },
  'inited'
>({
  name: 'inited',
  initialState,
  reducers: {
    init() {
      return true
    },
  },
})

export const initedActions = initedSlice.actions
export const initedSelectors = {
  get: (state: RootState): RootState['inited'] => state.inited,
};

export default initedSlice.reducer