import * as products from './action-type'

let defaultState = {
    shoppingCart: '' //用户登录token
}

//论坛数据
export const productsData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case products.SHOPPINGCART:
            return {
                ...state, ...{
                    shoppingCart: action.shoppingCart
                }
            };
        default:
            return state;
    }
}