import React, {useEffect, useState} from 'react';
import ViewCustom from "../../../../src/components/View/ViewCustom";
import TextCustom from "../../../../src/components/Text/TextCustom";
import TextInputCustom from "../../../../src/components/TextInput/TextInputCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearResultProduct, clearTypeProduct, searchAsyncProduct} from "../../../../src/features/redux/productSlice";
import {Link, router, useSegments} from "expo-router";
import LoadingOne from "../../../../src/components/Animation/LoadingOne";
import {Keyboard, View} from "react-native";
import ButtonCustomOne from "../../../../src/components/Button/ButtonCustomOne";
import {Feather} from "@expo/vector-icons";

const barcode = () => {


    const [barcode, setBarcode] = useState("")

    const {type, loading, result} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const searchBarcode = () => {
        dispatch(searchAsyncProduct({product_code: barcode}))
        Keyboard.dismiss()
    }

    const segments = useSegments();

    useEffect(() => {
        dispatch(clearResultProduct())
        dispatch(clearTypeProduct())
        setBarcode("")
    }, [segments])


    return (
        <View className="bg-gray-200  flex-1 items-center justify-center w-full p-6 space-y-4">
            <View className="bg-white w-full py-8 px-4 space-y-4 rounded-2xl">
                <TextInputCustom value={barcode} onChangeText={(barcode) => {
                    setBarcode(barcode)
                }} keyboardType='numeric' className="border border-gray-400 w-full p-1.5 rounded"/>
                <View className="w-full mt-3">
                    <ButtonCustomOne title="جستجوی بارکد"
                                     icon={<Feather name="search" size={24} color="white"/>}
                                     color="bg-blue-500" titleSize={26} operator={() => {
                        searchBarcode()
                    }}/>
                </View>
            </View>

            {type === "code_not_valid" && setTimeout(() => {
            }, 2000) && (
                <ViewCustom className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                    <TextCustom className="text-slate-800 flex text-lg">این کد برای هیچ سازمانی ثبت نشده
                        است</TextCustom>
                </ViewCustom>
            )}

            {loading && (<LoadingOne/>)}

            {type === "new_code" &&
                (
                    <ViewCustom className="w-full flex justify-center items-center">
                        <ViewCustom className="w-full bg-gray-300 rounded p-1 justify-center items-center">
                            <TextCustom className="text-slate-800 flex text-lg">این کد قابل استفاده است</TextCustom>

                            <ViewCustom className="w-full  rounded p-1 justify-center items-center mt-3">
                                <TextCustom className="text-slate-800 flex ">این کد متعلق است</TextCustom>
                                <TextCustom
                                    className="text-slate-800 flex text-lg">{result.organization_title}</TextCustom>
                            </ViewCustom>
                        </ViewCustom>
                        <View className="w-full mt-3">
                            <ButtonCustomOne title="ثبت کالا با این کد" color="bg-green-500"
                                             operator={() => {
                                                 router.push({
                                                     pathname: 'product/addProduct',
                                                     params: {product_id: "", product_code: barcode}
                                                 })
                                             }}/>
                        </View>
                    </ViewCustom>
                )
            }


            {type === "exist_product" && setTimeout(() => {
            }, 500) && (

                <View className={`bg-sky-600/10 p-4 border border-gray-400 rounded w-full`}>
                    <View
                        className={`flex flex-row justify-between items-center p-1 pb-1.5 border-b-[1.5px] border-dashed border-sky-700`}>
                        <TextCustom className="text-slate-800 flex">{result.product.product_code}</TextCustom>
                        <TextCustom
                            className={`text-slate-800 text-lg text-sky-600`}>
                            {result.product.product_name}
                        </TextCustom>
                    </View>

                    <View className=" pt-2">

                        <TextCustom className="text-slate-800 flex">{result.product.organization_title}</TextCustom>

                        <View className=" pt-2">
                            <TextCustom className="text-slate-800 flex">
                                <TextCustom className="text-gray-600"> گروه :</TextCustom>
                                <TextCustom>{result.product.product_group_title}</TextCustom>
                            </TextCustom>
                            <TextCustom className="text-slate-800 flex">
                                <TextCustom className="text-gray-600">دسته :</TextCustom>
                                <TextCustom>  {result.product.product_category_title}</TextCustom>
                            </TextCustom>
                            <TextCustom className="text-slate-800 flex">
                                <TextCustom className="text-gray-600">وضعیت :</TextCustom>
                                <TextCustom>{result.product.product_status_title}</TextCustom>
                            </TextCustom>
                        </View>
                    </View>

                    <View className="flex flex-row items-center w-full mt-2">
                       <View className="w-1/2 pr-1">
                           <Link
                               className="w-full text-center rounded-full py-2 px-4 bg-sky-600 text-white border-r-8 border-sky-700"
                               href={{
                                   pathname: "product/showProduct",
                                   params: {
                                       product_id: result.product.product_id,
                                       product_code: result.product.product_code
                                   }
                               }}>
                               <TextCustom>مشاهده</TextCustom>
                           </Link>
                       </View>
                        <View className="w-1/2 pl-1">
                            <Link
                                className="w-full text-center rounded-full py-2 px-4 bg-green-700 text-white border-r-8 border-green-600"
                                href={{
                                    pathname: "product/addProduct",
                                    params: {
                                        product_id: result.product.product_id,
                                        product_code: result.product.product_code
                                    }
                                }}>
                                <TextCustom>ویرایش</TextCustom>
                            </Link>
                        </View>
                    </View>

                </View>

            )}


        </View>
    );
}

export default barcode;

