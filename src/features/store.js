import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import loginReducer from './redux/loginSlice';
import productReducer from './redux/productSlice';
import settingReducer from './redux/settingSlice';
import groupReducer from './redux/groupSlice';
import categoryReducer from './redux/categorySlice';
import statusReducer from './redux/statusSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        login: loginReducer,
        product: productReducer,
        setting: settingReducer,
        category: categoryReducer,
        group: groupReducer,
        status: statusReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

