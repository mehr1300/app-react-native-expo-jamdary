import React, {useEffect} from 'react';
import {router} from "expo-router";
import ViewCustom from "../../src/components/View/ViewCustom";
import TextInputCustom from "../../src/components/TextInput/TextInputCustom";
import TextCustom from "../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearLogin, loginUser, postAsyncLogin} from "../../src/features/redux/loginSlice";


const addProduct = () => {

    const {login} = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const text = () => {
        dispatch(loginUser())
        console.log(login)
        return router.push("/home")
    }

    const onSubmit = (values) => {
        dispatch(postAsyncLogin(values))
    }


    useEffect(() => {
        console.log(login.data)
        if (login.status!==undefined) {
            if (login.status === 200) {
                router.replace("/(tab)/list")
                dispatch(loginUser())
                dispatch(clearLogin())
            } else {
                dispatch(clearLogin())
            }
        }
    }, [login])

    return (
        // <Redirect href="/home"/>
        <ViewCustom className="bg-gray-200  flex-1 items-center justify-center w-full p-10 space-y-8">
            <TextInputCustom className="border border-gray-400 w-full p-1.5 rounded"/>

        </ViewCustom>
    );
}

export default addProduct;


