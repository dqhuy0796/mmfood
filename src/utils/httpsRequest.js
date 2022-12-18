import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const getApi = async (url, payload) => {
    const response = await request.get(url, { params: payload });
    return response.data;
};

export const postApi = async (url, payload) => {
    const response = await request.post(url, payload);
    return response.data;
};

export const putApi = async (url, payload) => {
    const response = await request.put(url, payload);
    return response.data;
};

export const deleteApi = async (url, payload) => {
    const response = await request.delete(url, { data: payload });
    return response.data;
};

export default request;
