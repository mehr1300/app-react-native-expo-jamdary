import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import http from "../../services/httpService.js";
import {ConfigMessage} from "../../config/Config";
import formUrlEncoded from 'form-urlencoded';


export const getAsyncCategoryList = createAsyncThunk('category/getAsyncCategoryList', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_product_category_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const postAsyncCategory = createAsyncThunk('category/postAsyncCategory', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "add_product_category_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncCategory = createAsyncThunk('category/getAsyncCategory', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "get_product_category_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncCategorySelect = createAsyncThunk('category/getAsyncCategorySelect', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            ...payload,
            action: "list_product_category_select_admin"
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

export const reportAsyncCategory = createAsyncThunk('category/reportAsyncCategory', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            ...payload,
            action: "report_product_category_admin"
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})


export const DeleteAsyncCategory = createAsyncThunk('category/DeleteAsyncCategory', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            action: "delete_product_category_admin",
            product_category_id: payload.product_category_id
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})

const initialState = {
    categoryList: [],
    categoryListSelect: [],
    categoryListSelectWithAll: [],
    category: {},
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


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearResult: (state) => {
            state.result = {}
        },
        clearCategorySlice: (state) => {
            state.category = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAsyncCategoryList.fulfilled, (state, action) => {
            return {
                ...state,
                categoryList: action.payload.data?.result.product_category,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loadingList: false,
                errorList: null,
            }
        })
        builder.addCase(getAsyncCategoryList.pending, (state) => {
            return {...state, categoryList: [], loadingList: true, errorList: null}
        })
        builder.addCase(getAsyncCategoryList.rejected, (state , action) => {
            return {...state, categoryList: [], loadingList: false, errorList: ConfigMessage.error}
        })

        builder.addCase(postAsyncCategory.fulfilled, (state, action) => {
            return {
                ...state,
                result: action.payload,
                loading: false,
                error: null,
            }
        })
        builder.addCase(postAsyncCategory.pending, (state) => {
            return {...state, result: {}, loading: true, error: null}
        })
        builder.addCase(postAsyncCategory.rejected, (state , action) => {
            return {...state, result: action.payload, loading: false, error: ConfigMessage.error}
        })

        builder.addCase(getAsyncCategory.fulfilled, (state, action) => {
            return {
                ...state,
                category: action.payload.data?.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncCategory.pending, (state) => {
            return {...state, category: {}, loading: true, error: null}
        })
        builder.addCase(getAsyncCategory.rejected, (state, action) => {
            Toast.error(action.payload.data?.message)
            return {...state, category: {}, loading: false, error: ConfigMessage.error}
        })

        builder.addCase(getAsyncCategorySelect.fulfilled, (state, action) => {
            return {
                ...state,
                categoryListSelect: action.payload.data.result,
                categoryListSelectWithAll: [{id: 0, value: "all", label: "همه"}, ...action.payload.data.result],
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncCategorySelect.pending, (state) => {
            return {...state, categoryListSelect: [], categoryListSelectWithAll: [], loading: true, error: null}
        })
        builder.addCase(getAsyncCategorySelect.rejected, (state, action) => {
            return {
                ...state,
                categoryListSelect: [],
                categoryListSelectWithAll: [],
                loading: false,
                error: ConfigMessage.error
            }
        })

        builder.addCase(reportAsyncCategory.fulfilled, (state, action) => {
            return {
                ...state,
                categoryList: action.payload.data?.result.product_code,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loading: false,
                error: null,
            }
        })
        builder.addCase(reportAsyncCategory.pending, (state) => {
            return {...state, categoryList: [], loading: true, error: null}
        })
        builder.addCase(reportAsyncCategory.rejected, (state, action) => {
            Toast.error(action.payload.data?.message)
            return {...state, categoryList: [], loading: false, error: ConfigMessage.error}
        })

        builder.addCase(DeleteAsyncCategory.fulfilled, (state, action) => {
                state.categoryList = state.categoryList.filter(value => value.product_category_id != action.payload.data.result)
                state.loadingDelete = false
                state.errorDelete = null
                Toast.success(action.payload.data?.message)
            }
        )
        builder.addCase(DeleteAsyncCategory.pending, (state) => {
            return {...state, loadingDelete: true, errorDelete: null}
        })
        builder.addCase(DeleteAsyncCategory.rejected, (state, action) => {
            Toast.error(action.payload.data?.message)
            return {...state, loadingDelete: false, errorDelete: ConfigMessage.error}
        })


    }
})

export const {clearCategorySlice, clearResult} = categorySlice.actions

export default categorySlice.reducer
