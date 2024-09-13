/**
 * 用户类别
 */
/**
 * User
 */
export type UserType =  {
    /**
     * 头像
     */
    avatarUrl?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 性别，0 表示男性；1 表示女性
     */
    gender?: number;
    /**
     * 主键
     */
    id?: number;
    /**
     * 逻辑是否删除
     */
    idDelete?: number;
    /**
     * 电话
     */
    phone?: string;
    /**
     * 用户具有的标签
     */
    tags?: string[];
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 登录账号
     */
    userAccount?: string;
    /**
     * 用户昵称
     */
    username?: string;
    /**
     * 密码
     */
    userPassword?: string;
    /**
     * 用户角色 0 默认用户 1 管理员
     */
    userRole?: number;
    /**
     * 账号状态，0 表示正常
     */
    userStatus?: number;

}