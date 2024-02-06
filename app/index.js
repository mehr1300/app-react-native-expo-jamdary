import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, router} from "expo-router";
import {Pressable} from "react-native";
import TextInputCustom from "../src/components/TextInput/TextInputCustom";
import ViewCustom from "../src/components/View/ViewCustom";
import TextCustom from "../src/components/Text/TextCustom";


const index = () => {

    // const {value, status} = useSelector((state) => state.counter);
    // const dispatch = useDispatch();
    // const test = (input) => {
    //     console.log(input)
    // }

    setTimeout(()=>{
        router.push("/login")
    },3000)

    return (

        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full space-y-3 p-10 space-y-8">
            <TextCustom className="text-slate-800 flex text-4xl">
                نرم افزار جمع داری
            </TextCustom>

            <TextCustom className="text-slate-800 flex text-2xl">
                Jamdary.ir
            </TextCustom>

            {/*<Pressable onPress={() => {router.push("/login")}}>*/}
            {/*    <TextCustom className="text-slate-800 flex text-lg text-white">login</TextCustom>*/}
            {/*</Pressable>*/}

            {/*<Link href="/home" asChild>*/}
            {/*    <Pressable>*/}
            {/*        <TextCustom className="text-slate-800 flex text-lg text-white">Home</TextCustom>*/}
            {/*    </Pressable>*/}
            {/*</Link>*/}

            {/*<Link href={{pathname : "/login", params : {name : "mehrdad"}}}>*/}
            {/*    <TextCustom className="text-slate-800 flex text-lg text-white">login</TextCustom>*/}
            {/*</Link>*/}

            {/*<Link href="/login?username=ali">*/}
            {/*    <TextCustom className="text-slate-800 flex text-lg text-white">login 333</TextCustom>*/}
            {/*</Link>*/}

            {/*<Pressable onPress={()=>{router.push("/home")}}>*/}
            {/*    <TextCustom className="text-slate-800 flex text-lg text-white">Home2333</TextCustom>*/}
            {/*</Pressable>*/}

        </ViewCustom>
    );
}

export default index;


