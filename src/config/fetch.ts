import {
    baseUrl
} from '@/common/config/env'
import axios from 'axios'


axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['Authorization'] = localStorage.getItem('token');
        }
        return config;
    },
    err => {
        // Toast
        return Promise.reject(err);
    });

export const get = (
    url: string,
    config?: Object
) => {
    console.log('get')
    // return fetch(baseUrl + url, config)
    //  if (!(url.indexOf('https://') == 0)) {
    //     url = `${baseUrl}${url}`;
    // }
    return axios.get(url, config)
        .then(res => {
            if (res.data.code == 200) {
                return res.data.data;
            }
            //  return Promise.;
        });
}
export const post = (url: string, data: Object, config: Object = {}): Promise<any> => {
    // return fetch(baseUrl + url, data, config);
    //  if (!(url.indexOf('https://') == 0)) {
    //     url = `${baseUrl}${url}`;
    // }
    return axios.post(url, data, config).then(res => {
        console.log(res.data)
        //  if(res.data.code==200){
        return res.data;
        //  }
        //  return Promise.;
    });
    // return ""
}
export const fetch = (url: string | Object, data?: Object, config: any = {}) => {
    if (typeof url === 'string') {
        config.url = url;
    }
    if (data != null) {
        config.data = data;
        
    }
    
    return axios(config);
}

export default {
    get,
    post
}