import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import http from "../../services/httpService.js";
import {ConfigMessage} from "../../config/Config";
import formUrlEncoded from 'form-urlencoded';



export const getAsyncGroupList = createAsyncThunk('group/getAsyncGroupList', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_product_group_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const getAsyncGroupListSelect = createAsyncThunk('group/getAsyncGroupListSelect', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            ...payload,
            action: "list_product_group_select_admin"
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const getAsyncGroup = createAsyncThunk('group/getAsyncGroup', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "get_product_group_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const postAsyncGroup = createAsyncThunk('group/postAsyncGroup', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "add_product_group_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const reportAsyncGroup = createAsyncThunk('group/reportAsyncGroup', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "report_product_group_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const DeleteAsyncGroup = createAsyncThunk('group/DeleteAsyncGroup', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            action: "delete_product_group_admin",
            product_group_id: payload.product_group_id
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


const initialState = {
    group: {},
    groupList: [],
    groupListSelect: [],
    groupListSelectWithAll: [],
    count: 1,
    page: 1,
    result: {},
    loading: false,
    error: null,
    loadingDelete: false,
    errorDelete: null,
    errorList:null,
    loadingList:false,
}


const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        clearResultGroup: (state) => {
            state.result = {}
        },
        clearGroupSlice: (state) => {
            state.group = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAsyncGroupList.fulfilled, (state, action) => {
            return {
                ...state,
                groupList: action.payload.data?.result.product_group,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loadingList: false,
                errorList: null,
            }
        })
        builder.addCase(getAsyncGroupList.pending, (state) => {
            return {...state, groupList: [], count: 1, page: 1, loadingList: true, errorList: null}
        })
        builder.addCase(getAsyncGroupList.rejected, (state , action) => {
            return {...state, groupList: [], count: 1, page: 1, loadingList: false, errorList: ConfigMessage.error}
        })


        builder.addCase(getAsyncGroupListSelect.fulfilled, (state, action) => {
            return {
                ...state,
                groupListSelect: action.payload.data?.result,
                groupListSelectWithAll: [{id: 0, value: "all", label: "همه"}, ...action.payload.data.result],
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncGroupListSelect.pending, (state) => {
            return {...state, groupListSelect: [], groupListSelectWithAll: [], loading: true, error: null}
        })
        builder.addCase(getAsyncGroupListSelect.rejected, (state, action) => {
            return {
                ...state,
                groupListSelect: [],
                loading: false,
                groupListSelectWithAll: [],
                error: ConfigMessage.error
            }
        })


        builder.addCase(getAsyncGroup.fulfilled, (state, action) => {
            return {
                ...state,
                group: action.payload.data?.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncGroup.pending, (state) => {
            return {...state, group: {}, loading: true, error: null}
        })
        builder.addCase(getAsyncGroup.rejected, (state,action) => {
            return {...state, group: {}, loading: false, error: ConfigMessage.error}
        })

        builder.addCase(postAsyncGroup.fulfilled, (state, action) => {
            return {
                ...state,
                result: action.payload,
                loading: false,
                error: null,
            }
        })
        builder.addCase(postAsyncGroup.pending, (state) => {
            return {...state, result: {}, loading: true, error: null}
        })
        builder.addCase(postAsyncGroup.rejected, (state , action) => {
            return {...state, result: action.payload, loading: false, error: ConfigMessage.error}
        })

        builder.addCase(reportAsyncGroup.fulfilled, (state, action) => {
            return {
                ...state,
                groupList: action.payload.data?.result.product_code,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loading: false,
                error: null,
            }
        })
        builder.addCase(reportAsyncGroup.pending, (state) => {
            return {...state, groupList: [], count: 1, page: 1, loading: true, error: null}
        })
        builder.addCase(reportAsyncGroup.rejected, (state,action) => {
            Toast.error(action.payload.data?.message)

            return {...state, groupList: [], count: 1, page: 1, loading: false, error: ConfigMessage.error}
        })

        builder.addCase(DeleteAsyncGroup.fulfilled, (state, action) => {

                state.groupList = state.groupList.filter(value => value.product_group_id != action.payload.data.result)
                state.loadingDelete=false
                state.errorDelete=null
                Toast.success(action.payload.data?.message)

        })
        builder.addCase(DeleteAsyncGroup.pending, (state) => {
            return {...state, loadingDelete: true, errorDelete: null}
        })
        builder.addCase(DeleteAsyncGroup.rejected, (state,action) => {
            Toast.error(action.payload.data?.message)
            return {...state, loadingDelete: false, errorDelete: ConfigMessage.error}
        })
    }
})

export const {clearGroupSlice, clearResultGroup} = groupSlice.actions

export default groupSlice.reducer
