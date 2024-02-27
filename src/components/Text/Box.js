import React from 'react';
import TextCustom from "./TextCustom";
import {View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import TextCustomBold from "./TextCustomBold";

const Box = ({title,response}) => {
    return (
        <View className="flex flex-row justify-center items-center space-x-2 mb-3">
            <TextCustom className="text-lg tex-gray-700">{response}</TextCustom>
            <TextCustomBold className="text-lg text-gray-600">{title} : </TextCustomBold>
            <FontAwesome name="circle" size={15} color="black" />

        </View>
    );
};

export default Box;