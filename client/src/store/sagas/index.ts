import { all } from 'redux-saga/effects'
import { langSaga } from './lang';

export default function* rootSaga() {
  yield all([
    langSaga(),
  ])
}