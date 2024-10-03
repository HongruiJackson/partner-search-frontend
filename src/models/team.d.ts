import type {UserType} from "@/models/user";

/**
 * 队伍和用户信息封装类
 *
 * TeamUserVO
 */
export interface TeamType {
    /**
     * 主键
     */
    id?: number;
    /**
     * 队伍名称
     */
    name?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 最大人数
     */
    maxNum?: number;
    /**
     * 过期时间
     */
    expireTime?: string;
    /**
     * 创建人id
     */
    userId?: number;
    /**
     * 队伍状态：0公开；1私密；2加密，默认0
     */
    teamStatus?: number;
    /**
     * 创建人用户信息
     */
    createUser?: UserType;
    /**
     * 已加入的用户数
     */
    hasJoinNum?: number;
    /**
     * 是否已加入队伍
     */
    hasJoin?: boolean;






}