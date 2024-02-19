
import {useEffect} from "react";
import {useRouter} from "expo-router";







const AuthProvider = ({children}) => {


    // const {login} = useSelector((state) => state.login);
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
        // return login ? router.replace("/home") : router.replace("/login");
        router.replace("/home")
    }, [])


    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider;