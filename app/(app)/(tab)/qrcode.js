import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet, Button, TouchableHighlight} from "react-native";
import {CameraView, Camera} from "expo-camera/next";
import TextCustom from "../../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {searchAsyncProduct} from "../../../src/features/redux/productSlice";
import ViewCustom from "../../../src/components/View/ViewCustom";
import ButtonCustomOne from "../../../src/components/Button/ButtonCustomOne";
import {Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import { router } from 'expo-router';

export default function qrcode() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState("");

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
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
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
                <View className=" space-y-5">
                    <View>
                        <ButtonCustomOne
                            title="اسکن مجدد"
                            titleSize={19}
                            color="bg-gray-500"
                            icon={<Feather name="repeat" size={24} color="white"/>}
                            operator={() => setScanned(false)}/>
                    </View>
                    <View className="bg-white rounded p-3 space-y-4">
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
                                <ViewCustom className="w-full flex justify-center items-center">
                                    <ViewCustom className="w-full bg-gray-300 rounded p-1 justify-center items-center">
                                        <TextCustom className="text-slate-800 flex text-lg">
                                            کد ({barcode}) قابل استفاده است
                                        </TextCustom>

                                        <ViewCustom className="w-full  rounded p-1 justify-center items-center mt-3">
                                            <TextCustom className="text-slate-800 flex ">این کد متعلق است
                                                به</TextCustom>
                                            <TextCustom
                                                className="text-slate-800 flex text-lg">{result.organization_title}</TextCustom>
                                        </ViewCustom>
                                    </ViewCustom>
                                    <View className="w-full mt-4">
                                        <ButtonCustomOne title="ثبت کالا با این کد" color="bg-green-500"
                                                         operator={()=>{router.push({pathname : '(form)/addProduct' , params : { product_id: "" ,product_code: barcode }})}}/>
                                    </View>
                                </ViewCustom>
                            )
                        }

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