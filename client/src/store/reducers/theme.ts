import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

export enum Theme {
  dark = 'dark',
  light = 'light'
}

const initialState = Theme.light

const themeSlice = createSlice({
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
  },
})

export const { light, dark, set } = themeSlice.actions
export default themeSlice.reducer