import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import theme from './reducers/theme';
import lang from './reducers/lang';
import inited from './reducers/inited';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    theme,
    lang,
    inited,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>