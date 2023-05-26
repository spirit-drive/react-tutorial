import { takeEvery } from 'redux-saga/effects';
import { initializedActions } from '../initialized';
import { getToken } from './token';

export function* initializerSaga() {
  yield takeEvery(initializedActions.init().type, getToken);
}
