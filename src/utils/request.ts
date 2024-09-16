import axios from "axios";
import baseUrl from "@/utils/baseUrl"; // 去掉baseUrl.ts.sample的.sample后缀，修改掉里面的baseUrl

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000
})

export default instance