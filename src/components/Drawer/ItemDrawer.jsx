import {router, usePathname} from "expo-router";
import TextCustom from "../Text/TextCustom";
import {Ionicons} from "@expo/vector-icons";
import {Pressable, View} from "react-native";


const ItemDrawer = ({to,title,icon = false}) => {
    const pathname = usePathname()
    return (
        <View className="w-full mb-1">
            <Pressable onPress={()=>{return router.push(to)}}
                       className={`${pathname === to && " bg-gray-300 "}  rounded-lg p-2  w-full flex flex-row justify-end items-center space-x-3`}>
                <TextCustom className="text-lg">{title}</TextCustom>
                {icon}
            </Pressable>
        </View>
    );
};

export default ItemDrawer;