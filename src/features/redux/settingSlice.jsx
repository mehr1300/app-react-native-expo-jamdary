import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../../services/httpService"
import {Config, ConfigMessage} from "../../config/Config";
import formUrlEncoded from "form-urlencoded";
import axios from "axios";

export const getAsyncSettingList = createAsyncThunk('setting/getAsyncSettingList', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_setting_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const addAsyncSetting = createAsyncThunk('setting/addAsyncSetting', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", arrayObjectToFromDataNT(payload, "edit_setting_admin"))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const getAsyncSettingIndex = createAsyncThunk('setting/getAsyncSettingIndex', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({action: 'get_setting_index'}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const aboutLicense = createAsyncThunk('setting/aboutLicense', async (payload, {rejectWithValue}) => {
    try {
        const result = await axios.post(Config.apiLicense, formUrlEncoded({...payload, action: 'license_verify'}))
        const value = result?.data;
        return await value;

    } catch (error) {
        return rejectWithValue([], error.message)
    }
})
export const SupportExtension = createAsyncThunk('setting/SupportExtension', async (payload, {rejectWithValue}) => {
    try {
        const result = await axios.get(Config.linkSupportExtension+Config.license_key)
        const value = result?.data;
        return await value;

    } catch (error) {
        return rejectWithValue([], error.message)
    }
})
const initialState = {
    index: {},
    profile: {},
    change: {},
    setting: {},
    settingList: [],
    settingListSelect: [],
    count: 1,
    page: 1,
    result: {},
    loading: false,
    error: null,
    aboutLicenseState: {},
    SupportExtensionIn:{}
}


const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        clearResultSetting: (state) => {
            state.result = {}
        },
        clearSettingSlice: (state) => {
            state.setting = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAsyncSettingList.fulfilled, (state, action) => {
            return {
                ...state,
                setting: action.payload?.data?.result,
                loading: false,
                error: false,
            }
        })
        builder.addCase(getAsyncSettingList.pending, (state) => {
            return {...state, setting: {}, loading: true, error: false}
        })
        builder.addCase(getAsyncSettingList.rejected, (state, action) => {
            return {...state, setting: {}, loading: false, error: true}
        })


        builder.addCase(addAsyncSetting.fulfilled, (state, action) => {
            return {...state, result: action.payload, loading: false, error: false,}
        })
        builder.addCase(addAsyncSetting.pending, (state) => {
            return {...state, result: {}, loading: true, error: false}
        })
        builder.addCase(addAsyncSetting.rejected, (state, action) => {
            return {...state, result: action.payload, loading: false, error: true}
        })


        builder.addCase(getAsyncSettingIndex.fulfilled, (state, action) => {
            return {
                ...state,
                index: action.payload?.data?.result,
                loading: false,
                error: false,
            }
        })
        builder.addCase(getAsyncSettingIndex.pending, (state) => {
            return {...state, index: {}, loading: true, error: false}
        })
        builder.addCase(getAsyncSettingIndex.rejected, (state, action) => {
            return {...state, index: {}, loading: false, error: true}
        })

        builder.addCase(aboutLicense.fulfilled, (state, action) => {
            return {
                ...state,
                aboutLicenseState: action.payload?.result,
                loading: false,
                error: false,
            }
        })
        builder.addCase(aboutLicense.pending, (state) => {
            return {...state, aboutLicenseState: {}, loading: true, error: false}
        })
        builder.addCase(aboutLicense.rejected, (state) => {
            return {...state, aboutLicenseState: {}, loading: false, error: true}
        })
        builder.addCase(SupportExtension.fulfilled, (state, action) => {
            return {
                ...state,
                SupportExtensionIn: action.payload.result,
                loading: false,
                error: false,
            }
        })
        builder.addCase(SupportExtension.pending, (state) => {
            return {...state, SupportExtensionIn: {}, loading: true, error: false}
        })
        builder.addCase(SupportExtension.rejected, (state) => {
            return {...state, SupportExtensionIn: {}, loading: false, error: true}
        })
    }


})

export const {clearResultSetting, clearSettingSlice} = settingSlice.actions

export default settingSlice.reducer
