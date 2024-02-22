import React, {useEffect, useState} from 'react';
import TextCustom from "../../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {getAsyncProductList} from "../../../src/features/redux/productSlice";
import {SafeAreaView, ScrollView, View} from "react-native";
import {Link, useRouter} from "expo-router";

const list = () => {

    const {page, productList, count, errorList, loadingList} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const [perPage, setPerPage] = useState(50)
    const [numberPage, setNumberPage] = useState(1)
    const router = useRouter();


    useEffect(() => {
        dispatch(getAsyncProductList({row_per_page: parseInt(perPage), page_number: parseInt(numberPage)}))

    }, [perPage, numberPage])

    const test = () => {
        console.log("asdasdas")
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-4">
                {productList && productList.length > 0 && productList.map((value, index) => {
                    return (
                        <View key={value.product_code} className={` ${index % 2 === 0 ? "bg-sky-600/10" : "bg-green-600/10"} p-4 border border-gray-400 rounded mb-4 `}>
                            <View  className={`flex flex-row justify-between items-center p-1 pb-1.5 border-b-[1.5px] border-dashed ${index % 2 === 0 ? "border-sky-700" : "border-green-700"}`}>
                                <TextCustom className="text-slate-800 flex">{value.product_code}</TextCustom>
                                <TextCustom className={`text-slate-800 text-lg ${index % 2 === 0 ? "text-sky-600" : "text-green-600"} `}>
                                    {value.product_name}
                                </TextCustom>
                            </View>

                            <View className=" pt-2">

                                <TextCustom className="text-slate-800 flex">{value.organization_title}</TextCustom>

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

                           <View className="flex flex-row items-center w-full mt-2 space-x-2.5">
                               <Link className="w-1/2 text-center rounded-full py-2 px-4 bg-sky-600 text-white border-r-8 border-sky-700" href={{
                                   pathname: "(form)/addProduct",
                                   params: { id: value.product_id }
                               }}>
                                   <TextCustom>مشاهده</TextCustom>
                               </Link>
                               <Link className="w-1/2 text-center rounded-full py-2 px-4 bg-green-700 text-white border-r-8 border-green-600" href="(form)/addProduct">
                                   <TextCustom>ویرایش</TextCustom>
                               </Link>
                           </View>

                        </View>
                    )
                })}
            </ScrollView>



        </SafeAreaView>
    );
}

export default list;

