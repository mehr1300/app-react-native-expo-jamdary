import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, ToastAndroid, TouchableHighlight, View} from "react-native";
import {AntDesign, Entypo} from "@expo/vector-icons";
import TextCustom from "../Text/TextCustom";
import {addUniteProduct, clearUnitChangePro, getUnitChangAsync} from "../../features/redux/productSlice";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import TextCustomBold from "../Text/TextCustomBold";
import SelectOption from "../SelectOption/SelectOption";
import TextInputCustomOne from "../TextInput/TextInputCustomOne";
import ButtonCustomOne from "../Button/ButtonCustomOne";

const ModalChangeUnit = ({data,refresh,title,classCustom = "bg-emerald-400 border-emerald-500",icon = false}) => {
    const [modal,setModal] = useState({show: false , data : false})
    const dispatch = useDispatch()
    const {changeUnitProduct, changeUnitProductUser,unitChangePro} = useSelector(state => state.product)

    const initialValues = {
        receiver_unit_old: data.receiver_unit,
        receiver_user_id_old: data.receiver_user_id,
        receiver_unit_new: "",
        receiver_user_id_new: "",
        product_change_unit_desc: "",
        product_id: data.product_id,
    }

    useEffect(() => {
        dispatch(getUnitChangAsync({product_id: data.product_id }))
    }, [data])

    const onSubmit = (values) => {
        dispatch(addUniteProduct(values))
    }

    const formik = useFormik({
        onSubmit,
        initialValues,
        validateOnMount: true,
        enableReinitialize: true
    })

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
        if (unitChangePro.status !== undefined) {
            if (unitChangePro.status === 200) {
                showToastWithGravityAndOffset(unitChangePro?.data?.message)
                dispatch(clearUnitChangePro())
                setTimeout(() => {
                    refresh()
                    setModal({...modal,show : false})
                }, 1000)
            } else {
                showToastWithGravityAndOffset(unitChangePro?.data?.message)
                dispatch(clearUnitChangePro())

            }
        }

    }, [unitChangePro])


    return (
        <View className="">
            <TouchableHighlight className="w-40" onPress={()=>setModal({...modal,show : true})} underlayColor="white">
                <View className={`${classCustom} flex flex-row space-x-2 rounded p-1 px-3 justify-center items-center border`}>
                    {icon}
                    <TextCustom className=" text-gray-700 text-base">{title}</TextCustom>
                </View>
            </TouchableHighlight>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal.show}>

                <View className="w-full flex-1 justify-center items-center p-6 rounded bg-white/70">
                    <View className="bg-gray-200 rounded-2xl p-6 w-full flex flex-col space-y-5 border-2 border-gray-100">
                        <View className="flex flex-row justify-between items-center">
                            <AntDesign onPress={()=>setModal({...modal,show : false})} name="closesquareo" size={24} color="black" />
                            <TextCustom className=" text-gray-700 text-lg">{title}</TextCustom>
                        </View>
                        <View className="flex flex-col space-y-5 ">

                            <TextCustom className="text-yellow-600">این اطلاعات جهت مشاهده می باشد و برای ویرایش به
                                پایین صحفه مراجعه کنید
                            </TextCustom>
                            <View className={`flex flex-col space-y-2`}>
                                <View className={`flex flex-row justify-end items-center gap-1`}>
                                    <TextCustom className="">{changeUnitProduct?.product_name }</TextCustom>
                                    <TextCustomBold className=''>نام کالا: </TextCustomBold>
                                </View>
                                <View className={`flex flex-row justify-end items-center gap-1`}>
                                    <TextCustom className="">{changeUnitProduct?.receiver_user_name}</TextCustom>
                                    <TextCustomBold className=''>تحویل گیرنده : </TextCustomBold>
                                </View>
                                <View className={`flex flex-row justify-end items-center gap-1`}>
                                    <TextCustom className="">{changeUnitProduct?.receiver_unit}</TextCustom>
                                    <TextCustomBold className=''> واحد : </TextCustomBold>
                                </View>
                            </View>
                        </View>

                        <View className="w-full flex flex-col space-y-5 mt-5">
                            <View className=" flex flex-col space-y-3 w-full">
                               <View>
                                   <TextCustom>انتخاب (کارمند - انبار) جدید</TextCustom>
                                   <SelectOption formikAddress={formik.values.receiver_user_id_new} name="receiver_user_id_new"  title="تحویل گیرنده جدید" options={changeUnitProductUser} formik={formik}/>
                               </View>
                                <View>
                                    <TextInputCustomOne title="نام واحد جدید" name="receiver_unit_new" formik={formik}/>
                                </View>

                                <View>
                                    <TextInputCustomOne title="توضیحات" name="product_change_unit_desc" formik={formik}/>
                                </View>
                            </View>
                            <View className="w-full ">
                                <ButtonCustomOne title="ثبت تغییر واحد" operator={formik.handleSubmit}/>
                            </View>
                        </View>



                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalChangeUnit;