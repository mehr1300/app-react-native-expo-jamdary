import React, {useEffect} from 'react';
import {router} from "expo-router";
import TextCustom from "../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearLogin, loginUser, postAsyncLogin} from "../src/features/redux/loginSlice";
import {TextInput, View, Image, Button, ToastAndroid} from "react-native";
import {getAsyncSettingIndex} from "../src/features/redux/settingSlice";
import {Config} from "../src/config/Config";
import {Formik, useFormik} from "formik";
import * as yup from 'yup';
import TextInputCustomOne from "../src/components/TextInput/TextInputCustomOne";
import ButtonCustomOne from "../src/components/Button/ButtonCustomOne";
import TextCustomBold from "../src/components/Text/TextCustomBold";


export default function login() {

    const {login, loading} = useSelector((state) => state.login);
    const {index} = useSelector(state => state.setting)
    const dispatch = useDispatch();

    const text = () => {
        dispatch(loginUser())
        // return router.push("/index")
        router.replace('/');
    }

    useEffect(() => {
        dispatch(getAsyncSettingIndex())
    }, []);


    const showToastWithGravityAndOffset = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };


    useEffect(() => {
        if (login.status !== undefined) {
            if (login.status === 200) {
                router.replace('/');
                dispatch(loginUser())
                dispatch(clearLogin())
            } else {
                showToastWithGravityAndOffset(login?.data?.message)
                dispatch(clearLogin())
            }
        }
    }, [login])

    const countries = [
        {label : "لوازم الکترونیک" , value : "1"},
        {label : "خیاطی" , value : "2"},
        {label : "آشپزی" , value : "3"},
        {label : "اتوماسیون" , value : "4"},
    ]

    const initialValues = {
        username: "",
        password: ""
    }

    const onSubmit = (values) => {
        dispatch(postAsyncLogin(values))
    }

    const validationSchema = yup.object({
        username: yup.string().required("نام کاربری را وارد کنید"),
        password: yup.string().required("رمز عبور را وراد کنید")

    })

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema
    });

    return (
        // <Redirect href="/index"/>
        <View className="bg-gray-200  flex-1 items-center justify-center w-full p-10 space-y-4">
            <Image className="w-32 h-32" source={{uri: `${Config.imageUrl + index?.login_logo_app}`}}/>
            <TextCustomBold className="text-slate-800 flex text-3xl">نرم افزار جمع داری</TextCustomBold>
            <TextCustom className="text-slate-800 flex text-xl mb-4">{index?.app_buyer_name}</TextCustom>
            <View className="w-full flex flex-col space-y-5">
                <View className="w-full flex flex-col space-y-2">
                    <TextInputCustomOne title="نام کاربری" name="username" formik={formik}/>
                    <TextInputCustomOne secureTextEntry={true} title="رمز عبور" name="password" formik={formik}/>
                </View>
                <View className="w-full ">
                    <ButtonCustomOne formik={formik} title="ورود" operator={formik.handleSubmit} loading={loading}/>
                </View>
            </View>
            <View className="w-full justify-center items-center pt-10">
                <TextCustom className="text-slate-800 flex text-sm">
                    {Config.version}
                </TextCustom>
            </View>

        </View>
    );
}



{/*<Pressable className="w-full bg-blue-500 rounded p-2 justify-center items-center">*/}
{/*    {!loading ? <TextCustom onPress={() => {*/}
{/*            onSubmit({username: "mehr", password: "123456"})*/}
{/*        }} className="flex text-lg text-white">ورود</TextCustom>*/}
{/*        : <AntDesign name="loading1" size={24} color="white" className=" animate-spin"/>*/}
{/*    }*/}
{/*</Pressable>*/}


// <View className="w-full space-">
//     <Button onPress={handleSubmit} title="ورود" titleStyle={{color: "white", fontSize: 33}}
//             className="w-full bg-blue-500 rounded p-2 justify-center items-center text-lg"/>
// </View>