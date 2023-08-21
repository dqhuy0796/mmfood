import { userService } from '~/services';
import { authActionTypes } from '../constants';

export const login = (data) => ({
    type: authActionTypes.login,
    payload: {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    },
});

export const logout = () => ({
    type: authActionTypes.logout,
});

export const mapTokens = (newAccessToken, newRefreshToken) => ({
    type: authActionTypes.refresh,
    payload: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    },
});

export const refreshTokens = () => async (dispatch) => {
    const response = await userService.refreshTokensService();
    dispatch(mapTokens(response.accessToken, response.refreshToken));
};

// PROFILE

export const updateProfile = (newProfile) => ({
    type: authActionTypes.updateProfile,
    payload: newProfile,
});

// ADDRESS

export const mapAddresses = (addresses) => ({
    type: authActionTypes.getAddresses,
    payload: {
        addresses: addresses,
    },
});

export const fetchAddresses = () => async (dispatch) => {
    const response = await userService.fetchAddressesService();
    dispatch(mapAddresses(response.result));
};

export const setSelectedAddress = (address) => ({
    type: authActionTypes.setSelectedAddress,
    payload: address,
});

export const updateDefaultAddress = (newDefaultAddress) => ({
    type: authActionTypes.updateDefaultAddress,
    payload: newDefaultAddress,
});
