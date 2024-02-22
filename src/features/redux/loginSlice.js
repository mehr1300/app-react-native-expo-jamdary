import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import formUrlEncoded from "form-urlencoded";
import http from "../../services/httpService"



export const postAsyncLogin = createAsyncThunk('login/postAsyncLoginPhone', async (payload,
                                                                                   {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "login"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: false,
        islogin: false,
        loading : false
    },
    reducers: {
        clearLogin: (state) => {
            state.login = false
        },
        loginUser: (state) => {
            state.islogin = true
        },
    },
    extraReducers: (builder) => {

        builder.addCase(postAsyncLogin.fulfilled, (state, action) => {
            return {...state, login: action.payload, loading: false, error: null}
        })
        builder.addCase(postAsyncLogin.pending, (state) => {
            return {...state, login: false, loading: true, error: null}
        })
        builder.addCase(postAsyncLogin.rejected, (state, action) => {
            return {...state, login: action.payload, loading: false, error: null}
        })


    }
});

export const {clearLogin,loginUser} = loginSlice.actions;
export const selectCount = (state) => state.login.value;

export default loginSlice.reducer;
