import * as forum from './action-type'

// 保留登录token
export const saveToken = token => {
    return {
        type: forum.USERTOKEN
    }
}