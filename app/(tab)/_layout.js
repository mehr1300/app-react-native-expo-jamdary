import { Tabs} from 'expo-router';

export default function HomeLayout() {
    return (

        <Tabs>
            <Tabs.Screen name="home" options={{title: "صفحه اصلی"}} />
            <Tabs.Screen name="barcode" options={{title: "بارکد"}}/>
            <Tabs.Screen name="qrcode" options={{title: "دوربین"}}/>
        </Tabs>

    )

}
