import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, TextInput, ToastAndroid, TouchableHighlight, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import TextCustom from "../Text/TextCustom";
import * as yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import TextInputCustomOne from "../TextInput/TextInputCustomOne";
import ButtonCustomOne from "../Button/ButtonCustomOne";
import TextCustomBold from "../Text/TextCustomBold";
import {addChangeCodeProduct, clearChangeCodePro} from "../../features/redux/codeSlice";

const ModalChangeCode = ({data,refresh,title,classCustom = "bg-emerald-400 border-emerald-500",icon = false}) => {
    const [modal,setModal] = useState({show: false , data : false})
    const {getCode, changeCode} = useSelector(state => state.code)
    const dispatch = useDispatch();

    const initialValues = {
        new_product_code: "",
        product_code_old: data.product_code,
        product_change_code_desc: "",
        product_id: data.product_id,
    }
    const onSubmit = (values) => {
        dispatch(addChangeCodeProduct(values))
    }

    const validationSchema = yup.object({
        product_code_new: yup.string().required("کد جدید را وارد کنید"),
        product_change_code_desc: yup.string().required("توضیحات  را وارد کنید")
    })

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        enableReinitialize : true
    });

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
        if (changeCode.status !== undefined){
            if (changeCode.status === 200) {
                showToastWithGravityAndOffset(changeCode?.data?.message)
                dispatch(clearChangeCodePro())
                setTimeout(() => {
                    refresh(formik.values.new_product_code)
                    console.log(formik.values.new_product_code)
                    setModal({...modal,show : false})
                }, 500)
            } else {
                showToastWithGravityAndOffset(changeCode?.data?.message)
                dispatch(clearChangeCodePro())
            }
        }
    }, [changeCode])

    return (
        <View className="">
            <TouchableHighlight className="w-full" onPress={()=>setModal({...modal,show : true})} underlayColor="white">
                <View className={`${classCustom} flex flex-row space-x-2 rounded p-1 px-3 justify-center items-center border`}>
                    <TextCustom className=" text-gray-700 text-base">{title}</TextCustom>
                    {icon}
                </View>
            </TouchableHighlight>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.show}>

                <View className="w-full flex-1 justify-center items-center p-6 rounded bg-white/70">
                    <View className="bg-gray-200 rounded-2xl p-6 w-full flex flex-col space-y-3 border-2 border-gray-100">
                        <View className="flex flex-row justify-between items-center">
                            <AntDesign onPress={()=>setModal({...modal,show : false})} name="closesquareo" size={24} color="black" />
                            <TextCustom className=" text-gray-700 text-lg">{title}</TextCustom>
                        </View>
                        <ScrollView className="flex flex-col space-y-5">
                            <TextCustom className="text-yellow-600">این اطلاعات جهت مشاهده می باشد و برای ویرایش به
                                پایین صحفه مراجعه کنید
                            </TextCustom>
                            <View className="border-b-2 border-emerald-600 pb-5">
                                <View className="flex flex-col space-y-3 justify-center items-end">
                                    <View className={`flex flex-row justify-center items-center space-x-3 dark:text-white`}>
                                        <TextCustom className="" >{data.product_name}</TextCustom>
                                        <TextCustomBold className='text-emerald-600 '>نام کالا :</TextCustomBold>
                                    </View>
                                    <View className={`flex flex-row justify-center items-center space-x-3 dark:text-white`}>
                                        <TextCustom className="">{data.product_code}</TextCustom>
                                        <TextCustomBold className='text-emerald-600 '>کد قبلی :</TextCustomBold>

                                    </View>
                                </View>
                            </View>

                            <View className="w-full flex flex-col space-y-5">
                                <View className="w-full flex flex-col space-y-2">
                                    <TextInputCustomOne title="کد جدید" name="product_code_new" formik={formik}/>
                                    <TextInputCustomOne title="توضیحات" name="product_change_code_desc" formik={formik}/>
                                </View>
                                <View className="w-full ">
                                    <ButtonCustomOne title="ثبت تغییر کد" operator={formik.handleSubmit}/>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalChangeCode;