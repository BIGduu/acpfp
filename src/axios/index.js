import axios from 'axios'
import qs from 'qs'
import da from "element-ui/src/locale/lang/da";

axios.defaults.baseURL = 'http://localhost:8888';
if (process.env.NODE_ENV === 'dev') {
    axios.defaults.baseURL = 'http://localhost:8888';
} else if (process.env.NODE_ENV === 'prod') {
    axios.defaults.baseURL = 'http://36.42.73.246:9999';
}

//请求超时，单位ms
axios.defaults.timeout = 10000;
//设置默认请求地址和是否保持session
axios.defaults.withCredentials = true;

export default function request(url = '', data = {}, method = 'get',) {
    return new Promise(function (resolve, reject) {
        let promise;
        if (method.toLocaleLowerCase('get')) {
            promise = axios({method: method, url: url, params: data})
        } else if (method.toLocaleLowerCase('post')) {
            promise = axios({method: method, url: url, data: data})
        } else if (method.toLocaleLowerCase('patch')) {
            promise = axios({method: method, url: url, data: data})
        } else if (method.toLocaleLowerCase('delete')) {
            promise = axios({method: method, url: url, data: data})
        } else if (method.toLocaleLowerCase('login')) {
            axios(
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
                if (response.status === 401) {
                    this.$router.push({name: 'home'})
                }
                return resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            })
    });
}

