import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import {useUserStore} from "@/stores/user"; // 去掉baseUrl.ts.sample的.sample后缀，修改掉里面的baseUrl

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.cookie) {
        config.headers.Cookie = userStore.cookie
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance