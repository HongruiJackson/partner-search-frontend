import request from '@/utils/request'
import type {LocationQueryValue} from "vue-router";

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