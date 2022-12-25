import { apiActionTypes } from '../constants';

const initState = {
    posts: [],
    products: [],
    cart: [],
    historyOrders: [],
};

const apiReducer = (state = initState, action) => {
    switch (action.type) {
        case apiActionTypes.getPosts:
            return {
                ...state,
                posts: action.payload,
            };

        case apiActionTypes.getProducts:
            return {
                ...state,
                products: action.payload,
            };

        case apiActionTypes.getCart:
            return {
                ...state,
                cart: action.payload,
            };

        case apiActionTypes.getHistoryOrders:
            return {
                ...state,
                historyOrders: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};

export default apiReducer;
