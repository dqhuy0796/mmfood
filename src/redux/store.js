import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import preloadReducer from './reducers/preloadReducer';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'cart'],
};

const rootReducer = combineReducers({
    cart: cartReducer,
    api: preloadReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
