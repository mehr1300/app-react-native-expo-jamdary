import React, {useEffect, useState} from 'react';
import TextCustom from "../../../../src/components/Text/TextCustom";
import {View} from "react-native";
import LoadingOne from "../../../../src/components/Animation/LoadingOne";
import {Entypo, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {dashboardAsync} from "../../../../src/features/redux/profileSlice";
import TextCustomBold from "../../../../src/components/Text/TextCustomBold";

const index = () => {

    const {dashboardAs} = useSelector(state => state.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dashboardAsync())
    }, [])

    return (
        <View className="bg-gray-200  flex-1 items-center justify-center w-full  p-10">
            <View className="w-full flex flex-row space-x-3">
                <Card title="کارمندان" color="bg-lime-200" colorDown="bg-lime-400"
                      count={dashboardAs.count_group} icon={ <FontAwesome5 name="layer-group" size={24} color="black"/>}/>
                <Card title="دسته ها" color="bg-green-200" colorDown="bg-green-400"
                      count={dashboardAs.count_category} icon={<MaterialIcons name="folder" size={24} color="black"/>}/>
            </View>
            <View className="w-full flex flex-row space-x-3">
                <Card title="کارمندان" color="bg-emerald-200" colorDown="bg-emerald-400"
                      count={dashboardAs.count_user} icon={  <FontAwesome5 name="users" size={24} color="black"/>}/>
                <Card title="کالا ها" color="bg-yellow-200" colorDown="bg-yellow-400"
                      count={dashboardAs.count_product} icon={<MaterialIcons name="category" size={24} color="black"/>}/>
            </View>

            <View className="w-full">

            </View>

        </View>
    );
}

const Card = ({color, colorDown, title, icon, count}) => {
    return (
        <View className={`flex flex-col w-1/2 p-1.5`}>
            <View className={`${colorDown} flex flex-col w-full justify-center items-center h-36 rounded-xl overflow-hidden border border-gray-300`}>
                <View className="flex flex-row space-x-2 h-1/2 justify-center items-center">
                    <TextCustomBold className="flex text-lg">{title}</TextCustomBold>
                    {icon}
                </View>
                <View className={`${color} bg-opacity-90 flex flex-row space-x-2 w-full justify-center items-center h-1/2`}>
                    <TextCustom className="text-slate-800 flex text-2xl">{count}</TextCustom>
                </View>
            </View>
        </View>
    )
}


export default index;


