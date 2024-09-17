import request from '@/utils/request'
import type {LocationQueryValue} from "vue-router";

const startUrl = '/user'
/**
 * 根据标签查找用户
 */
export const searchUserByTags = (tags: string | null | LocationQueryValue[]) =>
    request.post(startUrl+'/search/tags/all',tags)
