import request from './index'

export const requestLogin = (data) => {
    return request('/login', data, "login");
};
