import {Stack} from 'expo-router';
import AuthProvider from "./AuthProvider";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from '../src/features/store';

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
        <Provider store={store}>
            <AuthProvider>
                <Stack/>

            </AuthProvider>
        </Provider>

    )

}
