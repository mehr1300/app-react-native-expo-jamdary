import {Tabs, useRouter, useSegments} from 'expo-router';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Ionicons} from "@expo/vector-icons";
import {DrawerToggleButton} from "@react-navigation/drawer";
import {View} from "react-native";
import TextCustom from "../../../../src/components/Text/TextCustom";
import TextCustomBold from "../../../../src/components/Text/TextCustomBold";

export default function TabsLayout() {

    // const {isLogin} = useSelector((state) => state.login);
    // const dispatch = useDispatch();
    // const router = useRouter();
    //
    // const segments = useSegments();
    //
    // useEffect(() => {
    //     if(!isLogin){
    //         return router.replace("/login")
    //     }
    // }, [isLogin,segments])


    return (
        <Tabs  screenOptions={{
            headerLeft: ()=><DrawerToggleButton />,
            tabBarLabel : props=><TextCustomBold className={`${props.focused ? "text-white" : "text-gray-500"} text-[12px] p-1`} >{props.children}</TextCustomBold>,
            tabBarLabelStyle: {fontSize: 13, fontWeight: 'bold' ,paddingBottom :4},
            // headerShown : false,
            headerTitleAlign : "center",
            headerTitle: props => <View><TextCustomBold className="text-base text-gray-600">{props.children}</TextCustomBold></View>,
            tabBarActiveTintColor: 'white', // تغییر رنگ متن تب فعال
            tabBarInactiveTintColor: 'gray', // تغییر رنگ متن تب‌های غیرفعال
            tabBarActiveBackgroundColor: 'gray', // تغییر رنگ پس‌زمینه تب فعال
            tabBarInactiveBackgroundColor: 'white', // تغییر رنگ پس‌زمینه تب‌های غیرفعال
            tabBarStyle: {
                // backgroundColor: 'powderblue', // رنگ پس‌زمینه نوار تب
                // paddingBottom: 5, // فاصله از پایین، اگر می‌خواهید نوار تب کمی از کف صفحه بالا باشد
                // paddingTop: 5, // فاصله از بالا، برای ایجاد فضای بالای تب‌ها
                marginHorizontal: 10, // ایجاد فاصله از سمت راست و چپ صفحه
                borderRadius: 8, // گوشه‌های نرم نوار تب
                height: 60, // تنظیم ارتفاع نوار تب، اگر نیاز به تنظیم دارید
                position: 'absolute', // نگه داشتن نوار تب در پایین صفحه با استایل شخصی‌سازی شده
                bottom: 10, // فاصله از پایین صفحه
                left: 5, // فاصله از سمت چپ صفحه
                right: 5, // فاصله از سمت راست صفحه
                elevation: 7, // اضافه کردن سایه برای Android
                shadowOpacity: 0.3, // اضافه کردن سایه برای iOS
                overflow : "hidden"
            },
        }}>
            <Tabs.Screen name="index"  options={{
                title: "صفحه اصلی" ,tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                )}} />
            <Tabs.Screen name="list" options={{
                title: "لیست",tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list" color={color} size={size} />
                )}} />
            <Tabs.Screen name="barcode" options={{
                title: "جستجو", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search" color={color} size={size} />
                )}}/>
            <Tabs.Screen name="qrcode" options={{
                title: "اسکن", tabBarIcon: ({ color, size }) => (
                    <Ionicons name="scan-sharp" color={color} size={size} />
                )}}/>
        </Tabs>

    )

}

// options={{headerShown: false}}
