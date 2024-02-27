import {router, Tabs, usePathname, useRouter, useSegments} from 'expo-router';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import {Drawer} from "expo-router/drawer";
import {Button, Pressable, StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerToggleButton} from "@react-navigation/drawer";
import TextCustom from "../../../src/components/Text/TextCustom";
import ItemDrawer from "../../../src/components/Drawer/ItemDrawer";
import {getAsyncProfileAdmin} from "../../../src/features/redux/profileSlice";
import {clearLogOut, postAsyncLogOut} from "../../../src/features/redux/loginSlice";
import TextCustomBold from "../../../src/components/Text/TextCustomBold";
import {Config} from "../../../src/config/Config";
export default function DrawerLayout() {

    const {isLogin} = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const router = useRouter();

    const segments = useSegments();

    useEffect(() => {
        if(!isLogin){
            return router.replace("/login")
        }
    }, [isLogin,segments])

    const {profile ,loading : loadingProfile} = useSelector(state => state.profile)
    const {logOut, loading} = useSelector(state => state.login)


    useEffect(() => {
        dispatch(getAsyncProfileAdmin())
    }, [])

    useEffect(() => {
        if (logOut.status !== undefined) {
            if (logOut.status === 200) {
                dispatch(clearLogOut())
                setTimeout(() => {
                    return router.replace('/login')
                }, 500)
            } else {
                dispatch(clearLogOut())
            }
        }
    }, [logOut])

    const clear = () => {
        if(!loading) dispatch(postAsyncLogOut())
    }

    const CustomDrawerContent = (props) => {
        return(
            <DrawerContentScrollView>
                <View className="h-screen relative">
                    <View className="flex flex-col justify-center items-center p-3 space-y-2">
                        <View className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden">

                        </View>
                        <TextCustom>asdasdas</TextCustom>
                    </View>
                    <View className="w-full flex p-3 space-y-1">
                        <ItemDrawer title="صفحه اصلی" to="/" icon={<Ionicons name="home" color="black" size={24} />}/>
                        <ItemDrawer title="لیست کالا ها" to="/list" icon={<Ionicons name="list" color="black" size={24} />}/>
                        <ItemDrawer title="جستجو بارکد" to="/barcode" icon={<Ionicons name="search" color="black" size={24} />}/>
                        <ItemDrawer title="اسکن کد" to="/qrcode" icon={<Ionicons name="scan-sharp" color="black" size={24} />}/>
                        {/*<ItemDrawer title="تنظیمات" to="/setting" icon={<Ionicons name="settings" color="black" size={24} />}/>*/}
                        <ItemDrawer title="اطلاعات برنامه" to="/about" icon={<Ionicons name="information-circle" size={24} color="black" />}/>

                        <View className="w-full mb-1">
                            <Pressable onPress={()=>{clear()}} className="rounded-lg p-2 w-full flex flex-row justify-end items-center space-x-3">
                                <TextCustom className="text-lg text-red-500">خروج</TextCustom>
                                <Ionicons name="log-out" size={24} color="red" />
                            </Pressable>
                        </View>

                    </View>
                </View>
                <View className="absolute bottom-8 w-full">
                    <View className="flex flex-col justify-center items-center w-full space-y-2">
                        <TextCustomBold className="text-lg">نرم افزار جامع داری</TextCustomBold>
                        <TextCustom>
                            <TextCustom>نسخه : </TextCustom>
                            <TextCustom>{Config.version}</TextCustom>
                        </TextCustom>
                    </View>
                </View>

            </DrawerContentScrollView>
        )
    }
    const NavBar = (props) => {
        return(
            <View className="flex flex-col justify-center items-center p-3 space-y-2">
                <TextCustom>asdasdas</TextCustom>
            </View>
        )
    }

    return (
        <Drawer   screenOptions={{
            drawerPosition: 'right',
            headerShown : false,
            headerLeft: () => null,
            headerTitleAlign : "center",
            headerTitle: props => <View><TextCustomBold className="text-lg text-gray-600">{props.children}</TextCustomBold></View>,
        }} drawerContent={props => <CustomDrawerContent {...props} />} >

            <Drawer.Screen  name="(tab)" options={{
                title: "ٌصفحه اصلی",
                headerRight : ()=><DrawerToggleButton />,
                headerShown : false,
            }}/>

            <Drawer.Screen  name="product/addProduct" options={{
                title: "کالا",
                headerRight : ()=><DrawerToggleButton />,
                headerShown : true,
            }}/>

            <Drawer.Screen  name="product/showProduct" options={{
                title: "جزئیات کالا",
                headerRight : ()=><DrawerToggleButton />,
                headerShown : true,
            }}/>

            <Drawer.Screen  name="about" options={{
                title: "اطلاعات برنامه",
                headerRight : ()=><DrawerToggleButton />,
                headerShown : true,
            }}/>

        </Drawer>


    )
}


// options={{headerShown: false}}
