import request from '@/utils/request'
import type {LocationQueryValue} from "vue-router";

const url = '/user'
/**
 * 根据标签查找用户
 */
export const searchUserByTags = (tags: string | null | LocationQueryValue[]) =>
    request.post(url+'/search/tags/all',tags)
