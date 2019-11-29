import * as products from './action-type'

// 保留购物车件数
export const saveShoppingCart = shoppingCart => {
    return {
        type: products.SHOPPINGCART,
        shoppingCart
    }
}