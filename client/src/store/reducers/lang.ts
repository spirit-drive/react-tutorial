import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import {RootState} from "../index";

export enum Lang {
  ru = 'ru',
  en = 'en'
}

const initialState = Lang.ru

const langSlice = createSlice<
  Lang,
  {
    set: CaseReducer<Lang, PayloadAction<Lang>>;
    ru: CaseReducer<Lang>;
    en: CaseReducer<Lang>;
    toggle: CaseReducer<Lang>;
  },
  'lang'
>({
  name: 'lang',
  initialState,
  reducers: {
    ru() {
      return Lang.ru
    },
    en() {
      return Lang.en
    },
    set(_, action: PayloadAction<Lang>) {
      return action.payload
    },
    toggle(state) {
      return state === Lang.en ? Lang.ru : Lang.en
    },
  },
})

export const langActions = langSlice.actions
export const langSelectors = {
  get: (state: RootState): RootState['lang'] => state.lang,
};

export default langSlice.reducer