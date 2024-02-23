import {Tabs, useRouter, useSegments} from 'expo-router';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Ionicons} from "@expo/vector-icons";

export default function HomeLayout() {

    const {isLogin} = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const router = useRouter();

    const segments = useSegments();

    useEffect(() => {
        if(!isLogin){
            return router.replace("/login")
        }
    }, [isLogin,segments])


    return (
        <Tabs >
            <Tabs.Screen name="index"  options={{title: "صفحه اصلی",tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                )}} />
            <Tabs.Screen name="list" options={{title: "لیست" ,tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list" color={color} size={size} />
                )}} />
            <Tabs.Screen name="barcode" options={{title: "جستجو" , tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search" color={color} size={size} />
                )}}/>
            <Tabs.Screen name="qrcode" options={{title: "اسکن" , tabBarIcon: ({ color, size }) => (
                    <Ionicons name="scan-sharp" color={color} size={size} />
                )}}/>
        </Tabs>

    )

}

// options={{headerShown: false}}
