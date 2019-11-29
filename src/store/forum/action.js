import * as forum from './action-type'
import {setStore, getStore} from '@/utils/commons'

// 保留登录token
export const saveToken = token => {
    setStore('token', token)
    return {
        type: forum.USERTOKEN,
        token
    }
}

// 保留登录用户信息
export const saveUserInfo = userInfo => {
    setStore('userInfo', JSON.stringify(userInfo))
    return {
        type: forum.USERINFO,
        userInfo
    }
}

// 删除登录token
export const deleteToken = (token) => {
    setStore('token', token)
    return {
        type: forum.USERTOKEN,
        token
    }
}