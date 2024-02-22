import React, {useEffect} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import ViewCustom from "../../src/components/View/ViewCustom";
import TextInputCustom from "../../src/components/TextInput/TextInputCustom";
import TextCustom from "../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {clearLogin, loginUser, postAsyncLogin} from "../../src/features/redux/loginSlice";
import {Formik} from "formik";
import {Button, Modal, SafeAreaView, ScrollView, TextInput, View} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import {getAsyncGroupListSelect} from "../../src/features/redux/groupSlice";
import {getAsyncStatusSelect} from "../../src/features/redux/statusSlice";
import SelectOption from "../../src/components/SelectOption/SelectOption";


const addProduct = () => {

    const {categoryListSelect} = useSelector(state => state.category)
    const {statusListSelect} = useSelector(state => state.status)
    const {groupListSelect} = useSelector(state => state.group)

    const dispatch = useDispatch();

    const {id} = useLocalSearchParams()

    const text = () => {
        dispatch(loginUser())
        console.log(login)
        return router.push("/home")
    }

    const onSubmit = (values) => {
        dispatch(postAsyncLogin(values))
    }


    useEffect(() => {
        // dispatch(getAsyncOrganizationSelect())
        // dispatch(getAsyncUserSelect())
        dispatch(getAsyncGroupListSelect())
        dispatch(getAsyncStatusSelect())
    }, [])



    const countries = ["Egypt", "Canada", "Australia", "Ireland"]


    return (
        // <Redirect href="/home"/>
        <SafeAreaView>
            <ScrollView className="p-4">


                <Formik initialValues={{product_name: "mehr", password: "123456"}}
                        onSubmit={values => console.log(values)}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View className="w-full flex flex-col space-y-5">
                            <View className="w-full flex flex-col space-y-3">
                                <View>
                                    <TextCustom>نام</TextCustom>
                                    <TextInput name="product_name" placeholder="نام کالا"
                                               onChangeText={handleChange('product_name')}
                                               onBlur={handleBlur('product_name')}
                                               value={values.product_name}
                                               className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                                </View>
                                <View>
                                    <TextCustom>گروه کالا</TextCustom>
                                    <SelectOption  title="گروه کالا" option={groupListSelect}/>
                                </View>
                                <View>
                                    <TextCustom>وضعیت کالا</TextCustom>
                                    <SelectOption  title="وضغیت کالا" option={statusListSelect}/>
                                </View>
                                <View>
                                    <TextCustom>نام</TextCustom>
                                    <TextInput name="username" placeholder="نام کاربری"
                                               onChangeText={handleChange('username')}
                                               onBlur={handleBlur('username')}
                                               value={values.username}
                                               className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                                </View>
                                <View>
                                    <TextCustom>نام</TextCustom>
                                    <TextInput name="username" placeholder="نام کاربری"
                                               onChangeText={handleChange('username')}
                                               onBlur={handleBlur('username')}
                                               value={values.username}
                                               className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                                </View>
                                <View>
                                    <TextCustom>نام</TextCustom>
                                    <TextInput name="username" placeholder="نام کاربری"
                                               onChangeText={handleChange('username')}
                                               onBlur={handleBlur('username')}
                                               value={values.username}
                                               className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                                </View>
                                <View>
                                    <TextCustom>نام</TextCustom>
                                    <TextInput name="username" placeholder="نام کاربری"
                                               onChangeText={handleChange('username')}
                                               onBlur={handleBlur('username')}
                                               value={values.username}
                                               className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                                </View>
                                <View>
                                    <TextCustom>نام</TextCustom>
                                    <TextInput name="username" placeholder="نام کاربری"
                                               onChangeText={handleChange('username')}
                                               onBlur={handleBlur('username')}
                                               value={values.username}
                                               className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                                </View>
                                <View>
                                    <TextCustom>نام</TextCustom>
                                    <TextInput name="username" placeholder="نام کاربری"
                                               onChangeText={handleChange('username')}
                                               onBlur={handleBlur('username')}
                                               value={values.username}
                                               className="border border-gray-400 w-full p-1.5 rounded dark:text-gray-200"/>
                                </View>
                            </View>
                            <View className="w-full space-">
                                <Button onPress={handleSubmit} title="ورود" titleStyle={{color: "white", fontSize: 33}}
                                        className="w-full bg-blue-500 rounded p-2 justify-center items-center text-lg"/>
                            </View>


                        </View>
                    )}
                </Formik>

            </ScrollView>
        </SafeAreaView>
    );
}

export default addProduct;


