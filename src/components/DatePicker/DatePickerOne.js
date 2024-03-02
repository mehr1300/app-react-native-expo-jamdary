import React, {useCallback, useState} from 'react';
import DatePicker, {Calendar} from "react-native-jalali-persian-date-picker";
import {useFonts} from "expo-font";
import {SplashScreen} from "expo-router";
import TextCustom from "../Text/TextCustom";
import {Modal, ScrollView, TextInput, TouchableHighlight, View} from "react-native";
import {styled} from "nativewind";
import {AntDesign, Entypo, FontAwesome5} from "@expo/vector-icons";
const StyledTextInput = styled(TextInput)


const DatePickerOne = ({title,name,formik,formikAddress}) => {

    const [modal,setModal] = useState({show: false , data : formikAddress !== "" ? formikAddress : undefined })

    const [fontsLoaded, fontError] = useFonts({
        yekanRegular: require("../../../assets/fonts/IRANYekanX-Regular.ttf"),
        yekanBold: require("../../../assets/fonts/IRANYekanX-Bold.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const font = {fontFamily:'yekanRegular'}

    const select = (value) => {
        setModal({data: value,show : false})
        formik.setFieldValue(name,value.value)
    }
    
    const selectDate = (date) => {
        formik.setFieldValue(name, date)
        setModal({data:date ,show : false})
    }

    return (
        <View className="w-full">
            <TextCustom>{title}</TextCustom>

            <TouchableHighlight className="w-full" onPress={()=>setModal({...modal,show : true})} underlayColor="white">
                <View className={`bg-gray-100 flex flex-row space-x-2 rounded p-1.5 w-full justify-between border border-gray-400`}>
                    <FontAwesome5 style={{color : "#6e6e6e"}} name="calendar-alt" size={26} color="black" />
                    <View className="">
                        <TextCustom className="text-gray-600 p-1">{modal.data}</TextCustom>
                        <TextInput className="hidden text-white">{modal.data}</TextInput>
                    </View>
                </View>
            </TouchableHighlight>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.show}>
                <View className="w-full flex-1 justify-center items-center p-6 rounded bg-white/70">
                    <View className="bg-white rounded-2xl p-6 w-full flex flex-col space-y-3 border-2 border-gray-100">
                        <View className="flex flex-row justify-between items-center">
                            <TextCustom className=" text-gray-700 text-lg">{title}</TextCustom>
                            <TouchableHighlight  onPress={()=>setModal({...modal,show : false})} underlayColor="white">
                                <AntDesign name="closesquareo" size={24} color="black" />
                            </TouchableHighlight>
                        </View>
                        <Calendar value={modal.data}  onChange={(date) => selectDate(date)} />
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default DatePickerOne;