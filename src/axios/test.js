import request from './index'

export const requestDefaultTest = (data) => {
    return request('/test/default', data, "get");
};

export const requestAllTest = (data) => {
    return request('/test/allSubject', data, "get");
};

export const requestSingleTest = (data) => {
    return request('/test/single', data, "get");
};

export const requestPractiseTest = (data) => {
    return request('/test/practise', data, "get");
};

export const requestMultipleTest = (data) => {
    return request('/test/multiple',data,'get')
};

export const requestErrorTest = (data) => {
    return request('/test/error',data,'get')
};

