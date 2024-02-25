import React, {useState} from 'react';
 import TextCustom from "../../../../src/components/Text/TextCustom";
import { View} from "react-native";
import LoadingOne from "../../../../src/components/Animation/LoadingOne";
import {Entypo, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {router} from "expo-router";



const index = () => {


    // return router.push({pathname : 'product/addProduct' , params : { product_id: "" ,product_code: 100016 }})

    return (
        <View className="bg-gray-200  flex-1 items-center justify-center w-full  p-10 space-y-3">
            <View className="w-full flex flex-row space-x-3">
                <View className="flex flex-col space-y-2 bg-red-200 w-1/2 justify-center items-center h-36 rounded-xl">
                    <View className="flex flex-row space-x-2">
                        <TextCustom className=" flex text-lg">گروه ها</TextCustom>
                        <FontAwesome5 name="layer-group" size={24} color="black" />
                    </View>
                    <TextCustom className="text-slate-800 flex text-2xl">1500</TextCustom>
                </View>
                <View className="flex flex-col space-y-2 bg-red-200 w-1/2 justify-center items-center h-36 rounded-xl">
                    <View className="flex flex-row space-x-2">
                        <TextCustom className=" flex text-lg">گروه ها</TextCustom>
                        <MaterialIcons name="category" size={26} color="black" />
                    </View>
                    <TextCustom className="text-slate-800 flex text-2xl">1500</TextCustom>
                </View>
            </View>
            <View className="w-full flex flex-row ">
                <View className="flex flex-col bg-red-200 w-full justify-center items-center h-36 rounded-xl">
                    <View className="flex flex-row space-x-2">
                        <TextCustom className=" flex text-lg">کالا ها</TextCustom>
                        <Entypo name="box" size={24} color="black" />
                    </View>
                    <TextCustom className="text-slate-800 flex text-2xl">1500</TextCustom>
                </View>
            </View>
        </View>
    );
}


export default index;


