import { authActionTypes } from '../constants';

const initState = {
    isLoggedIn: false,
    user: {},
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authActionTypes.login:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user,
            };

        case authActionTypes.logout:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: {},
            };

        default:
            return {
                ...state,
            };
    }
};

export default authReducer;
