import * as httpsRequest from '~/utils/httpsRequest';

export const GetUsers = async () => {
    try {
        const path = 'user/get';
        const payload = {
            id: 'all',
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const GetUserById = async (id) => {
    try {
        const path = 'user/get';
        const payload = {
            id: id,
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const CreateUser = async (user) => {
    try {
        const path = 'user/create';
        const payload = {
            password: user.password,
            name: user.name,
            birth: user.birth,
            avatarUrl: user.avatarUrl,
            phone: user.phone,
            email: user.email,
            address: user.address,
            role: user.role,
        };
        const data = await httpsRequest.postApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const UpdateUser = async (user) => {
    try {
        const path = 'user/update';
        const payload = {
            id: user.id,
            name: user.name,
            birth: user.birth,
            avatarUrl: user.avatarUrl,
            phone: user.phone,
            email: user.email,
            address: user.address,
            role: user.role,
        };
        const data = await httpsRequest.putApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const DeleteUser = async (userId) => {
    try {
        const path = 'user/delete';
        const payload = {
            id: userId,
        };
        const data = await httpsRequest.deleteApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
