import { preloadActionTypes } from '../constants';

const initState = {
    posts: [],
    products: [],
    cart: [],
    historyOrders: [],
    search: {
        text: '',
        products: [],
    },
};

const preloadReducer = (state = initState, action) => {
    switch (action.type) {
        case preloadActionTypes.getPosts:
            return {
                ...state,
                posts: action.payload,
            };

        case preloadActionTypes.getProducts:
            return {
                ...state,
                products: action.payload,
            };

        case preloadActionTypes.getCart:
            return {
                ...state,
                cart: action.payload,
            };

        case preloadActionTypes.getHistoryOrders:
            return {
                ...state,
                historyOrders: action.payload,
            };

        case preloadActionTypes.getSearchProducts:
            return {
                ...state,
                search: {
                    text: action.payload.text,
                    products: action.payload.products,
                },
            };

        default:
            return {
                ...state,
            };
    }
};

export default preloadReducer;
