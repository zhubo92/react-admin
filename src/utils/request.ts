import axios from "axios";
import {message} from "antd";

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

export function get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, {params});
}

export function post<T>(url: string, data?: object): Promise<T> {
    return instance.post(url, data);
}

export function put<T>(url: string, data?: object): Promise<T> {
    return instance.put(url, data);
}

export function del<T>(url: string, params?: object): Promise<T> {
    return instance.delete(url, {params});
}