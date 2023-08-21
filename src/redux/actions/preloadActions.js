import { preloadActionTypes } from '../constants';
import { systemService, userService } from '~/services';

export const mapPosts = (data) => ({
    type: preloadActionTypes.getPosts,
    payload: data,
});

export const fetchPosts = () => async (dispatch) => {
    const response = await systemService.fetchPostsService();
    dispatch(mapPosts(response.result));
};

export const mapProducts = (data) => ({
    type: preloadActionTypes.getProducts,
    payload: data,
});

export const fetchProducts = (id) => async (dispatch) => {
    const response = await systemService.fetchProductService(id);
    dispatch(mapProducts(response.result));
};

export const mapHistoryOrders = (data) => ({
    type: preloadActionTypes.getHistoryOrders,
    payload: data,
});

export const fetchHistoryOrders = () => async (dispatch) => {
    const response = await userService.fetchOrdersService();
    dispatch(mapHistoryOrders(response.result));
};

export const mapSearchProducts = (text, data) => ({
    type: preloadActionTypes.getSearchProducts,
    payload: {
        text: text,
        products: data,
    },
});

export const fetchSearchProducts = (text) => async (dispatch) => {
    const response = await userService.searchService(text);
    dispatch(mapSearchProducts(text, response.result));
};
