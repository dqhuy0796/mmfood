import * as httpsRequest from '~/utils/httpsRequest';

export const LoginService = async (user) => {
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

export const RegisterService = async (user) => {
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
