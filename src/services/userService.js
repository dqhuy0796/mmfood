import * as httpsRequest from '~/utils/httpsRequest';

export const loginService = async (user) => {
    const path = 'login';
    const payload = {
        phone: user.phone,
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
    const path = 'register';
    const payload = {
        phone: user.phone,
        email: user.email,
        password: user.password,
        name: user.name,
        address: user.address,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const updateAddressService = async (phone, addressArray) => {
    const path = 'customer/update/address';
    const payload = {
        phone: phone,
        address: JSON.stringify(addressArray),
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

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

export const fetchOrderService = async (customerId) => {
    try {
        const path = 'order/get';
        const payload = {
            id: customerId,
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const createOrderService = async (customerId, receiverDetails, items, paymentDetails) => {
    const path = 'order/create';
    const payload = {
        customerId: customerId,
        receiverDetails: JSON.stringify(receiverDetails),
        items: JSON.stringify(items),
        paymentDetails: JSON.stringify(paymentDetails),
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};
