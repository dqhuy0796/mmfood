import { apiActionTypes } from '../constants';

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

        case apiActionTypes.getSearchProducts:
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

export default apiReducer;
