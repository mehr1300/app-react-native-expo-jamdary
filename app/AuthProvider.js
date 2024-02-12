import {Provider, useDispatch, useSelector} from "react-redux";
import { store } from '../src/features/store';
import {useEffect} from "react";
import {useRouter, useSegments} from "expo-router";






const AuthProvider = ({children}) => {


    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {

        router.replace("/login");
    }, [segments])


    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default AuthProvider;