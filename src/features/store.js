import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from './redux/counterSlice';
import loginReducer from './redux/loginSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        login: loginReducer,
    },
});

