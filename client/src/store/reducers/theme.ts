import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import {RootState} from "../index";

export enum Theme {
  dark = 'dark',
  light = 'light'
}

const initialState = Theme.light

const themeSlice = createSlice<
  Theme,
  {
    set: CaseReducer<Theme, PayloadAction<Theme>>;
    light: CaseReducer<Theme>;
    dark: CaseReducer<Theme>;
    toggle: CaseReducer<Theme>;
  },
  'theme'
>({
  name: 'theme',
  initialState,
  reducers: {
    light() {
      return Theme.light
    },
    dark() {
      return Theme.dark
    },
    set(_, action: PayloadAction<Theme>) {
      return action.payload
    },
    toggle(state) {
      return state === Theme.dark ? Theme.light : Theme.dark
    },
  },
})

export const themeActions = themeSlice.actions
export const themeSelectors = {
  get: (state: RootState): RootState['theme'] => state.theme,
};

export default themeSlice.reducer