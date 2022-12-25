import * as httpsRequest from '~/utils/httpsRequest';

export const fetchPostsService = async () => {
    try {
        const path = 'posts/get';
        const payload = {
            id: 'all',
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchProductService = async (categoryId) => {
    try {
        const path = 'product/get';
        const payload = {
            id: categoryId,
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchHistoryOrderService = async (customerId) => {
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
