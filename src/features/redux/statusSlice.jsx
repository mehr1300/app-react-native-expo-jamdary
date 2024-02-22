import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../../services/httpService"
import { ConfigMessage} from "../../config/Config";
import formUrlEncoded from "form-urlencoded";

export const getAsyncStatusList = createAsyncThunk('status/getAsyncStatusList', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_product_status_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const postAsyncStatus = createAsyncThunk('status/postAsyncStatus', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "add_product_status_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const getAsyncStatus = createAsyncThunk('status/getAsyncStatus', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "get_product_status_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const getAsyncStatusSelect = createAsyncThunk('status/getAsyncStatusSelect', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
                ...payload,
                action: "list_product_status_select_admin"
            }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const reportAsyncStatus = createAsyncThunk('status/reportAsyncStatus', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "report_product_status_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const changeAsyncStatus = createAsyncThunk('status/changeAsyncStatus', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "change_product_status_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const DeleteAsyncStatus = createAsyncThunk('status/DeleteAsyncStatus', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
                action: "delete_product_status_admin",
                product_status_id: payload.product_status_id
            }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

const initialState = {
    status: {},
    statusList: [],
    statusListSelect: [],
    statusListSelectWithAll: [],
    count: 1,
    page: 1,
    result: {},
    loading: false,
    loadingDelete: false,
    error: null,
    errorList:null,
    loadingList:false,
}


const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        clearResultStatus: (state) => {
            state.result = {}
        },
        clearStatusSlice: (state) => {
            state.status = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAsyncStatusList.fulfilled, (state, action) => {
            return {
                ...state,
                statusList: action.payload.data?.result.product_category,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loadingList: false,
                errorList: null,
            }
        })
        builder.addCase(getAsyncStatusList.pending, (state) => {
            return {...state, statusList: [], count: 1, page: 1, loadingList: true, errorList: null}
        })
        builder.addCase(getAsyncStatusList.rejected, (state , action) => {
            Toast.error( action.payload.data?.message)
            return {...state, statusList: [], count: 1, page: 1, loadingList: false, errorList: ConfigMessage.error}
        })

        builder.addCase(getAsyncStatus.fulfilled, (state, action) => {
            return {
                ...state,
                status: action.payload.data?.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncStatus.pending, (state) => {
            return {...state, status: false, loading: true, error: null}
        })
        builder.addCase(getAsyncStatus.rejected, (state,action) => {
            return {...state, status: false, loading: false, error: ConfigMessage.error}
        })

        builder.addCase(getAsyncStatusSelect.fulfilled, (state, action) => {
            return {
                ...state,
                statusListSelect: action.payload.data?.result,
                statusListSelectWithAll: [{id: 0, value: "all", label: "همه"}, ...action.payload.data.result],
                count: action.payload.data.result.count,
                page: action.payload.data.result.page,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncStatusSelect.pending, (state) => {
            return {...state, statusListSelect: [], statusListSelectWithAll: [], loading: true, error: null}
        })
        builder.addCase(getAsyncStatusSelect.rejected, (state,action) => {
            return {
                ...state,
                statusListSelect: [],
                statusListSelectWithAll: [],
                loading: false,
                error: ConfigMessage.error
            }
        })

        builder.addCase(postAsyncStatus.fulfilled, (state, action) => {
            return {
                ...state,
                result: action.payload,
                loading: false,
                error: null,
            }
        })
        builder.addCase(postAsyncStatus.pending, (state) => {
            return {...state, result: {}, loading: true, error: null}
        })
        builder.addCase(postAsyncStatus.rejected, (state , action) => {
            return {...state, result: action.payload, loading: false, error: ConfigMessage.error}
        })

        builder.addCase(reportAsyncStatus.fulfilled, (state, action) => {
            return {
                ...state,
                statusList: action.payload.data?.result.product_code,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loading: false,
                error: null,
            }
        })
        builder.addCase(reportAsyncStatus.pending, (state) => {
            return {...state, statusList: [], count: 1, page: 1,loading: true, error: null}
        })
        builder.addCase(reportAsyncStatus.rejected, (state , action) => {
            Toast.error( action.payload.data?.message)
            return {...state, statusList: [], count: 1, page: 1,loading: false, error: ConfigMessage.error}
        })


        builder.addCase(changeAsyncStatus.fulfilled, (state, action) => {
            return {
                ...state,
                result: action.payload,
                loading: false,
                error: null,
            }
        })
        builder.addCase(changeAsyncStatus.pending, (state) => {
            return {...state, result: {}, loading: true, error: null}
        })
        builder.addCase(changeAsyncStatus.rejected, (state , action) => {
            return {...state, result: action.payload, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(DeleteAsyncStatus.fulfilled, (state, action) => {
                state.statusList = state.statusList.filter(value => value.product_status_id != action.payload.data?.result)
                state.loadingDelete=false
                state.errorDelete=null
                Toast.success(action.payload.data?.message)
        })

        builder.addCase(DeleteAsyncStatus.pending, (state) => {
            return {...state,  loadingDelete: true, errorDelete: null}
        })
        builder.addCase(DeleteAsyncStatus.rejected, (state,action) => {
            return {...state, loadingDelete: false, errorDelete: ConfigMessage.error}
        })

    }
})

export const {clearResultStatus, clearStatusSlice} = statusSlice.actions

export default statusSlice.reducer
