import axios from "axios";
import {message} from "antd";

console.log(import.meta.env.VITE_BASE_URL, "url");

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
    timeoutErrorMessage: "请求超时",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "X-Requested-With": "XMLHttpRequest",
    }
});


instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    const {code, msg, data} = response.data;
    if (code === 401) {
        location.href = "/login";
    } else if (code !== 200) {
        message.error(msg);
    }
    return data;
}, (error) => {
    return Promise.reject(error);
});

export function get(url: string, params?: object) {
    return instance.get(url, {params});
}

export function post(url: string, data?: object) {
    return instance.post(url, data);
}

export function put(url: string, data?: object) {
    return instance.put(url, data);
}

export function del(url: string, params?: object) {
    return instance.delete(url, {params});
}