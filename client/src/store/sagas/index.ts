import { all } from 'redux-saga/effects'
import { themeSaga } from './theme';

export default function* rootSaga() {
  yield all([
    themeSaga(),
  ])
}