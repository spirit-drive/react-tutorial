import { takeEvery, select, put } from 'redux-saga/effects'
import { i18n } from "i18next";
import _localization from '../../../localization';

const localization = _localization as i18n;

import { langActions } from '../../reducers/lang';
import { initedActions } from '../../reducers/inited';
import {LANG_STORAGE_KEY} from "./helpers";

const { ru, en, set, toggle } = langActions;

function* saveLang() {
  const lang = yield select(state => state.lang);
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  const html = document.querySelector('html');
  html.lang = lang;
  localization.changeLanguage(lang);
}

function* initLang() {
  const lang = yield select(state => state.lang);
  const langSaved = localStorage.getItem(LANG_STORAGE_KEY);
  const html = document.querySelector('html');
  const result = langSaved || lang;
  yield put(set(result));
  html.lang = result;
  localization.changeLanguage(result);
}

export function* langSaga() {
  yield takeEvery(ru().type, saveLang)
  yield takeEvery(en().type, saveLang)
  yield takeEvery(set().type, saveLang)
  yield takeEvery(toggle().type, saveLang)
  yield takeEvery(initedActions.init().type, initLang)
}
