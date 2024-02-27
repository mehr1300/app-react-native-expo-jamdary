import {Image, Pressable, SafeAreaView, ScrollView, View} from "react-native";
import TextCustom from "../../../src/components/Text/TextCustom";
import {useDispatch, useSelector} from "react-redux";
import {aboutLicense} from "../../../src/features/redux/settingSlice";
import React, {useEffect} from "react";
import {Config} from "../../../src/config/Config";
import TextCustomBold from "../../../src/components/Text/TextCustomBold";
import {router} from "expo-router";

const About = () => {

    const dispatch = useDispatch()
    const {aboutLicenseState, loading} = useSelector(state => state.setting)
    useEffect(() => {
        dispatch(aboutLicense({license_key: Config.license_key}))
    }, [])

    return (
        <SafeAreaView>
            <ScrollView className="p-2">
                <View className="flex-1 p-3 text-right justify-center items-end space-y-3">
                    <View className="flex flex-row space-x-1">
                        <TextCustom className="text-lg">{aboutLicenseState.software?.software_name}</TextCustom>
                        <TextCustomBold className="text-lg text-gray-600">نام نرم افزار :</TextCustomBold>
                    </View>
                    <View className="flex flex-row space-x-1">
                        <TextCustom className="text-lg">{Config.version}</TextCustom>
                        <TextCustomBold className="text-lg text-gray-600">ورژن برنامه شما :</TextCustomBold>
                    </View>
                    {
                        aboutLicenseState.software?.web_version !== "" && aboutLicenseState.software?.web_version !== null &&
                        aboutLicenseState.software?.web_version === Config.version ?
                            (
                                <TextCustom className="text-white bg-emerald-500 p-1 rounded-md">شما در حال استفاده اخرین نسخه برنامه هستید</TextCustom>)
                            :
                            (
                                <TextCustom className="text-white bg-red-500 p-1 rounded-md">نسخه ی {aboutLicenseState.software?.web_version} ارائه شده است</TextCustom>)
                    }
                    <View className="flex flex-row space-x-1">
                        <TextCustom className="text-lg">{aboutLicenseState.software?.software_level_title}</TextCustom>
                        <TextCustomBold className="text-lg text-gray-600">نام لایسنس :</TextCustomBold>
                    </View>
                    <View className="flex flex-row space-x-1">
                        <TextCustom className="text-lg">{aboutLicenseState.software?.app_buyer_name}</TextCustom>
                        <TextCustomBold className="text-lg text-gray-600">شرکت خریدار :</TextCustomBold>
                    </View>
                    {aboutLicenseState.software?.end_of_support_date_status !== "" && aboutLicenseState.software?.end_of_support_date_status !== null &&
                        aboutLicenseState.software?.end_of_support_date_status === "inactive" &&
                        <View className="bg-red-500 p-1 rounded-md text-white w-72 flex items-center justify-center">
                            <TextCustomBold className="text-lg text-white">زمان پشتیبانی به اتمام رسیده است</TextCustomBold>
                        </View>
                    }

                    {aboutLicenseState.software?.software_site_url !== "" &&
                        <View className="flex flex-row items-center gap-2">
                            <Pressable onPress={()=>{return router.push(aboutLicenseState.software?.software_site_url)}} >
                                <TextCustom  className="text-blue-600 dark:text-blue-400 text-lg">{aboutLicenseState.software?.software_site_title}</TextCustom>
                            </Pressable>
                            <TextCustomBold className={` text-lg`}>وب سایت :</TextCustomBold>
                        </View>

                    }
                    {aboutLicenseState.software?.software_support_phone !== "" &&
                        <View className="flex flex-row gap-2">
                            <TextCustom className={`text-lg`}>{aboutLicenseState.software?.software_support_phone}</TextCustom>
                            <TextCustomBold className={`  text-lg`}>تلفن پشتیبانی :</TextCustomBold>
                        </View>

                    }

                    <View className="flex flex-row items-center gap-3">

                        <View className="flex flex-row items-center gap-3">
                            {aboutLicenseState.software?.software_support_bale !== null && aboutLicenseState.software?.software_support_bale !== "" &&
                                <Pressable onPress={()=>{return router.push(aboutLicenseState.software?.software_support_bale)}} >
                                    <Image className="w-8 h-8" source={require('../../../assets/icons/bale-100.png')}/>
                                </Pressable >
                            }
                            {
                                aboutLicenseState.software?.software_support_eitaa !== "" && aboutLicenseState.software?.software_support_eitaa !== null &&
                                <Pressable onPress={()=>{return router.push(aboutLicenseState.software?.software_support_eitaa)}} >
                                    <Image className="w-8 h-8" source={require('../../../assets/icons/eitaa-100.png')}/>
                                </Pressable >
                            }

                            {aboutLicenseState.software?.software_support_telegram !== "" && aboutLicenseState.software?.software_support_telegram !== null &&
                                <Pressable onPress={()=>{return router.push(aboutLicenseState.software?.software_support_telegram)}} >
                                    <Image className="w-8 h-8" source={require('../../../assets/icons/Telegram-100.png')}/>
                                </Pressable >
                            }
                            <TextCustomBold className="text-lg">پشتیبانی:</TextCustomBold>
                        </View>
                    </View>
                    <View>
                        <TextCustom className="text-sm">ساعات پاسخگویی تلفنی 9:30 الی 16:00 ، پنچ شنبه ها 9:30 الی 12:00 غیر از روزهای تعطیل رسمی</TextCustom>
                    </View>


                    {aboutLicenseState.software?.app_version_url !== "" &&
                        <View className="flex flex-col space-y-10 mt-20  w-full">
                            <TextCustomBold className={`  text-lg`}>دانلود آپلیکیشن اندروید : </TextCustomBold>

                            <View className="flex flex-col justify-center items-center w-full space-y-3">
                                <Pressable onPress={()=>{return router.push(aboutLicenseState.software?.app_version_url)}} >
                                    <Image className="w-20 h-20" source={{uri: `${aboutLicenseState.software?.app_icon}`}}/>
                                </Pressable >
                                <TextCustomBold className={`  text-lg`}>{aboutLicenseState.software?.app_version_title}</TextCustomBold>
                            </View>
                        </View>

                    }

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default About;