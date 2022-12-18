import { apiActionTypes } from '../constants';
import { systemService } from '~/services';

export const mapPosts = (data) => ({
    type: apiActionTypes.getPosts,
    payload: data,
});

export const fetchPosts = () => async (dispatch) => {
    const response = await systemService.fetchPostsService();
    dispatch(mapPosts(response.result));
};

export const mapProducts = (data) => ({
    type: apiActionTypes.getProducts,
    payload: data,
});

export const fetchProducts = (id) => async (dispatch) => {
    const response = await systemService.fetchProductService(id);
    dispatch(mapProducts(response.result));
};
