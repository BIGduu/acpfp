import request from "./index";

export const requestLogErrorSubject = (data) => {
    return request('/errorSubject',data,'post')
};


export const requestGetErrorSubject = (data) => {
    return request('/errorSubject',data,'get')
};

