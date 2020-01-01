import axios from 'axios'
import qs from 'qs'
import router from '../router/index';

// let baseURL = 'http://10.202.164.131:8888';
let baseURL = 'http://localhost:8888';
let timeout = 100000;


const instance = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    withCredentials: true
});

instance.interceptors.response.use(response => {
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                router.replace({name: 'login'});
                location.reload();
            }
            return Promise.reject(error.response.data);

        }
    }
);

export default function request(url = '', data = {}, method = 'get',) {
    return new Promise(function (resolve, reject) {
        let promise;
        if (method.toLowerCase() === 'get') {
            promise = instance({method: method, url: url, params: data})
        } else if (method.toLowerCase() === 'post') {
            promise = instance({method: method, url: url, data: data})
        } else if (method.toLowerCase() === 'patch') {
            promise = instance({method: method, url: url, data: data})
        } else if (method.toLowerCase() === 'delete') {
            promise = instance({method: method, url: url, data: data})
        } else if (method.toLowerCase() === 'login') {
            promise = instance(
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'post',
                    url: url,
                    data: qs.stringify(data)
                }
            );
        }
        promise
            .then(function (response) {
                if (!response) {
                    return resolve(null);
                }
                return resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            })
    });
}

