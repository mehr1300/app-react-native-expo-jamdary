import React, {useCallback} from 'react';
import {styled} from "nativewind";
import {TextInput, View} from "react-native";
import TextCustom from "../Text/TextCustom";
import {useFonts} from "expo-font";
import {SplashScreen} from "expo-router";
const StyledTextInput = styled(TextInput)

const TextInputCustomOne = ({formik,title,name}) => {

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

    return (
        <View>
            <TextCustom>{title}</TextCustom>
            <StyledTextInput style={[font]} name={name}
                             onChangeText={formik.handleChange(name)}
                             onBlur={formik.handleBlur(name)}
                             value={formik.values[name]}
                             className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200 text-base"/>
        </View>
    );
};

export default TextInputCustomOne;
