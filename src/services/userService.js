import * as httpsRequest from '~/utils/httpsRequest';
import store from '../redux/store';

// AUTH

export const loginService = async (user) => {
    const path = 'auth/customer/login';
    const payload = {
        phoneNumber: user.phone,
        password: user.password,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const registerService = async (user) => {
    const path = 'auth/customer/register';
    const payload = {
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: user.password,
        name: user.name,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const verifyRefreshTokenService = async () => {
    const path = 'auth/customer/verify-refresh-token';

    const payload = {
        'x-refresh-token': store.getState().auth.refreshToken,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const refreshTokensService = async () => {
    const path = 'auth/customer/refresh';

    const payload = {
        'x-refresh-token': store.getState().auth.refreshToken,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// PROFILE

export const updateProfileService = async (customer) => {
    const path = 'auth/customer/update';

    const accessToken = store.getState().auth.accessToken;

    const payload = {
        ...customer,
    };
    try {
        const result = await httpsRequest.putApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// SHIPPING ADDRESS

export const fetchAddressesService = async () => {
    const path = 'address/get';
    const customerId = store.getState().auth.user.id;
    const accessToken = store.getState().auth.accessToken;
    const payload = {
        customerId: customerId,
    };
    try {
        const result = await httpsRequest.getApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const createAddressService = async (address) => {
    const path = 'address/create';

    const accessToken = store.getState().auth.accessToken;
    const customerId = store.getState().auth.user.id;

    const payload = {
        customerId,
        ...address,
    };
    try {
        const result = await httpsRequest.postApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const updateAddressService = async (address) => {
    const path = 'address/update';

    const accessToken = store.getState().auth.accessToken;

    const payload = {
        ...address,
    };
    try {
        const result = await httpsRequest.putApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAddressService = async (address) => {
    const path = 'address/delete';

    const accessToken = store.getState().auth.accessToken;

    const payload = {
        id: address.id,
        customerId: address.customerId,
    };

    try {
        const result = await httpsRequest.deleteApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// ORDERS

export const fetchOrdersService = async () => {
    const path = 'order/get';

    const customerId = store.getState().auth.user.id;
    const accessToken = store.getState().auth.accessToken;

    const payload = {
        customerId,
    };

    try {
        const result = await httpsRequest.getApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const fetchOrderByIdService = async (orderUuid) => {
    const path = 'order/get';

    const accessToken = store.getState().auth.accessToken;

    const payload = {
        orderUuid,
    };

    try {
        const result = await httpsRequest.getApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const createOrderService = async (customerId, deliveryAddressId, items, paymentDetails) => {
    const path = 'order/create';

    const accessToken = store.getState().auth.accessToken;

    const payload = {
        customerId,
        deliveryAddressId,
        items,
        paymentDetails,
    };

    try {
        const result = await httpsRequest.postApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const finishedOrderService = async (uuid) => {
    const path = 'order/finished';
    const payload = {
        uuid: uuid,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const cancelOrderService = async (uuid) => {
    const path = 'order/cancel';
    const payload = {
        uuid: uuid,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// SEARCH

export const searchService = async (input) => {
    try {
        const path = 'search';
        const payload = {
            input: input,
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
