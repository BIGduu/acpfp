import request from "@/axios/index";

export const requestLogon = (data) => {
    return request('/user/logon', data, "post");
};
