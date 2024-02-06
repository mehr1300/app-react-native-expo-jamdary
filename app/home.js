import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "expo-router";
import {Pressable} from "react-native";
import TextInputCustom from "../src/components/TextInput/TextInputCustom";
import ViewCustom from "../src/components/View/ViewCustom";
import TextCustom from "../src/components/Text/TextCustom";


const home = () => {

    // const {value, status} = useSelector((state) => state.counter);
    // const dispatch = useDispatch();
    // const test = (input) => {
    //     console.log(input)
    // }

    return (
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full space-y-3 p-10 space-y-8">
            <TextCustom className="text-slate-800 flex text-2xl">Home</TextCustom>
        </ViewCustom>
    );
}

export default home;


