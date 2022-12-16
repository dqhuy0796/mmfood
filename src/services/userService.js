import * as httpsRequest from '~/utils/httpsRequest';

export const UserService = async (username, password) => {
    const path = 'login';
    const payload = {
        email: username,
        password: password,
    };
    try {
        const result = await httpsRequest.postApi(path, payload);
        return result.user;
    } catch (error) {
        console.log(error);
    }
};
