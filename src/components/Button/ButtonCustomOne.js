import {TouchableHighlight, View} from "react-native";
import TextCustom from "../Text/TextCustom";

const ButtonCustomOne = ({title,titleSize=16 ,operator,icon = "", color = "bg-blue-500" }) => {
    return (
        <TouchableHighlight className="w-full" onPress={operator} underlayColor="white">
            <View className={`${color} flex flex-row space-x-2 rounded p-3 w-full justify-center items-center`}>
                <TextCustom className={`text-[${titleSize}px] text-white `}>{title}</TextCustom>
                {icon}
            </View>
        </TouchableHighlight>
    );
};

export default ButtonCustomOne;