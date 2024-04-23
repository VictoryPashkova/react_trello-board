import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cardReducer from './app/cardsSlice';
import modalReducer from './app/modalsSlice';
import authReducer from './user/authSlice';

const rootReducer = combineReducers({
  user: authReducer,
  modals: modalReducer,
  cards: cardReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cards'],
  blacklist: ['modals'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
