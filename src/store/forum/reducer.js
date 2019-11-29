import * as forum from './action-type'

let defaultState = {
    token: '', //用户登录token
    userInfo: {} //登录用户信息
}

//论坛数据
export const forumData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case forum.USERTOKEN:
            return {
                ...state, ...{
                    token: action.token
                }
            }
        case forum.USERINFO:
            return {
                ...state, ...{
                    userInfo: action.userInfo
                }
            }
        default:
            return state;
    }
}