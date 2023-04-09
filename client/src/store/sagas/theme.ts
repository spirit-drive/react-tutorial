import { takeEvery, select } from 'redux-saga/effects'

import { Theme, themeActions } from '../reducers/theme';
import { initedActions } from '../reducers/inited';

const { light, dark, set, toggle } = themeActions;

const KEY = 'theme';

function* saveTheme() {
  const theme = yield select(state => state.theme);
  localStorage.setItem(KEY, theme);
  const html = document.querySelector('html');
  html.classList.remove(...Object.keys(Theme))
  html.classList.add(theme);
}

function* initTheme() {
  const theme = yield select(state => state.theme);
  const themeSaved = localStorage.getItem(KEY);
  const html = document.querySelector('html');
  html.classList.remove(...Object.keys(Theme))
  html.classList.add(themeSaved || theme);
}

export function* themeSaga() {
  yield takeEvery(light().type, saveTheme)
  yield takeEvery(dark().type, saveTheme)
  yield takeEvery(set().type, saveTheme)
  yield takeEvery(toggle().type, saveTheme)
  yield takeEvery(initedActions.init().type, initTheme)
}
