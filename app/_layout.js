import { Slot } from 'expo-router';
import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (

        <Stack screenOptions ={{
            headerStyle : {
                backgroundColor : "orange"
            },
            headerTintColor : "white",
            headerTitleStyle : {
                fontWeight : "bold"
            }
        }} >

            <Stack.Screen name="index" options={{headerShown : false}}/>
            <Stack.Screen name="login" options={{headerShown : false}}/>

        </Stack>

    )

}
