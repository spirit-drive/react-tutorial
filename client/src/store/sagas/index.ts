import { all } from 'redux-saga/effects'
import { themeSaga } from './theme';
import { langSaga } from './lang';

export default function* rootSaga() {
  yield all([
    themeSaga(),
    langSaga(),
  ])
}