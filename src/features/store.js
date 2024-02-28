import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import loginReducer from './redux/loginSlice';
import productReducer from './redux/productSlice';
import settingReducer from './redux/settingSlice';
import groupReducer from './redux/groupSlice';
import categoryReducer from './redux/categorySlice';
import statusReducer from './redux/statusSlice';
import profileReducer from './redux/profileSlice';
import codeReducer from './redux/codeSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        login: loginReducer,
        product: productReducer,
        setting: settingReducer,
        category: categoryReducer,
        group: groupReducer,
        status: statusReducer,
        profile: profileReducer,
        code: codeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

