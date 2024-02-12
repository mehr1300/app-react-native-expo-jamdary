import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: 'false',
    },
    reducers: {
        loginUser: (state) => {
            state.login  = true
        },
        logoutUser: (state) => {
            state.login  = true
        }
    },
});

export const {logoutUser, loginUser} = loginSlice.actions;
export const selectCount = (state) => state.login.value;

export default loginSlice.reducer;
