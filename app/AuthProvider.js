
import {useEffect} from "react";
import {useRouter} from "expo-router";
import {useSelector} from "react-redux";







const AuthProvider = ({children}) => {


    const {isLogin} = useSelector((state) => state.login);
    // const dispatch = useDispatch();
    //
    //
    // const segments = useSegments();
    const router = useRouter();
    //
    // const useAuth = () => {
    //     return false
    // }

    useEffect(() => {
        return isLogin ? router.replace("/(tab)/home") : router.replace("/(auth)/login");
    }, [])


    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider;