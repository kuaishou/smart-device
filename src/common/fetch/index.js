/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-12 15:13:51
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import axios from 'axios'
import Toast from '../ui/toast'
import Loading from '../ui/loading'
import {
    errorText
} from '../texts'
import qs from 'qs';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('fetch');
export const CancelToken = axios.CancelToken
axios.interceptors.request.use(config => {

    logCode.debug(`${config.url}`);
    logCode.debug(`请求数据=`, config.data);
    //默认所有接口loading
    if (!config.params) {
        config.params = {};
    }
    config.params._t = +new Date();
    if (config.loading !== false) {
        Loading.show();
    }
    if (config.headers["Content-Type"] == 'application/x-www-form-urlencoded') {
        config.data = qs.stringify(config.data);
    }
    logCode.log('请求前配置-config', config);
    return config;
}, err => {
    // Toast

    return Promise.reject(err);
})
axios.interceptors.response.use((res) => {
    logCode.log('请求后配置-config', res);

    // debugger
    if (res.data &&
        res.data.errCode != 0 &&
        res.data.errMsg &&
        !res.config.noAutoShowError
    ) {

        Toast.show(res.data.errMsg);
    }
    if (res.config.loading !== false) {
        Loading.hide();
    }

    return res;
}, err => {
    // debugger
    try {
        if (err.config.loading !== false) {
            Loading.hide();
        }!err.config.noAutoShowError && Toast.show(errorText || '服务器发生错误');
    } catch (error) {
        Loading.hide();
    }
    logCode.error('服务器发生错误', errorText);

    // alert(errorText)

    return Promise.reject(err);
})

function handleData(res) {
    logCode.log('处理返回数据', res)
    return res.data;
}
export function get(url, data, config) {
    console.log('get---')
    return axios.get(url, data, config).then(handleData);
    // return new Promise((resolve,reject)=>{
    //     resolve(res.data,res)
    // })
}
export function post(url, data, config) {
    // logCode.log('post---')
    return axios.post(url, data, config).then(handleData);;
}