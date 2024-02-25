import axios from "axios";
import {Config} from "../config/Config";
import {router} from "expo-router";

const app = axios.create({
    baseURL: Config.api,
    withCredentials: true
})

app.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            return router.replace("/login")
            // if (!currentURL.endsWith("/(auth)/login")) {}
        }
        return Promise.reject(err);
    }
)

const http = {
    post: app.post,
}


export default http;
