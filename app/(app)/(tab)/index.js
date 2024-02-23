import React from 'react';
import ViewCustom from "../../../src/components/View/ViewCustom";
import TextCustom from "../../../src/components/Text/TextCustom";
import {Text, TouchableHighlight, View} from "react-native";
import {log} from "expo/build/devtools/logger";
import ButtonCustomOne from "../../../src/components/Button/ButtonCustomOne";
import {Feather} from "@expo/vector-icons";
import {Redirect} from "expo-router";




const index = () => {

    // const {value, status} = useSelector((state) => state.counter);
    // const dispatch = useDispatch();
    // const test = (input) => {
    //     console.log(input)
    // }

    // return <Redirect href="/qrcode" />;

    return (
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full  p-10 space-y-8">
            <TextCustom className="text-slate-800 flex text-2xl">Home</TextCustom>
            <TextCustom className="text-slate-800 flex text-2xl">Home</TextCustom>
            <TextCustom className="text-slate-800 flex text-2xl">Home</TextCustom>

            <TouchableHighlight className="w-full" onPress={()=>console.log("asdasdasd")} underlayColor="white">
                <View  className="flex flex-row space-x-2 bg-blue-500 rounded p-3 w-full justify-center items-center">
                    <TextCustom className = "text-white">مهرداد</TextCustom>
                    <Feather name="repeat" size={24} color="black" />
                </View>
            </TouchableHighlight>

            <ButtonCustomOne title="مهرداد" titleSize={15} color="bg-gray-500"
                             icon={<Feather name="repeat" size={24} color="white" />}
                             operator={()=>{console.log("3333")}}/>

        </ViewCustom>
    );
}

export default index;


