import * as httpsRequest from '~/utils/httpsRequest';

export const GetPosts = async () => {
    try {
        const path = 'post/get';
        const payload = {
            id: 'all',
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const GetPostById = async (id) => {
    try {
        const path = 'post/get';
        const payload = {
            id: id,
        };
        const data = await httpsRequest.getApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const CreatePost = async (post) => {
    try {
        const path = 'post/create';
        const payload = {
            title: post.title,
            overview: post.overview,
            content: post.content,
            imageUrl: post.imageUrl,
            author: post.author,
        };
        const data = await httpsRequest.postApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const UpdatePost = async (post) => {
    try {
        const path = 'post/update';
        const payload = {
            id: post.id,
            title: post.title,
            overview: post.overview,
            content: post.content,
            imageUrl: post.imageUrl,
            author: post.author,
        };
        const data = await httpsRequest.putApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const DeletePost = async (postId) => {
    try {
        const path = 'post/delete';
        const payload = {
            id: postId,
        };
        const data = await httpsRequest.deleteApi(path, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
