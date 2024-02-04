import {useFonts} from "expo-font";
import {Text} from "react-native";
import {useCallback} from "react";
import {SplashScreen} from "expo-router";
import {styled} from "nativewind";
const StyledText = styled(Text)

const TextCustom = (props) => {

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
        <StyledText {...props} style={[font ,props.style]}  >{props.children}</StyledText>
    );
};

export default TextCustom;
