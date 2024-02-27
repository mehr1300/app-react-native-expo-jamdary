import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet, Button, TouchableHighlight} from "react-native";
import {CameraView, Camera} from "expo-camera/next";
import TextCustom from "../../../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearResultProduct, clearTypeProduct, searchAsyncProduct} from "../../../../src/features/redux/productSlice";
import ViewCustom from "../../../../src/components/View/ViewCustom";
import ButtonCustomOne from "../../../../src/components/Button/ButtonCustomOne";
import {Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Link, router, useSegments} from 'expo-router';
import TextCustomBold from "../../../../src/components/Text/TextCustomBold";

export default function qrcode() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState("");
    const segments = useSegments();

    useEffect(() => {
        dispatch(clearResultProduct())
        dispatch(clearTypeProduct())
        setBarcode("")
        setScanned(false)
    }, [segments])

    useEffect(() => {

        const getCameraPermissions = async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getCameraPermissions();
    }, []);

    const {type, loading, result} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        const barcode = data.split("/")[1]
        setBarcode(barcode);
        dispatch(searchAsyncProduct({product_code: barcode}))
    };

    if (hasPermission === null) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <TextCustomBold className="text-xl text-yellow-600">درخواست مجوز دوربین</TextCustomBold>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View className="flex flex-1 justify-center items-center">
                <TextCustomBold className="text-xl text-red-500">بدون دسترسی به دوربین</TextCustomBold>
            </View>
        );
    }


    return (
        <View className="flex-1 justify-center items-center">

            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{barCodeTypes: ["qr", "pdf417"],}}
                style={StyleSheet.absoluteFillObject}
            />

            {!scanned && (
                <View className="flex-1 w-full opacity-70 justify-center items-center space-y-5">
                    <MaterialCommunityIcons name="scan-helper" size={300} color="white"/>
                </View>
            )}

            {scanned && (
                <View className="space-y-5 px-6">
                    <View>
                        <ButtonCustomOne
                            title="اسکن مجدد"
                            titleSize={19}
                            color="bg-gray-500"
                            icon={<Feather name="repeat" size={24} color="white"/>}
                            operator={() => setScanned(false)}/>
                    </View>
                    <View className="bg-white rounded space-y-4">
                        {loading &&
                            <View>
                                <TextCustom className="text-slate-800 flex text-lg">در حال در یافت
                                    اطلاعات...</TextCustom>
                            </View>
                        }

                        {type === "code_not_valid" && setTimeout(() => {
                        }, 2000) && (
                            <ViewCustom className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                                <TextCustom className="text-slate-800 flex text-lg">این کد برای هیچ سازمانی ثبت نشده
                                    است</TextCustom>
                            </ViewCustom>
                        )}

                        {type === "new_code" &&
                            (
                                <View className="w-full flex justify-center items-center p-2 rounded-lg">
                                    <View className="w-full bg-gray-300 rounded p-1 justify-center items-center">
                                        <TextCustom className="text-slate-800 flex text-lg">
                                            کد ({barcode}) قابل استفاده است
                                        </TextCustom>

                                        <View className="w-full  rounded p-1 justify-center items-center mt-3">
                                            <TextCustom className="text-slate-800 flex ">این کد متعلق است
                                                به</TextCustom>
                                            <TextCustom
                                                className="text-slate-800 flex text-lg">{result.organization_title}</TextCustom>
                                        </View>
                                    </View>
                                    <View className="w-full mt-4">
                                        <ButtonCustomOne title="ثبت کالا با این کد" color="bg-green-500"
                                                         operator={() => {
                                                             router.push({
                                                                 pathname: 'product/addProduct',
                                                                 params: {product_id: "", product_code: barcode}
                                                             })
                                                         }}/>
                                    </View>
                                </View>
                            )
                        }

                        {type === "exist_product" && setTimeout(() => {
                        }, 500) && (

                            <View className={`bg-sky-600/10 p-4 border border-gray-400 rounded w-full`}>
                                <View
                                    className={`flex flex-row justify-between items-center p-1 pb-1.5 border-b-[1.5px] border-dashed border-sky-700`}>
                                    <TextCustom
                                        className="text-slate-800 flex">{result.product.product_code}</TextCustom>
                                    <TextCustom
                                        className={`text-slate-800 text-lg text-sky-600`}>
                                        {result.product.product_name}
                                    </TextCustom>
                                </View>

                                <View className=" pt-2">

                                    <TextCustom
                                        className="text-slate-800 flex">{result.product.organization_title}</TextCustom>

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
                                                    product_id: result?.product?.product_id,
                                                    product_code: result?.product?.product_code
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
                                                    product_id: result?.product?.product_id,
                                                    product_code: result?.product?.product_code
                                                }
                                            }}>
                                            <TextCustom>ویرایش</TextCustom>
                                        </Link>
                                    </View>
                                </View>
                            </View>
                        )}


                    </View>
                </View>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});