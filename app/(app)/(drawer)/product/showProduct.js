import React, {useEffect, useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {
    clearResultProduct,
    getAsyncProduct,
    getAsyncProductList,
    productAsync
} from "../../../../src/features/redux/productSlice";
import TextCustom from "../../../../src/components/Text/TextCustom";
import {ActivityIndicator, SafeAreaView, ScrollView, View} from "react-native";
import LoadingOne from "../../../../src/components/Animation/LoadingOne";
import Box from "../../../../src/components/Text/Box";
import {persianDateNT} from "../../../../src/utility/persianDateNT";
import TextCustomBold from "../../../../src/components/Text/TextCustomBold";
import {formatNumber} from "../../../../src/utility/formatNumber";
import ModalChangeUnit from "../../../../src/components/Product/ModalChangeUnit";
import ModalChangeCode from "../../../../src/components/Product/ModalChangeCode";
import {FontAwesome5} from "@expo/vector-icons";
import {useFocusEffect} from "@react-navigation/native";


const showProduct = () => {

    const {
        productAsyncPro,
        productAsyncProCode,
        productAsyncProUnit,
        productAsyncProOrganization,
        loadingShowProduct
    } = useSelector(state => state.product)
    const {product_id, product_code} = useLocalSearchParams()

    const dispatch = useDispatch();
    const [loadingShow , setLoadingShow] = useState(true)

    // useEffect(() => {
    //     // dispatch(clearResultProduct())
    //     dispatch(productAsync({product_code: product_code}))
    //
    //     setTimeout(()=>{
    //         setLoadingShow(false)
    //     },700)
    //
    // }, [product_code])

    useFocusEffect(
        React.useCallback(() => {
            dispatch(productAsync({product_code: product_code}))

            setTimeout(()=>{
                setLoadingShow(false)
            },700)
        }, [product_code])
    );



    return (
        <>
            {(loadingShow || loadingShowProduct ) &&
                <View className="flex flex-1 justify-center items-center">
                    <ActivityIndicator size="large" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} color="#0000ff" />
                </View>
            }
            {!loadingShowProduct && !loadingShow && productAsyncPro && (
                <SafeAreaView>
                    <ScrollView className="p-2">
                        <View  className="flex flex-1 mb-8">
                            <View className="flex flex-col p-2 w-full py-10 pr-1.5 space-y-7">
                                <TextCustomBold className="text-2xl">اطلاعات کالا : </TextCustomBold>
                                <View className="flex flex-col items-start justify-center w-full">
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

                            {productAsyncPro.product_price !== "" && productAsyncPro.product_price !== null &&
                                <View className="flex flex-col  justify-center bg-white p-2 py-4 border-t-4 border-emerald-600 rounded  w-full  dark:bg-slate-700
                   dark:border-thPurpleWith-100 ">
                                    <Box title="قیمت" response={formatNumber(productAsyncPro.product_price)}/>
                                    <Box title="زمان خرید" response={productAsyncPro.bought_time}/>
                                    <Box title="زمان اتمام گارانتی" response={productAsyncPro.bought_garanting_finish_time}/>
                                    <Box title="وضعیت خرید" response={productAsyncPro.bought_status}/>
                                </View>
                            }

                            <View className="flex flex-col  justify-center bg-white p-2 py-4 border-t-4 border-lime-500 dark:bg-slate-700 dark:border-lime-500 rounded mt-5">
                                <View className="flex flex-col space-y-3  ">
                                    <ModalChangeCode refresh={()=>router.back()} data={productAsyncPro} title="تغییر کد" classCustom="bg-lime-400 border-lime-500" icon={<FontAwesome5 name="building" size={20} color="black" />} />
                                    <TextCustomBold className="text-lg">
                                        تغییرات کد درون سازمانی :
                                    </TextCustomBold>
                                </View>

                                {productAsyncProCode == false &&
                                    <View className="flex w-full justify-center items-center">
                                        <TextCustom className="dark:text-gray-100 px-5">این کالا تغییر کد درون سازمانی نداشته است</TextCustom>
                                    </View>
                                }

                                {productAsyncProCode && productAsyncProCode.length > 0 &&
                                    <View className=" flex flex-col mt-5">
                                        <View className="flex flex-col space-y-2 relative w-full ">
                                            {productAsyncProCode && productAsyncProCode.map((val, index) => {
                                                    return (
                                                        <View key={index} className="flex flex-col space-y-3 w-full p-3 border border-gray-300 rounded-lg">
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="">کد جاری</TextCustomBold>
                                                                <TextCustom className="">{formatNumber(val.product_code_new)}</TextCustom>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="">کد قبلی</TextCustomBold>
                                                                <TextCustom className="text-green-500">{formatNumber(val.product_code_old)}</TextCustom>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="">زمان تغییر</TextCustomBold>
                                                                <TextCustom className="">{persianDateNT.date(val.product_change_code_create_time)}</TextCustom>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="">توضیحات</TextCustomBold>
                                                                <TextCustom className="">{val.product_change_code_desc != "" ? val.product_change_code_desc : "توضیحات ثبت نشده است"}</TextCustom>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    }
                            </View>


                            <View className="flex flex-col  justify-center bg-white p-2 py-4 border-t-4 border-emerald-500 dark:bg-slate-700 rounded mt-5">
                                <View className="flex flex-col space-y-5">
                                    <View className="flex flex-col space-y-3">
                                        <ModalChangeUnit refresh={()=>router.back()} data={productAsyncPro} title="تغییر کارمند" name="productAsyncProUnit" icon={<FontAwesome5 name="exchange-alt" size={20} color="black" />}/>
                                        <TextCustomBold className="text-lg">
                                            تغییرات کارمند و واحد سازمانی :
                                        </TextCustomBold>
                                    </View>
                                    {productAsyncProUnit == false &&
                                        <View className="flex w-full justify-center items-center">
                                            <TextCustom className="dark:text-gray-100 px-5">این کالا در حال حاضر تغییر واحدی نداشته است</TextCustom>
                                        </View>
                                    }


                                    {productAsyncProCode && productAsyncProCode.length > 0 &&
                                        <View className=" flex flex-col mt-5">
                                            <View className="flex flex-col space-y-2 relative w-full ">
                                                {productAsyncProUnit && productAsyncProUnit.map((va, index) => {
                                                    return (
                                                        <View key={index} className="flex flex-col space-y-3 w-full p-3 border border-gray-300 rounded-lg">
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="w-1/2">نام کارمند فعلی</TextCustomBold>
                                                                <TextCustom className="text-left w-1/2 ">{va.full_name_new}</TextCustom>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="w-1/2">نام واحد جاری</TextCustomBold>
                                                                <TextCustom className="text-left w-1/2">{va.receiver_unit_new}</TextCustom>
                                                            </View>

                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="w-1/2">نام کارمند قبلی</TextCustomBold>
                                                                <TextCustom className="text-left text-green-500 w-1/2">{va.full_name_old}</TextCustom>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="w-1/2">نام واحد قبلی</TextCustomBold>
                                                                <TextCustom className="text-left text-green-500 w-1/2">{va.receiver_unit_old}</TextCustom>
                                                            </View>

                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="w-1/2">توضیحات</TextCustomBold>
                                                                <TextCustom  className="text-justify w-1/2">{va.product_change_unit_desc}</TextCustom>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustomBold className="w-1/2">زمان جابجایی</TextCustomBold>
                                                                <TextCustom className="text-left w-1/2">{persianDateNT.date(va.product_change_unit_create_time)}</TextCustom>
                                                            </View>

                                                        </View>
                                                    )
                                                })
                                                }
                                            </View>
                                        </View>
                                    }
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


