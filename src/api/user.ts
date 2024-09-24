import request from '@/utils/request'
import type {LocationQueryValue} from "vue-router";
import type {UserType} from "@/models/user";

const startUrl = '/user'
/**
 * 根据标签查找用户
 */
export const searchUserByTags = (tags: string | null | LocationQueryValue[]) =>
    request.post(startUrl+'/search/tags/all',tags)

/**
 * 用户登录
 * @param userAccount
 * @param userPassword
 */
export const userLogin = (userAccount:string, userPassword:string) =>
    request.post(startUrl+'/login',{userAccount,userPassword})

/**
 * 用户注册
 * @param userAccount
 * @param userPassword
 * @param checkPassword
 */
export const userRegister = (userAccount:string, userPassword:string, checkPassword:string) =>
    request.post(startUrl+'/register',{userAccount,userPassword,checkPassword})
/**
 * 更新用户信息
 * @param user
 */
export const updateUser = (user: UserType) =>
    request.post(startUrl+'/update',user)
/**
 * 用户注销
 */
export const logout = ()=>
    request.post(startUrl+'/logout')

/**
 * 获取用户登录态
 */
export const getCurrentUser = () => request.get(startUrl+'/current')

/**
 * 主页获取推荐用户列表
 */
export const getRecommendUserList = (current:number, pageSize:number) =>
    request.get(startUrl+'/recommend',
        {
            params: {
                page: current,
                size: pageSize
            }
        })
