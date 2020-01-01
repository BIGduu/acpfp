import request from "./index";

export const requestLogon = (data) => {
    return request('/user/logon', data, "post");
};
