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
import {formatNumber} from "../../../../src/utility/formatNumber";
import ModalChangeUnit from "../../../../src/components/Product/ModalChangeUnit";
import ModalChangeCode from "../../../../src/components/Product/ModalChangeCode";
import {FontAwesome5} from "@expo/vector-icons";


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

    useEffect(() => {
        // dispatch(clearResultProduct())
        dispatch(productAsync({product_code: product_code}))

        setTimeout(()=>{
            setLoadingShow(false)
        },700)

    }, [product_code])


    return (
        <>
            {(loadingShow || loadingShowProduct ) && <LoadingOne/>}
            {!loadingShowProduct && !loadingShow && productAsyncPro && (
                <SafeAreaView>
                    <ScrollView className="p-4">
                        <View  className="flex flex-1 mb-8">
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

                            {productAsyncPro.product_price !== "" && productAsyncPro.product_price !== null &&
                                <View className="flex flex-col items-end justify-center bg-white p-3 border-t-4 border-emerald-600 rounded  w-full  dark:bg-slate-700
                   dark:border-thPurpleWith-100 ">
                                    <Box title="قیمت" response={formatNumber(productAsyncPro.product_price)}/>
                                    <Box title="زمان خرید" response={productAsyncPro.bought_time}/>
                                    <Box title="زمان اتمام گارانتی" response={productAsyncPro.bought_garanting_finish_time}/>
                                    <Box title="وضعیت خرید" response={productAsyncPro.bought_status}/>
                                </View>
                            }

                            <View className="flex flex-col items-end justify-center bg-white p-3 border-t-4 border-lime-500 dark:bg-slate-700 dark:border-lime-500 rounded mt-5">
                                <View className="flex flex-col space-y-3 items-end ">
                                    <ModalChangeCode refresh={()=>dispatch(productAsync({product_code: product_code}))} data={productAsyncPro} title="تغییر کد" classCustom="bg-lime-400 border-lime-500" icon={<FontAwesome5 name="building" size={20} color="black" />} />
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
                                                                <TextCustom className="">{formatNumber(val.product_code_new)}</TextCustom>
                                                                <TextCustomBold className="">کد جاری</TextCustomBold>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom className="text-green-500">{formatNumber(val.product_code_old)}</TextCustom>
                                                                <TextCustomBold className="">کد قبلی</TextCustomBold>

                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom className="">{persianDateNT.date(val.product_change_code_create_time)}</TextCustom>
                                                                <TextCustomBold className="">زمان تغییر</TextCustomBold>

                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom className="">{val.product_change_code_desc != "" ? val.product_change_code_desc : "توضیحات ثبت نشده است"}</TextCustom>
                                                                <TextCustomBold className="">توضیحات</TextCustomBold>

                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    }
                            </View>


                            <View className="flex flex-col items-end justify-center bg-white p-3 border-t-4 border-emerald-500 dark:bg-slate-700 rounded mt-5">
                                <View className="flex flex-col space-y-5">
                                    <View className="flex flex-col space-y-3 items-end justify-end">
                                        <ModalChangeUnit refresh={()=>dispatch(productAsync({product_code: product_code}))} data={productAsyncPro} title="تغییر واحد" name="productAsyncProUnit" icon={<FontAwesome5 name="exchange-alt" size={20} color="black" />}/>
                                        <TextCustomBold className="text-lg">
                                            تغییرات واحد سازمانی :
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
                                                                <TextCustom className="">{va.full_name_new != "" ? va.full_name_new : "نام واحد ثبت نشده است"}</TextCustom>
                                                                <TextCustomBold style={{width: "60%"}} className="">نام کارمند فعلی</TextCustomBold>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom className="">{va.receiver_unit_new != "" ? va.receiver_unit_new : "نام واحد ثبت نشده است"}</TextCustom>
                                                                <TextCustomBold style={{width: "60%"}} className="">نام واحد جاری</TextCustomBold>
                                                            </View>

                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom className="text-green-500">{va.full_name_old != "" ? va.full_name_old : "نام واحد ثبت نشده است"}</TextCustom>
                                                                <TextCustomBold style={{width: "60%"}} className="">نام کارمند قبلی</TextCustomBold>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom className="text-green-500">{va.receiver_unit_old != "" ? va.receiver_unit_old : "نام واحد ثبت نشده است"}</TextCustom>
                                                                <TextCustomBold style={{width: "50%"}} className="">نام واحد قبلی</TextCustomBold>
                                                            </View>

                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom style={{width: "60%"}}  className="text-justify">{va.product_change_unit_desc != "" ? va.product_change_unit_desc : "توضیحات ثبت نشده است"}</TextCustom>
                                                                <TextCustomBold className="">توضیحات</TextCustomBold>
                                                            </View>
                                                            <View className="flex flex-row justify-between items-center w-full">
                                                                <TextCustom className="">{persianDateNT.date(va.product_change_unit_create_time)}</TextCustom>
                                                                <TextCustomBold className="">زمان جابجایی</TextCustomBold>
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


