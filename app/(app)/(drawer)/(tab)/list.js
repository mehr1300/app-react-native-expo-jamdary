import React, {useEffect, useState} from 'react';
import TextCustom from "../../../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {getAsyncProductList} from "../../../../src/features/redux/productSlice";
import {Text, SafeAreaView, ScrollView, View, ActivityIndicator} from "react-native";
import {Link, useRouter} from "expo-router";
import LoadingOne from "../../../../src/components/Animation/LoadingOne";
import { useFocusEffect } from '@react-navigation/native';

const list = () => {

    const {page, productList, count, errorList, loadingList} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const [perPage, setPerPage] = useState(50)
    const [numberPage, setNumberPage] = useState(1)
    const router = useRouter();
    const [loadingShow, setLoadingShow] = useState(true)

    // useEffect(() => {
    //     console.log("list")
    //     dispatch(getAsyncProductList({row_per_page: parseInt(perPage), page_number: parseInt(numberPage)}))
    //
    //     setTimeout(() => {
    //         setLoadingShow(false)
    //     }, 700)
    //
    // }, [perPage, numberPage])

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getAsyncProductList({row_per_page: parseInt(perPage), page_number: parseInt(numberPage)}))
            setTimeout(() => {
                setLoadingShow(false)
            }, 700)
        }, [perPage, numberPage])
    );

    return (
        <>
            {loadingList && !errorList &&
                <View className="flex flex-1 justify-center items-center">
                    <ActivityIndicator size="large" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} color="#0000ff" />
                </View>}
            {!loadingList && productList && productList.length === 0 && (
                <View className="flex-1 justify-center items-center">
                    <TextCustom>کالایی یافت نشد.</TextCustom>
                </View>
            )}
            {errorList && (
                <View className="flex-1 justify-center items-center">
                    <TextCustom>خطا در مرحله در دریافت اطلاعات.</TextCustom>
                </View>
            )}
            {!loadingList && productList && productList.length > 0 &&
                <SafeAreaView>
                    <ScrollView className="p-4 mb-20">

                        {productList && productList.length > 0 && productList.map((value, index) => {
                            return (
                                <View key={value.product_code}
                                      className={` ${index % 2 === 0 ? "bg-sky-600/10" : "bg-green-600/10"} p-4 border border-gray-400 rounded mb-4 `}>
                                    <View
                                        className={`flex flex-row justify-between items-center p-1 pb-1.5 border-b-[1.5px] border-dashed ${index % 2 === 0 ? "border-sky-700" : "border-green-700"}`}>
                                        <TextCustom
                                            className={`text-slate-800 text-lg ${index % 2 === 0 ? "text-sky-600" : "text-green-600"} `}>
                                            {value.product_name}
                                        </TextCustom>
                                        <TextCustom className="text-slate-800 flex">{value.product_code}</TextCustom>
                                    </View>

                                    <View className=" pt-2">

                                        <TextCustom
                                            className="text-slate-800 flex">{value.organization_title}</TextCustom>

                                        <View className=" pt-2">
                                            <TextCustom className="text-slate-800 flex">
                                                <TextCustom className="text-gray-600"> گروه :</TextCustom>
                                                <TextCustom>{value.product_group_title}</TextCustom>
                                            </TextCustom>
                                            <TextCustom className="text-slate-800 flex">
                                                <TextCustom className="text-gray-600">دسته :</TextCustom>
                                                <TextCustom>  {value.product_category_title}</TextCustom>
                                            </TextCustom>
                                            <TextCustom className="text-slate-800 flex">
                                                <TextCustom className="text-gray-600">وضعیت :</TextCustom>
                                                <TextCustom>{value.product_status_title}</TextCustom>
                                            </TextCustom>
                                        </View>
                                    </View>

                                    <View className="flex flex-row items-center w-full mt-2">

                                        <View className="w-1/2 pr-1">
                                            <Link className="w-full text-center rounded-full py-2 px-4 bg-green-700 text-white border-r-8 border-green-600"
                                                href={{
                                                    pathname: "product/addProduct",
                                                    params: {
                                                        product_id: value.product_id,
                                                        product_code: value.product_code
                                                    }
                                                }}>
                                                <TextCustom>ویرایش</TextCustom>
                                            </Link>
                                        </View>
                                        <View className="w-1/2 pr-1">
                                            <Link className="w-full text-center rounded-full py-2 px-4 bg-sky-600 text-white border-r-8 border-sky-700"
                                                href={{
                                                    pathname: "product/showProduct",
                                                    params: {
                                                        product_id: value.product_id,
                                                        product_code: value.product_code
                                                    }
                                                }}>
                                                <TextCustom>مشاهده</TextCustom>
                                            </Link>
                                        </View>
                                    </View>

                                </View>
                            )
                        })}
                    </ScrollView>
                </SafeAreaView>
            }
        </>
    );
}

export default list;


