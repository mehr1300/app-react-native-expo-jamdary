import {ActivityIndicator, TouchableHighlight, View} from "react-native";
import TextCustom from "../Text/TextCustom";

const ButtonCustomOne = ({title,loading=false ,titleSize=16 ,operator,icon = "", color = "bg-blue-500" }) => {
    return (
        <TouchableHighlight className="w-full" onPress={operator} underlayColor="white">
            <View className={`${color} flex flex-row space-x-2 rounded p-2.5 w-full justify-center items-center`}>
                {icon}
                {!loading ?
                    <TextCustom className={`text-[${titleSize}px] text-white `}>{title}</TextCustom>
                    :
                    <ActivityIndicator size="small" color="#0000ff" />
                }
            </View>
        </TouchableHighlight>
    );
};

export default ButtonCustomOne;