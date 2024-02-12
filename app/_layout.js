import { Stack } from 'expo-router';
import AuthProvider from "./AuthProvider";

export default function HomeLayout() {
    return (

        // <Stack screenOptions ={{
        //     headerStyle : {
        //         backgroundColor : "orange"
        //     },
        //     headerTintColor : "white",
        //     headerTitleStyle : {
        //         fontWeight : "bold"
        //     }
        // }} >
        //
        //     <Stack.Screen name="authProvider" options={{headerShown : false}}/>
        //
        // </Stack>

        <AuthProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </AuthProvider>

    )

}
