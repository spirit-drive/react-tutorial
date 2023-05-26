import { put, select, takeEvery } from 'redux-saga/effects';
import { RootState } from '../../index';
import { TOKEN_KEY, tokenActions, tokenSelectors } from '../../token';
import { storage } from '../../../utils/storage';
import { client } from '../../../client';
import { profileActions } from '../../profile';
import { GET_PROFILE, extractGetProfile } from './connections';
import { TokenChannel } from './TokenChannel';

const tokenChannel = new TokenChannel('token-saver-channel');

export function* setToken() {
  const token = yield select<(state: RootState) => RootState['token']>(tokenSelectors.get);
  tokenChannel.setToken(token);
  if (token) {
    storage.set(TOKEN_KEY, token);
    const { data: res } = yield client.query({ query: GET_PROFILE });
    yield put(profileActions.set(extractGetProfile(res)));
  }
}
export function* clearToken() {
  storage.remove(TOKEN_KEY);
  tokenChannel.setToken(null);
  yield put(profileActions.set(null));
}

export function* getToken() {
  const token = storage.get(TOKEN_KEY);
  yield put(tokenActions.set(token));
}

export function* tokenSaga() {
  yield takeEvery(tokenActions.logout().type, clearToken);
  yield takeEvery(tokenActions.set().type, setToken);
}
