import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../../services/httpService.js";
import {ConfigMessage} from "../../config/Config";
import formUrlEncoded from "form-urlencoded";

export const getAsyncCodeList = createAsyncThunk('code/getAsyncCodeList', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_product_code_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const postAsyncCode = createAsyncThunk('code/postAsyncCode', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "add_product_code_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const getAsyncCode = createAsyncThunk('code/getAsyncCode', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "get_product_code_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const getChangeCode = createAsyncThunk('code/getChangeCode', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            ...payload,
            action: "get_change_organization_admin"
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const addChangeCodeProduct = createAsyncThunk('code/addChangeCodeProduct', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "add_change_code_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const DeleteAsyncCode = createAsyncThunk('code/DeleteAsyncCode', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            product_code_id: payload.product_code_id,
            action: "delete_product_code_Admin"
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const listCodeInOrganization = createAsyncThunk('code/listCodeInOrganization', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            ...payload,
            action: "list_product_code_organization_admin"
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

const initialState = {
    code: {},
    getCode: {},
    changeCode: {},
    codeList: [],
    codeListSelect: [],
    count: 1,
    page: 1,
    result: {},
    loading: false,
    loadingCodeList: false,
    error: null,
    errorCodeList: null,
    listCodeInOr: [],
    resultCode: {},
    loadingDelete: false,
    errorDelete: null,
    errorList:null,
    loadingList:false,
}


const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        clearResultCode: (state) => {
            state.result = {}
        },
        clearCodeSlice: (state) => {
            state.code = false
        },
        clearResultAddCode: (state) => {
            state.resultCode = {}
        },
        clearChangeCodePro: (state) => {
            state.changeCode = {}
        },
    },


    extraReducers: (builder) => {
        builder.addCase(getAsyncCodeList.fulfilled, (state, action) => {
            return {
                ...state,
                codeList: action.payload.data?.result.product_code,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loadingList: false,
                errorList: null,
            }
        })
        builder.addCase(getAsyncCodeList.pending, (state) => {
            return {...state, codeList: [], count: 1, page: 1, loadingList: true, errorList: null}
        })
        builder.addCase(getAsyncCodeList.rejected, (state,action) => {
            return {...state, codeList: [], count: 1, page: 1, loadingList: false, errorList: ConfigMessage.error}
        })


        builder.addCase(postAsyncCode.fulfilled, (state, action) => {
            return {
                ...state,
                resultCode: action.payload,
                loading: false,
                error: null,
            }
        })
        builder.addCase(postAsyncCode.pending, (state) => {
            return {...state, resultCode: {}, loading: true, error: null}
        })
        builder.addCase(postAsyncCode.rejected, (state , action) => {
            return {...state, resultCode: action.payload, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(getAsyncCode.fulfilled, (state, action) => {
            return {
                ...state,
                code: action.payload.data.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncCode.pending, (state) => {
            return {...state, code: {}, loading: true, error: null}
        })
        builder.addCase(getAsyncCode.rejected, (state,action) => {

            return {...state, code: {}, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(getChangeCode.fulfilled, (state, action) => {
            return {
                ...state,
                getCode: action.payload.data?.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getChangeCode.pending, (state) => {
            return {...state, getCode: {}, loading: true, error: null}
        })
        builder.addCase(getChangeCode.rejected, (state,action) => {
            Toast.error( action.payload.data?.message)
            return {...state, getCode: {}, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(addChangeCodeProduct.fulfilled, (state, action) => {
            return {
                ...state,
                changeCode: action.payload,
                loading: false,
                error: null,
            }
        })
        builder.addCase(addChangeCodeProduct.pending, (state) => {
            return {...state, changeCode: {}, loading: true, error: null}
        })
        builder.addCase(addChangeCodeProduct.rejected, (state,action) => {
            return {...state, changeCode: action.payload, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(DeleteAsyncCode.fulfilled, (state, action) => {
                state.listCodeInOr = state.listCodeInOr.filter(value => value.product_code_id != action.payload.data.result)
                state.loadingDelete=false
                state.errorDelete=null
                Toast.success(action.payload.data?.message)
        })
        builder.addCase(DeleteAsyncCode.pending, (state) => {
            return {...state, loadingDelete: true, errorDelete: null}
        })
        builder.addCase(DeleteAsyncCode.rejected, (state,action) => {
            return {...state, loadingDelete: false, errorDelete: ConfigMessage.error}
        })


        builder.addCase(listCodeInOrganization.fulfilled, (state, action) => {
            return {
                ...state,
                listCodeInOr: action.payload.data?.result.product_code,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loadingCodeList: false,
                errorCodeList: null,
            }
        })
        builder.addCase(listCodeInOrganization.pending, (state) => {
            return {...state, listCodeInOr: [], count: 1, page: 1, loadingCodeList: true, errorCodeList: null}
        })
        builder.addCase(listCodeInOrganization.rejected, (state,action) => {
            return {
                ...state,
                listCodeInOr: [],
                count: 1,
                page: 1,
                loadingCodeList: false,
                errorCodeList: ConfigMessage.error
            }
        })
    }
})

export const {clearResultCode, clearCodeSlice, clearResultAddCode, clearChangeCodePro} = codeSlice.actions

export default codeSlice.reducer
