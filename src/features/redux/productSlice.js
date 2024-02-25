import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ConfigMessage} from "../../config/Config";
import formUrlEncoded from "form-urlencoded";
import http from "../../services/httpService"

export const getAsyncProductList = createAsyncThunk('product/getAsyncProductList', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_product_admin"}))

        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getAsyncProduct = createAsyncThunk('product/getAsyncProduct', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "get_product_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const postAsyncProduct = createAsyncThunk('product/postAsyncProduct', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "add_product_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const searchAsyncProduct = createAsyncThunk('product/searchAsyncProduct', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "search_product_code_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const searchAsyncProductAdd = createAsyncThunk('product/searchAsyncProductAdd', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            ...payload,
            action: "get_product_code_for_add_product_admin",
            product_code: payload.product_code
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const ListProductDeleteAdmin = createAsyncThunk('product/ListProductDeleteAdmin', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "list_product_delete_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getProductDeleteAdmin = createAsyncThunk('product/getProductDeleteAdmin', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "get_product_delete_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteProductDeleteAdmin = createAsyncThunk('product/deleteProductDeleteAdmin', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            action: "delete_product_delete_admin",
            product_delete_id: payload.product_delete_id
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const getUnitChangAsync = createAsyncThunk('product/getUnitChangAsync', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            action: "get_change_unit_admin",
            product_id: payload.product_id
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteProductInlistProduct = createAsyncThunk('product/deleteProductInlistProduct', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            action: "delete_product_delete_admin",
            product_id: payload.product_id
        }))
        const value = result.data;
        return await value;
    } catch (error) {
        return rejectWithValue([], error.message)
    }
})
export const addUniteProduct = createAsyncThunk('product/addUniteProduct', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "add_change_unit_admin"}))

        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const deleteProductInListProduct = createAsyncThunk('product/deleteProductInListProduct', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            action: "delete_product_admin",
            product_id: payload.product_id
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const bakeButtonInProductRecycleBin = createAsyncThunk('product/bakeButtonInProductRecycleBin', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({
            action: "back_product_delete_to_product_admin",
            product_delete_id: payload.product_delete_id
        }))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const productAsync = createAsyncThunk('product/productAsync', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "get_product_details_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
export const searchAsyncProductName = createAsyncThunk('product/searchAsyncProductName', async (payload, {rejectWithValue}) => {
    try {
        const result = await http.post("", formUrlEncoded({...payload, action: "search_product_name_admin"}))
        return await result;
    } catch (error) {
        return rejectWithValue(error.response, error.message)
    }
})
const initialState = {
    product: false,
    changeUnitProduct: [],
    changeOrganization: {},
    changeUnitProductUser: [],
    resultSearch: null,
    productList: [],
    productGet: [],
    productSelect: [],
    count: 1,
    page: 1,
    result: {},
    loading: false,
    error: null,
    type: "",
    productRecycleBinDelete: [],
    organizationUserInAddProduct: [],
    unitChangePro: {},
    productAsyncPro: {},
    productAsyncProImage: [],
    productAsyncProCode: [],
    productAsyncProOrganization: [],
    productAsyncProUnit: [],
    loadingDelete: false,
    errorDelete: null,
    loadingBack: false,
    errorBack: null,
    loadingRecycle: false,
    errorRecycle: null,
    errorList: null,
    loadingList: false,
    errorListDeleteAdmin: null,
    loadingListDeleteAdmin: false,
    searchProductName: false
}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearResultProduct: (state) => {
            state.result = {}
        },
        clearTypeProduct: (state) => {
            state.type = ""
        },
        clearProductSlice: (state) => {
            state.product = false
            state.organizationUserInAddProduct = false
        },
        clearResultSearchProduct: (state) => {
            state.resultSearch = false
            state.loading = false
            state.error = null
        },
        clearUnitChangePro: (state) => {
            state.unitChangePro = {}
        },
        clearProductName: (state) => {
            state.searchProductName = false
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getAsyncProductList.fulfilled, (state, action) => {
            return {
                ...state,
                productList: action.payload.data?.result.product_code,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loadingList: false,
                errorList: false,
            }
        })
        builder.addCase(getAsyncProductList.pending, (state) => {
            return {...state, productList: [], count: 1, page: 1, loadingList: true, errorList: false}
        })
        builder.addCase(getAsyncProductList.rejected, (state, action) => {
            return {...state, productList: [], count: 1, page: 1, loadingList: false, errorList: true}
        })


        builder.addCase(postAsyncProduct.fulfilled, (state, action) => {

            return {
                ...state,
                result: action.payload,
                loading: false,
                error: false,
            }
        })
        builder.addCase(postAsyncProduct.pending, (state) => {

            return {...state, result: {}, loading: true, error: false}
        })
        builder.addCase(postAsyncProduct.rejected, (state, action) => {

            return {...state, result: action.payload, loading: false, error: true}
        })

        builder.addCase(getAsyncProduct.fulfilled, (state, action) => {
            return {
                ...state,
                product: action.payload.data?.result.data,
                organizationUserInAddProduct: action.payload.data?.result.user,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getAsyncProduct.pending, (state) => {
            return {...state, product: {}, organizationUserInAddProduct: [], loading: true, error: null}
        })
        builder.addCase(getAsyncProduct.rejected, (state, action) => {
            return {
                ...state,
                product: {},
                organizationUserInAddProduct: [],
                loading: false,
                error: ConfigMessage.error
            }
        })


        builder.addCase(searchAsyncProduct.fulfilled, (state, action) => {
            return {
                ...state,
                type: action.payload.data?.result.type,
                result: action.payload.data?.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(searchAsyncProduct.pending, (state) => {
            return {...state, type: {}, result: {}, loading: true, error: null}
        })
        builder.addCase(searchAsyncProduct.rejected, (state, action) => {
            return {...state, type: {}, result: {}, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(searchAsyncProductAdd.fulfilled, (state, action) => {
            return {
                ...state,
                resultSearch: action.payload,
                organizationUserInAddProduct: action.payload.data?.result.organization_user,
                loading: false,
                error: null,
            }
        })
        builder.addCase(searchAsyncProductAdd.pending, (state) => {
            return {...state, organizationUserInAddProduct: [], resultSearch: null, loading: true, error: null}
        })
        builder.addCase(searchAsyncProductAdd.rejected, (state, action) => {
            return {
                ...state,
                resultSearch: action.payload,
                organizationUserInAddProduct: [],
                loading: false,
                error: ConfigMessage.error
            }
        })


        builder.addCase(ListProductDeleteAdmin.fulfilled, (state, action) => {
            return {
                ...state,
                productRecycleBinDelete: action.payload.data?.result.product,
                count: action.payload.data?.result.count,
                page: action.payload.data?.result.page,
                loadingListDeleteAdmin: false,
                errorListDeleteAdmin: null,
            }
        })
        builder.addCase(ListProductDeleteAdmin.pending, (state) => {
            return {
                ...state,
                productRecycleBinDelete: [],
                count: 1,
                page: 1,
                loadingListDeleteAdmin: true,
                errorListDeleteAdmin: null
            }
        })
        builder.addCase(ListProductDeleteAdmin.rejected, (state, action) => {
            return {
                ...state,
                productRecycleBinDelete: [],
                count: 1,
                page: 1,
                loadingListDeleteAdmin: false,
                errorListDeleteAdmin: ConfigMessage.error
            }
        })

        builder.addCase(getProductDeleteAdmin.fulfilled, (state, action) => {
            return {
                ...state,
                productGet: action.payload.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getProductDeleteAdmin.pending, (state) => {
            return {...state, productGet: [], loading: true, error: null}
        })
        builder.addCase(getProductDeleteAdmin.rejected, (state) => {
            return {...state, productGet: [], loading: false, error: ConfigMessage.error}
        })

        builder.addCase(deleteProductDeleteAdmin.fulfilled, (state, action) => {
            state.productRecycleBinDelete = state.productRecycleBinDelete.filter(value => value.product_delete_id != action.payload.data?.result)
            state.loadingRecycle = false
            state.errorRecycle = null
            Toast.success(action.payload.data?.message)
        })
        builder.addCase(deleteProductDeleteAdmin.pending, (state) => {
            return {...state, loadingRecycle: true, errorRecycle: null}
        })
        builder.addCase(deleteProductDeleteAdmin.rejected, (state) => {
            return {...state, loadingRecycle: false, errorRecycle: ConfigMessage.error}
        })

        builder.addCase(getUnitChangAsync.fulfilled, (state, action) => {
            return {
                ...state,
                changeUnitProduct: action.payload.data?.result,
                changeUnitProductUser: action.payload.data?.result.organization_user,
                loading: false,
                error: null,
            }
        })
        builder.addCase(getUnitChangAsync.pending, (state) => {
            return {...state, changeUnitProduct: [], changeUnitProductUser: [], loading: true, error: null}
        })
        builder.addCase(getUnitChangAsync.rejected, (state, action) => {
            return {
                ...state,
                changeUnitProduct: [],
                loading: false,
                changeUnitProductUser: [],
                error: ConfigMessage.error
            }
        })

        builder.addCase(addUniteProduct.fulfilled, (state, action) => {
            return {
                ...state,
                unitChangePro: action.payload,
                loading: false,
                error: null,
            }
        })
        builder.addCase(addUniteProduct.pending, (state) => {
            return {...state, unitChangePro: {}, loading: true, error: null}
        })
        builder.addCase(addUniteProduct.rejected, (state, action) => {

            return {...state, unitChangePro: action.payload, loading: false, error: ConfigMessage.error}
        })


        builder.addCase(deleteProductInListProduct.fulfilled, (state, action) => {
            state.productList = state.productList.filter(value => value.product_id != action.payload.data.result)
            Toast.success(action.payload.data?.message)
            state.loadingDelete = false
            state.errorDelete = null

        })
        builder.addCase(deleteProductInListProduct.pending, (state) => {
            return {...state, loadingDelete: true, errorDelete: null}
        })
        builder.addCase(deleteProductInListProduct.rejected, (state, action) => {
            return {...state, loadingDelete: false, errorDelete: ConfigMessage.error}
        })


        builder.addCase(bakeButtonInProductRecycleBin.fulfilled, (state, action) => {
            state.productRecycleBinDelete = state.productRecycleBinDelete.filter(value => value.product_delete_id != action.payload.data?.result)
            state.loadingBack = false
            state.errorBack = null
            Toast.success(action.payload.data?.message)
        })
        builder.addCase(bakeButtonInProductRecycleBin.pending, (state) => {
            return {...state, loadingBack: true, errorBack: null}
        })
        builder.addCase(bakeButtonInProductRecycleBin.rejected, (state, action) => {
            return {...state, loadingBack: false, errorBack: ConfigMessage.error}
        })

        builder.addCase(productAsync.fulfilled, (state, action) => {
            return {
                ...state,
                productAsyncPro: action.payload.data?.result.data,
                productAsyncProImage: action.payload.data?.result.image,
                productAsyncProCode: action.payload.data?.result.log_change_code,
                productAsyncProOrganization: action.payload.data?.result.log_change_organization,
                productAsyncProUnit: action.payload.data?.result.log_change_unit,
                loading: false,
                error: null,
            }
        })
        builder.addCase(productAsync.pending, (state) => {
            return {
                ...state,
                productAsyncPro: {},
                productAsyncProImage: [],
                productAsyncProCode: [],
                productAsyncProOrganization: [],
                productAsyncProUnit: [],
                loading: true,
                error: null
            }
        })
        builder.addCase(productAsync.rejected, (state, action) => {
            return {
                ...state,
                productAsyncPro: {},
                productAsyncProImage: [],
                productAsyncProCode: [],
                productAsyncProOrganization: [],
                productAsyncProUnit: [],
                loading: false,
                error: ConfigMessage.error
            }
        })

        builder.addCase(searchAsyncProductName.fulfilled, (state, action) => {
            return {
                ...state,
                searchProductName: action.payload.data.result,
                loading: false,
                error: null,
            }
        })
        builder.addCase(searchAsyncProductName.pending, (state) => {
            return {...state, searchProductName: false, loading: true, error: null}
        })
        builder.addCase(searchAsyncProductName.rejected, (state) => {
            return {...state, searchProductName: false, loading: false, error: ConfigMessage.error}
        })
    }
})

export const {
    clearResultProduct,
    clearProductSlice,
    clearTypeProduct,
    clearResultSearchProduct,
    clearUnitChangePro,
    clearProductName
} = productSlice.actions

export default productSlice.reducer
