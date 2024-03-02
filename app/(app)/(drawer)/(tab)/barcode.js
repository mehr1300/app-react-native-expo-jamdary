import React, {useEffect, useState} from 'react';
import ViewCustom from "../../../../src/components/View/ViewCustom";
import TextCustom from "../../../../src/components/Text/TextCustom";
import TextInputCustom from "../../../../src/components/TextInput/TextInputCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearResultProduct, clearTypeProduct, searchAsyncProduct} from "../../../../src/features/redux/productSlice";
import {Link, router, useSegments} from "expo-router";
import LoadingOne from "../../../../src/components/Animation/LoadingOne";
import {ActivityIndicator, Keyboard, View} from "react-native";
import ButtonCustomOne from "../../../../src/components/Button/ButtonCustomOne";
import {Feather} from "@expo/vector-icons";
import ShowResultProduct from "../../../../src/components/Product/ShowResultProduct";

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

            {loading && (
                <View className="flex flex-1 justify-center items-center">
                    <ActivityIndicator size="large" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} color="#0000ff" />
                </View>
            )}

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
                <View>
                    <ShowResultProduct result={result.product}/>
                </View>
            )}


        </View>
    );
}

export default barcode;

