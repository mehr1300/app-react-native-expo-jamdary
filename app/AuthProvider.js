
import {useEffect} from "react";
import {useRouter, useSegments} from "expo-router";
import {useDispatch, useSelector} from "react-redux";






const AuthProvider = ({children}) => {


    const {login} = useSelector((state) => state.login);
    const dispatch = useDispatch();


    const segments = useSegments();
    const router = useRouter();

    const useAuth = () => {
        return false
    }

    useEffect(() => {
        return login ? router.replace("/home") : router.replace("/login");
    }, [login])


    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider;