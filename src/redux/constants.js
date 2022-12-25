export const authActionTypes = Object.freeze({
    login: 'LOG_IN',
    logout: 'LOG_OUT',
});

export const cartActionTypes = Object.freeze({
    addItem: 'ADD_ITEM',
    removeItem: 'REMOVE_ITEM',
    increaseItem: 'INCREASE_ITEM',
    descreaseItem: 'DESCREASE_ITEM',
    removeAll: 'REMOVE_ALL_ITEMS',
});

export const apiActionTypes = Object.freeze({
    updateCartApi: 'UPDATE_CART_API',
    getCart: 'GET_CART_API',
    getPosts: 'GET_POSTS_API',
    getProducts: 'GET_PRODUCTS_API',
    getHistoryOrders: 'GET_HISTORY_ORDERS_API',
});
