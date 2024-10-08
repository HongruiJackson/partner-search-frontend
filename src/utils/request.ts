import axios from "axios";
import {showFailToast} from "vant";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type":"application/json"
    }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 40100) { // 没有登录或者没有权限
        showFailToast(response.data.message)
        return response
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance