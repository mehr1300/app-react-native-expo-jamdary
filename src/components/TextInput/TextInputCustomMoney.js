import React, {useCallback} from 'react';
import {styled} from "nativewind";
import {TextInput, View} from "react-native";
import TextCustom from "../Text/TextCustom";
import {useFonts} from "expo-font";
import {SplashScreen} from "expo-router";
const StyledTextInput = styled(TextInput)

const TextInputCustomMoney = ({formik,formikAddress,title,name,secureTextEntry=false}) => {

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

    const addCommas = num => num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num?.toString()?.replace(/[^0-9]/g, "");
    const onKeyPressHandler = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <View>
            <TextCustom>{title}</TextCustom>
            <StyledTextInput secureTextEntry={secureTextEntry} style={[font]} name={name}

                             onChangeText={formik.handleChange(name)}
                             onBlur={formik.handleBlur(name)}
                             value={addCommas(removeNonNumeric(formikAddress))}

                             className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200 text-base"/>
        </View>
    );
};

export default TextInputCustomMoney;
