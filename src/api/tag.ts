import request from '@/utils/request'
import type {LocationQueryValue} from "vue-router";
import type {UserType} from "@/models/user";

const startUrl = '/tag'
/**
 * 获取完整的父子列表
 */
export const getCompletedTagList = () =>
    request.get(startUrl+'/completedList')



