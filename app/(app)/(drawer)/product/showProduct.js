import React, {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";

import {useDispatch, useSelector} from "react-redux";
import {clearResultProduct, getAsyncProduct, productAsync} from "../../../../src/features/redux/productSlice";
import TextCustom from "../../../../src/components/Text/TextCustom";
import {SafeAreaView, ScrollView, View} from "react-native";
import LoadingOne from "../../../../src/components/Animation/LoadingOne";
import Box from "../../../../src/components/Text/Box";
import {persianDateNT} from "../../../../src/utility/persianDateNT";
import TextCustomBold from "../../../../src/components/Text/TextCustomBold";


const showProduct = () => {

    const {
        productAsyncPro,
        productAsyncProCode,
        productAsyncProUnit,
        productAsyncProOrganization,
        loading
    } = useSelector(state => state.product)
    const {product_id, product_code} = useLocalSearchParams()

    const dispatch = useDispatch();
    const [loadingShow , setLoadingShow] = useState(true)

    useEffect(() => {
        // dispatch(clearResultProduct())
        dispatch(productAsync({product_code: product_code}))

        setTimeout(()=>{
            setLoadingShow(false)
        },700)

    }, [product_code])


    return (
        <>
            {(loadingShow || loading ) && <LoadingOne/>}
            {!loading && !loadingShow && productAsyncPro && (
                <SafeAreaView>
                    <ScrollView className="p-4">
                        <View  className="flex flex-1">
                            <View className="flex flex-col items-end justify-center w-full py-10 pr-1.5 space-y-7">
                                <TextCustomBold className="text-2xl">اطلاعات کالا : </TextCustomBold>
                                <View className="flex flex-col items-end justify-center w-full">
                                    <Box title="کد کالا" response={productAsyncPro.product_code}/>
                                    <Box title="نام سازمان" response={productAsyncPro.organization_title}/>
                                    <Box title="نام کالا" response={productAsyncPro.product_name}/>
                                    <Box title="گروه" response={productAsyncPro.product_group_title}/>
                                    <Box title="واحد گیرنده" response={productAsyncPro.receiver_unit}/>
                                    <Box title="گیرنده" response={productAsyncPro.receiver_user}/>
                                    <Box title="دسته" response={productAsyncPro.product_category_title}/>
                                    <Box title="وضعیت" response={productAsyncPro.product_status_title}/>
                                    <Box title="ثبت شده توسط" response={productAsyncPro.registration_admin}/>
                                    <Box title="زمان ثبت" response={persianDateNT.date(productAsyncPro.registration_create_time)}/>
                                    <Box title="زمان اپدیت" response={persianDateNT.date(productAsyncPro.registration_update_time)}/>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>

            )}
        </>
    );
}

export default showProduct;


