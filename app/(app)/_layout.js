import { Redirect, Stack } from 'expo-router';
import {useSelector} from "react-redux";

export default function AppLayout() {
    // const {isLogin} = useSelector(state => state.login)
    // if (!isLogin) {
    //     return <Redirect href="/login" />;
    // }
    return (
        <Stack   screenOptions ={{
                headerShown: false,
                headerStyle : {
                    backgroundColor : "orange"
                },
                 title: 'استیل بیدستان',
            hidden : true,
                headerTintColor : "white",
                headerTitleStyle : {
                    fontWeight : "bold"
                }
        }}>
            <Stack.Screen name="(drawer)" />


        </Stack>
    );
}