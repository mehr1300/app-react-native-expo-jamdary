import React, {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import TextCustom from "../../../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearLogin, loginUser, postAsyncLogin} from "../../../../src/features/redux/loginSlice";
import {Formik, useFormik} from "formik";
import {Button, Modal, SafeAreaView, ScrollView, TextInput, ToastAndroid, View} from "react-native";
import {getAsyncGroupListSelect} from "../../../../src/features/redux/groupSlice";
import {getAsyncStatusSelect} from "../../../../src/features/redux/statusSlice";
import SelectOption from "../../../../src/components/SelectOption/SelectOption";
import TextInputCustomOne from "../../../../src/components/TextInput/TextInputCustomOne";
import * as yup from "yup";
import ButtonCustomOne from "../../../../src/components/Button/ButtonCustomOne";
const addProduct = () => {

    const {product, result, resultSearch, loading, organizationUserInAddProduct} = useSelector(state => state.product)
    const {categoryListSelect} = useSelector(state => state.category)
    const {statusListSelect} = useSelector(state => state.status)
    const {groupListSelect} = useSelector(state => state.group)
    const dispatch = useDispatch();
    const {product_id, product_code} = useLocalSearchParams()
    const [loadingShow , setLoadingShow] = useState(true)


    useEffect(() => {
        setLoadingShow(true)
        dispatch(clearProductSlice())
        if (product_id !== '') {
            dispatch(getAsyncProduct({product_id: product_id}))
        }else {
            dispatch(searchAsyncProductAdd({product_code: product_code}))
        }

        setTimeout(()=>{
            setLoadingShow(false)
        },1000)

    }, [product_id,product_code])

    useEffect(() => {
        dispatch(getAsyncGroupListSelect())
        dispatch(getAsyncStatusSelect())
    }, [])

    const initialValues = {
        product_code: product_code,
        product_name: "",
        product_group_id: "",
        product_category_id: "",
        product_status_id: "",
        receiver_user_id: "",
        description: "",
        product_price: "",
        bought_time: "",
        receiver_unit: "",
        bought_status: "نو با گارانتی",
        bought_garanting_finish_time: "",
        application : "app",
    }

    const onSubmit = (values) => {
        dispatch(postAsyncProduct(values))
    }

    const validationSchema = yup.object({
        product_name: yup.string().required("نام کاربری را وارد کنید"),

    })

    const formik = useFormik({
        initialValues: product || initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        enableReinitialize : true
    });

    useEffect(() => {
        dispatch(getAsyncCategorySelect({product_group_id: formik.values.product_group_id}))
    }, [formik.values.product_group_id])


    const showToastWithGravityAndOffset = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };

    useEffect(() => {
        if (result.status !== undefined) {
            if (result.status === 200) {
                showToastWithGravityAndOffset(result?.data?.message)
                dispatch(clearResultProduct())
                setTimeout(() => {
                    router.back();
                }, 1000)
            } else {
                showToastWithGravityAndOffset(result?.data?.message)
                dispatch(clearResultProduct())

            }
        }
    }, [result])

    useEffect(() => {
        formik.resetForm()
    },[])


    return (
        <>
            {loadingShow   && <LoadingOne/>}
            {!loadingShow && (
                <SafeAreaView>
                    <ScrollView className="p-5">
                        {/*<View className=""></View>*/}

                        <View className="w-full flex flex-col space-y-5 mb-20">
                            <View className="w-full flex flex-col space-y-4">
                                <View className="flex justify-center items-center bg-gray-400 rounded p-2 w-full">
                                    <TextCustom className="text-white text-xl">
                                        کد :
                                        {formik.values.product_code}
                                    </TextCustom>
                                </View>
                                <View>
                                    <TextInputCustomOne name="product_name" title="نام محصول" formik={formik}/>
                                </View>
                                <View>
                                    <TextCustom>گروه محصول</TextCustom>
                                    <SelectOption formikAddress={formik.values.product_group_id} name="product_group_id" title="گروه کالا" options={groupListSelect} formik={formik}/>
                                </View>

                                <View>
                                    <TextCustom>دسته محصول</TextCustom>
                                    <SelectOption formikAddress={formik.values.product_group_id} name="product_category_id" title="دسته محصول" options={categoryListSelect} formik={formik}/>
                                </View>

                                <View>
                                    <TextCustom>وضعیت محصول</TextCustom>
                                    <SelectOption formikAddress={formik.values.product_group_id} name="product_status_id" title="وضعیت محصول" options={statusListSelect} formik={formik}/>
                                </View>

                                <View>
                                    <TextCustom> کارمند - انبار</TextCustom>
                                    <SelectOption formikAddress={formik.values.product_group_id} name="receiver_user_id"  title=" کارمند - انبار" options={organizationUserInAddProduct} formik={formik}/>
                                </View>
                                <View>
                                    <TextInputCustomOne name="receiver_unit" title="واحد" formik={formik}/>
                                </View>

                                <View>
                                    <TextInputCustomOne name="product_price" title="قیمت کالا" formik={formik}/>
                                </View>

                                <View>
                                    <TextInputCustomOne name="bought_status" title="وضعیت در زمان خرید" formik={formik}/>
                                </View>

                                <View>
                                    <TextInputCustomOne name="bought_time" title="زمان نسبی خرید" formik={formik}/>
                                </View>

                                <View>
                                    <TextInputCustomOne name="bought_garanting_finish_time" title="زمان اتمام گارانتی " formik={formik}/>
                                </View>

                            </View>
                            <View className="w-full ">
                                <ButtonCustomOne title={product_id === "" ? "ثبت اطلاعات" : "ثبت ویرایش"} operator={formik.handleSubmit} color="bg-green-500"/>
                            </View>


                        </View>

                    </ScrollView>
                </SafeAreaView>
            )}
        </>

);
}
import {
    clearProductSlice,
    clearResultProduct,
    getAsyncProduct, postAsyncProduct,
    searchAsyncProductAdd
} from "../../../../src/features/redux/productSlice";
import {getAsyncCategorySelect} from "../../../../src/features/redux/categorySlice";


import LoadingOne from "../../../../src/components/Animation/LoadingOne";

export default addProduct;


