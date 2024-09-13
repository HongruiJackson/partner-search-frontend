/**
 * 用户类别
 */
/**
 * User
 */
export type UserType =  {
    /**
     * 主键
     */
    id?: number;
    /**
     * 登录账号
     */
    userAccount?: string;
    /**
     * 用户昵称
     */
    username?: string;
    /**
     * 用户具有的标签
     */
    tags?: string[];
    /**
     * 头像
     */
    avatarUrl?: string;
    /**
     * 性别，0 表示男性；1 表示女性
     */
    gender?: number;
    /**
     * 电话
     */
    phone?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 账号状态，0 表示正常
     */
    userStatus?: number;
    /**
     * 用户角色 0 默认用户 1 管理员
     */
    userRole?: number;


}