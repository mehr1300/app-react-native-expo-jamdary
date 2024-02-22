import React, {useEffect} from 'react';
import {router} from "expo-router";
import TextInputCustom from "../../src/components/TextInput/TextInputCustom";
import TextCustom from "../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearLogin, loginUser, postAsyncLogin} from "../../src/features/redux/loginSlice";
import {Pressable, TextInput, View, Image, Button, ToastAndroid} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {getAsyncSettingIndex} from "../../src/features/redux/settingSlice";
import {Config} from "../../src/config/Config";
import {Formik} from "formik";
import {Toast} from "expo-router/build/views/Toast";
import SelectOption from "../../src/components/SelectOption/SelectOption";


const login = () => {

    const {login, loading} = useSelector((state) => state.login);
    const {index} = useSelector(state => state.setting)
    const dispatch = useDispatch();

    const text = () => {
        dispatch(loginUser())
        return router.push("/home")
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
        console.log(login.data)
        if (login.status !== undefined) {
            if (login.status === 200) {
                router.replace("/(tab)/list")
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


    return (
        // <Redirect href="/home"/>
        <View className="bg-gray-200  flex-1 items-center justify-center w-full p-10 space-y-4">
            <Image className="w-32 h-32" source={{uri: `${Config.imageUrl + index?.login_logo_app}`}}/>
            <TextCustom className="text-slate-800 flex text-3xl">نرم افزار جمع داری</TextCustom>
            <TextCustom className="text-slate-800 flex text-xl mb-4">{index?.app_buyer_name}</TextCustom>
            <Formik initialValues={{username: "mehr", password: "123456"}}
                    onSubmit={values => dispatch(postAsyncLogin(values))}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View className="w-full flex flex-col space-y-5">
                        <View className="w-full flex flex-col space-y-2">
                            <TextInput name="username" placeholder="نام کاربری"
                                       onChangeText={handleChange('username')}
                                       onBlur={handleBlur('username')}
                                       value={values.username}
                                       className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>

                            <TextInput name="password" placeholder="رمز عبور"
                                       onChangeText={handleChange('password')}
                                       onBlur={handleBlur('password')}
                                       value={values.password}
                                       className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                        </View>
                        <View className="w-full space-">
                            <Button onPress={handleSubmit} title="ورود" titleStyle={{color: "white", fontSize: 33}}
                                    className="w-full bg-blue-500 rounded p-2 justify-center items-center text-lg"/>
                        </View>



                    </View>
                )}
            </Formik>

            <View className="w-full justify-center items-center pt-10">
                <TextCustom className="text-slate-800 flex text-sm">
                    v
                    {Config.version}
                </TextCustom>
            </View>

        </View>
    );
}

export default login;


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