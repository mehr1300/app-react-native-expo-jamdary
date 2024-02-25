import React from 'react';
import TextCustom from "./TextCustom";
import {View} from "react-native";

const Box = ({title,response}) => {
    return (
        <View className="flex flex-row space-x-2">
            <TextCustom className="text-lg tex-gray-700">{response}</TextCustom>
            <TextCustom className="text-lg">{title} : </TextCustom>
        </View>
    );
};

export default Box;