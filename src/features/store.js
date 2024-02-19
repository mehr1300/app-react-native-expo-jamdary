import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import loginReducer from './redux/loginSlice';
import productReducer from './redux/productSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        login: loginReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

