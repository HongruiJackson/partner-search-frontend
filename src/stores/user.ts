import { defineStore } from 'pinia'
import { ref} from "vue";
import type {Ref} from "vue"
import type {UserType} from "@/models/user";
export const useUserStore = defineStore(
    'user-all',
    ()=> {
        /**
         * cookie的保存与修改，未用
         */
        const cookie = ref('')
        const setCookie =(newCookie:string) => {
            cookie.value = newCookie
        }
        const removeCookie = () => {
            cookie.value = ''
        }

        /**
         * 用户信息
         */
        const user : Ref<UserType|null> = ref({})

        const setUser = (userInfo: UserType | null) => {
            user.value = userInfo
        }

        return {
            cookie,setCookie,removeCookie,
            user,setUser
        }
    },
    {
        persist: {
            enabled: true
        }
    }

)