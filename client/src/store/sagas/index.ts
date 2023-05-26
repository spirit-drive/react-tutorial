import { all, put, takeEvery, select, SelectEffect, PutEffect } from 'redux-saga/effects';
import { storage } from 'src/utils/storage';
import { profileActions } from '../profile';
import { TOKEN_KEY, tokenActions, tokenSelectors } from '../token';
import { initializedActions } from '../initialized';
import { RootState } from '../index';

export function* clearByToken(): Generator<void | SelectEffect | PutEffect, void, string> {
  storage.remove(TOKEN_KEY);
  yield put(profileActions.set(null));
}

export function* setToken(): Generator<void | SelectEffect | PutEffect, void, string> {
  const token = yield select<(state: RootState) => RootState['token']>(tokenSelectors.get);
  if (token) {
    storage.set(TOKEN_KEY, token);
  }
}

export function* getToken(): Generator<void | SelectEffect | PutEffect, void, string> {
  const token = storage.get(TOKEN_KEY);
  yield put(tokenActions.set(token));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function* tokenSaga() {
  yield takeEvery(tokenActions.logout().type, clearByToken);
  yield takeEvery(tokenActions.set().type, setToken);
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function* initializerSaga() {
  yield takeEvery(initializedActions.init().type, getToken);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export default function* rootSaga() {
  yield all([tokenSaga(), initializerSaga()]);
}
