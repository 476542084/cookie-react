import * as forum from './action-type'

let defaultState = {
    token: '' //用户登录token
}

//论坛数据
export const forumData = ( state = defaultState , action = {}) => {
    switch(action.type){
        case forum.USERTOKEN:
            return {...state, ...{token: action.token}};
        default:
            return state;
    }
}

