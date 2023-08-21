import { authActionTypes } from '../constants';

const initState = {
    isLogged: false,
    user: {},
    addresses: [],
    selectedAddress: {},
    accessToken: null,
    refreshToken: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authActionTypes.login:
            return {
                ...state,
                isLogged: true,
                ...action.payload,
            };

        case authActionTypes.logout:
            return {
                ...state,
                isLogged: false,
                user: {},
                addresses: [],
                selectedAddress: {},
                accessToken: null,
                refreshToken: null,
            };

        case authActionTypes.refresh:
            return {
                ...state,
                ...action.payload,
            };

        case authActionTypes.updateProfile:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };

        case authActionTypes.getAddresses:
            return {
                ...state,
                addresses: action.payload.addresses,
            };

        case authActionTypes.setSelectedAddress:
            return {
                ...state,
                selectedAddress: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};

export default authReducer;
