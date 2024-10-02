import request from '@/utils/request'
const startUrl = '/team'

/**
 * 创建队伍
 * @param name
 * @param description
 * @param maxNum
 * @param expireTime
 * @param userId
 * @param teamStatus
 * @param teamPassword
 */
export const addTeam = ({ name, description, maxNum, expireTime, userId, teamStatus, teamPassword }) =>
    request.post(startUrl + '/add', { name, description, maxNum, expireTime, userId, teamStatus, teamPassword });

/**
 * 解除队伍
 * @param id 队伍id
 */
export const deleteTeam = (id:number)  =>
    request.post(startUrl+'/delete',{id})

/**
 * 更新队伍
 * @param id 队伍的id
 * @param name
 * @param description
 * @param expireTime
 * @param teamStatus
 * @param teamPassword
 */
export const updateTeam = (
    id:number,
    name:string,
    description:string,
    expireTime:string,
    teamStatus:number,
    teamPassword:string
)  =>
    request.post(startUrl+'/update',{id,name,description,expireTime,teamStatus,teamPassword})

/**
 * 查询队伍
 * @param id
 * @param idList
 * @param searchText
 * @param name
 * @param description
 * @param maxNum
 * @param userId
 * @param teamStatus
 */
export const listTeam = (
    id:number,
    idList:[],
    searchText:string,
    name:string,
    description:string,
    maxNum:number,
    userId:number,
    teamStatus:number
)  =>
    request.post(startUrl+'/list',{id,idList,searchText,name,description,maxNum,userId,teamStatus})

/**
 * 加入队伍
 * @param id
 * @param teamPassword
 */
export const joinTeam = (
    id:number,
    teamPassword:string
)  =>
    request.post(startUrl+'/join',{id,teamPassword})

/**
 * 退出队伍
 * @param id 队伍id
 */
export const quitTeam = (id:number)  =>
    request.post(startUrl+'/quit',{id})
