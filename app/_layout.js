import {Slot} from 'expo-router';
import {Provider} from "react-redux";
import {store} from '../src/features/store';

export default function Root() {
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
            <Slot />
        </Provider>

    )

}
