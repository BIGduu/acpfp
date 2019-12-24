import request from './index'

export const loginRequest = (data) => {
    return request('/login',data,"post");
};
