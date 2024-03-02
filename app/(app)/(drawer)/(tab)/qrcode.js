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
import ShowResultProduct from "../../../../src/components/Product/ShowResultProduct";

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
                            <View>
                                <ShowResultProduct result={result.product}/>
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