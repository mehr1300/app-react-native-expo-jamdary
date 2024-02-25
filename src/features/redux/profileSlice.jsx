import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ConfigMessage} from "../../config/Config";
import formUrlEncoded from "form-urlencoded";
import http from "../../services/httpService"


export const getAsyncProfileAdmin = createAsyncThunk('profile/getAsyncProfileAdmin', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            ...payload, action: "get_profile_admin"
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const dashboardAsync = createAsyncThunk('profile/dashboardAsync', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_dashboard_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const sidebarItemAsync = createAsyncThunk('profile/sidebarItemAsync', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "sidebar_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const getAsyncChangePasswordProfile = createAsyncThunk('profile/getAsyncChangePasswordProfile', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "change_password_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

const initialState = {
    profile: {},
    dashboardAs: {},
    sidebarItem: [],
    password: false,
    loading: false,
    error: null,

}


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfileProduct: (state) => {
            state.result = {}
        },
        clearProfileSlice: (state) => {
            state.profile = false
        },
        clearPassword: (state) => {
            state.password = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAsyncProfileAdmin.fulfilled, (state, action) => {
            return {
                ...state,
                profile: action.payload.data?.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncProfileAdmin.pending, (state) => {
            return {...state, profile: {}, loading: true, error: null}
        })
        builder.addCase(getAsyncProfileAdmin.rejected, (state, action) => {
            Toast.error(action.payload.data?.result)
            return {...state, profile: {}, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(dashboardAsync.fulfilled, (state, action) => {
            return {
                ...state,
                dashboardAs: action.payload.data?.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(dashboardAsync.pending, (state) => {
            return {...state, dashboardAs: {}, loading: true, error: null}
        })
        builder.addCase(dashboardAsync.rejected, (state, action) => {
            Toast.error(action.payload.data?.result)
            return {...state, dashboardAs: {}, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(sidebarItemAsync.fulfilled, (state, action) => {
            return {
                ...state,
                sidebarItem: action.payload.data.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(sidebarItemAsync.pending, (state) => {
            return {...state, sidebarItem: [], loading: true, error: null}
        })
        builder.addCase(sidebarItemAsync.rejected, (state, action) => {
            Toast.error(action.payload.data?.message)
            return {...state, sidebarItem: [], loading: false, error: ConfigMessage.error}
        })

        builder.addCase(getAsyncChangePasswordProfile.fulfilled, (state, action) => {
            return {...state, password: action.payload, loading: false, error: false}
        })
        builder.addCase(getAsyncChangePasswordProfile.pending, (state) => {
            return {...state, loading: true, error: null}
        })
        builder.addCase(getAsyncChangePasswordProfile.rejected, (state,action) => {
            return {...state,password: action.payload, loading: false, error: ConfigMessage.error}
        })

    }
})

export const {clearPassword,clearProfileProduct, clearProfileSlice} = profileSlice.actions

export default profileSlice.reducer
