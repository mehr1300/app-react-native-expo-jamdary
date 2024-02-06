import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, router, useLocalSearchParams} from "expo-router";
import {Pressable} from "react-native";
import TextInputCustom from "../src/components/TextInput/TextInputCustom";
import ViewCustom from "../src/components/View/ViewCustom";
import TextCustom from "../src/components/Text/TextCustom";


const login = () => {

    // const {value, status} = useSelector((state) => state.counter);
    // const dispatch = useDispatch();
    // const test = (input) => {
    //     console.log(input)
    // }

    const params = useLocalSearchParams()
    console.log(params)

    return (
        // <Redirect href="/home"/>
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full space-y-3 p-10 space-y-8">
            <TextCustom className="text-slate-800 flex text-2xl">ورود به جمع داری</TextCustom>
            <ViewCustom className="w-full flex flex-col space-y-2">
                <TextInputCustom className="border border-gray-400 w-full p-1.5 rounded"/>
                <TextInputCustom className="border border-gray-400 w-full p-1.5 rounded"/>
            </ViewCustom>

            <ViewCustom className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                <TextCustom className="text-slate-800 flex text-lg text-white">جمع داری اموال</TextCustom>
            </ViewCustom>

            <Link href="/home" asChild>
                <Pressable>
                    <TextCustom className="text-slate-800 flex text-lg text-white">Home</TextCustom>
                </Pressable>
            </Link>

        </ViewCustom>
    );
}

export default login;


