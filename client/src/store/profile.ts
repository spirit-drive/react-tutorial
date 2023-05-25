import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'src/server.types';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { RootState } from './index';

export const profileSlice = createSlice<Profile, { set: CaseReducer<Profile, PayloadAction<Profile>> }, 'profile'>({
  name: 'profile',
  initialState: null,
  reducers: {
    set: (_, action: PayloadAction<Profile>) => action.payload,
  },
});

export const profileActions = profileSlice.actions;

export const profileSelectors = {
  get: (state: RootState): RootState['profile'] => state.profile,
};

export const profile = profileSlice.reducer;
