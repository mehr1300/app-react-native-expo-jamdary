import React from 'react';
import {router, useLocalSearchParams} from "expo-router";
import ViewCustom from "../../src/components/View/ViewCustom";
import TextInputCustom from "../../src/components/TextInput/TextInputCustom";
import TextCustom from "../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../src/features/redux/loginSlice";


const login = () => {

    const {login} = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const text = () => {
        dispatch(loginUser())
        console.log(login)
        return router.push("/home")
    }

    return (
        // <Redirect href="/home"/>
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full space-y-3 p-10 space-y-8">
            <TextCustom className="text-slate-800 flex text-2xl">ورود به جمع داری</TextCustom>
            <ViewCustom className="w-full flex flex-col space-y-2">
                <TextInputCustom className="border border-gray-400 w-full p-1.5 rounded"/>
                <TextInputCustom className="border border-gray-400 w-full p-1.5 rounded"/>
            </ViewCustom>

            <ViewCustom  className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                <TextCustom onPress={()=>{text()}} className="flex text-lg text-white">جمع داری اموال</TextCustom>
            </ViewCustom>

        </ViewCustom>
    );
}

export default login;


