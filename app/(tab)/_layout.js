import {Tabs, useRouter, useSegments} from 'expo-router';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export default function HomeLayout() {

    const {islogin} = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const router = useRouter();

    const segments = useSegments();

    useEffect(() => {
        if(!islogin){
            return router.replace("/login")
        }
    }, [islogin,segments])


    return (

        <Tabs>
            <Tabs.Screen name="home" options={{title: "صفحه اصلی"}} />
            <Tabs.Screen name="list" options={{title: "کالاها"}} />
            <Tabs.Screen name="barcode" options={{title: "بارکد"}}/>
            <Tabs.Screen name="qrcode" options={{title: "دوربین"}}/>
        </Tabs>

    )

}
