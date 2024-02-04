import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import ViewCustom from "../../components/View/ViewCustom";
import TextCustom from "../../components/Text/TextCustom";
import TextInputCustom from "../../components/TextInput/TextInputCustom";

const Login = () => {

    const {value, status} = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const test = (input) => {
        console.log(input)
    }

    return (
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full space-y-3 p-10 space-y-8">
            <TextCustom className="text-slate-800 flex text-2xl">جمع داری اموال</TextCustom>
            <ViewCustom className="w-full flex flex-col space-y-2">
                <TextInputCustom className="border border-gray-400 w-full p-1.5 rounded"/>
                <TextInputCustom className="border border-gray-400 w-full p-1.5 rounded"/>
            </ViewCustom>

            <ViewCustom className="w-full bg-blue-500 rounded p-1 justify-center items-center">
                <TextCustom className="text-slate-800 flex text-lg text-white">جمع داری اموال</TextCustom>
            </ViewCustom>

        </ViewCustom>
    );
}

export default Login;


