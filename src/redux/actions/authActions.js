import _ from 'lodash';
import { authActionTypes } from '../constants';

export const setLoggedIn = (data) => ({
    type: authActionTypes.login,
    payload: data,
});

export const login = (user) => async (dispatch) => {
    let payload = {
        isLoggedIn: false,
        user: {},
    };
    if (!_.isEmpty(user)) {
        payload = {
            isLoggedIn: true,
            user: user,
        };
    }
    dispatch(setLoggedIn(payload));
};

export const logout = () => async (dispatch) => {
    let payload = {
        isLoggedIn: false,
    };
    dispatch(setLoggedIn(payload));
};
