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

export const postAsyncLogOut = createAsyncThunk('login/postAsyncLogOut', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "logout"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const postAsyncCheckedLogin = createAsyncThunk('login/postAsyncCheckedLogin', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "check_login"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        logOut: {},
        checkedLogin: {},
        login: false,
        isLogin: false,
        loading : false
    },
    reducers: {
        clearLogin: (state) => {
            state.login = false
        },
        loginUser: (state) => {
            state.isLogin = true
        },
        clearLoginVerification: (state) => {
            state.loginVerification = false
        },
        clearLogOut: (state) => {
            state.logOut = false
        },
        checkedLoginSlice: (state) => {
            state.checkedLogin = false
        }
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

        builder.addCase(postAsyncLogOut.fulfilled, (state, action) => {
            return {...state, logOut: action.payload, loading: false, error: null}
        })

        builder.addCase(postAsyncLogOut.pending, (state) => {
            return {...state, logOut: false, loading: true, error: null}
        })
        builder.addCase(postAsyncLogOut.rejected, (state, action) => {
            return {...state, logOut: action.payload, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(postAsyncCheckedLogin.fulfilled, (state, action) => {
            return {...state, checkedLogin: action.payload}
        })

        builder.addCase(postAsyncCheckedLogin.pending, (state) => {
            return {...state, checkedLogin: false}
        })
        builder.addCase(postAsyncCheckedLogin.rejected, (state, action) => {
            return {...state, checkedLogin: action.payload}
        })

    }
});

export const {clearLogin,
    loginUser,
    clearLoginVerification,
    clearLogOut,
    checkedLoginSlice
} = loginSlice.actions;
export const selectCount = (state) => state.login.value;

export default loginSlice.reducer;
