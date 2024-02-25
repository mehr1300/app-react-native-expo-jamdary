import React, {useEffect, useState} from 'react';
import {Modal, Pressable, TextInput, TouchableHighlight, View} from "react-native";
import TextCustom from "../Text/TextCustom";
import {AntDesign} from "@expo/vector-icons";

const SelectOption = ({formik,formikAddress,name,title,options,defaultTitle = "انتخاب کنید", defaultValue = "",color = "bg-blue-500"}) => {

    const [modal,setModal] = useState({show: false , data : false})

    const select = (value) => {
        setModal({data: value,show : false})
        formik.setFieldValue(name,value.value)
    }

    useEffect(() => {
        setModal({data: false,show : false})
        if (formikAddress !== undefined) {
            if (formikAddress !== "") {
                const get = options.find((item) => item.value === formikAddress)
                if (get !== undefined) {
                    setModal({show: false , data : get })

                }
            } else {
                const get = options.find((item, index) => index === 0)
                if (get !== undefined) {
                    formik.setFieldValue(name, get.value)
                    setModal({show: false , data : get})
                }
            }
        }
    }, [formikAddress, options]);

    return (
        <View className="w-full">

            <TouchableHighlight className="w-full" onPress={()=>setModal({...modal,show : true})} underlayColor="white">
                <View className={`${color} flex flex-row space-x-2 rounded p-3 w-full justify-center items-center`}>
                    <TextCustom className=" text-white">{modal.data ? modal.data.label : defaultTitle}</TextCustom>
                    <TextInput className="hidden text-white">{modal.data ? modal.data.value : defaultValue}</TextInput>
                </View>
            </TouchableHighlight>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.show}>

                <View className="w-full flex-1 justify-center items-center p-6 rounded">
                    <View className="bg-gray-400 rounded-2xl shadow-2xl p-4 py-5 w-full flex flex-col space-y-3">
                        <View className="flex flex-row justify-between items-center">
                            <AntDesign onPress={()=>setModal({...modal,show : false})} name="closesquareo" size={24} color="black" />
                            <TextCustom className=" text-gray-700 text-lg">{title}</TextCustom>
                        </View>
                        {options && options?.length > 0 && options?.map((value,index)=>{
                            return (
                                <TouchableHighlight className="w-full" key={index} onPress={()=>select(value)} underlayColor="white">
                                    <View className={`${color} flex flex-row space-x-2 rounded p-2 w-full justify-center items-center`}>
                                        <TextCustom className="text-white">{value.label}</TextCustom>
                                    </View>
                                </TouchableHighlight>
                            )

                        })}


                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SelectOption;