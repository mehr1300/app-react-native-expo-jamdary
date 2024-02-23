import React from 'react';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";
import {Feather} from "@expo/vector-icons";
import TextCustom from "../Text/TextCustom";
import {View} from "react-native";

const LoadingOne = ({size = 80,titleShow= true , title="در حال دریافت اطلاعات..."}) => {

    const scale = useSharedValue(1);

    const rotate = useDerivedValue(() => {
        return `${scale.value * 2}rad`;
    });

    const rotateStyles = useAnimatedStyle(() => ({
        transform: [{rotate: rotate.value}],
    }));

    React.useEffect(() => {
        scale.value = withRepeat(
            withTiming(scale.value * 6, {duration: 1500}),
            -1,
            true
        );
    }, []);

    return (
        <View className="bg-gray-200 flex-1 items-center justify-center w-full  p-10 space-y-4">
            <Animated.View className=" rounded-2xl" style={[rotateStyles]}>
                <Feather name="loader" size={size} color="black"/>
            </Animated.View>
            {title && (  <TextCustom className=" text-lg">{title}</TextCustom>)}

        </View>
    );
};

export default LoadingOne;