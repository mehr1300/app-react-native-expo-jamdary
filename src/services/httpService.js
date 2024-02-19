import axios from "axios";
import {Config} from "../config/Config";

const app = axios.create({
    baseURL: Config.api,
    withCredentials: true
})

app.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            const currentURL = window.location.href;
            if (!currentURL.endsWith("/(auth)/login")) {
                return window.location.href = "/(auth)/login"
            }
        }
        return Promise.reject(err);
    }
)

const http = {
    post: app.post,
}


export default http;
