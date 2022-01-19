/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-12 15:14:15
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
// export const get:(url:string,data:Object,config?:any)=>Promise<any>
// export const post:(url:string,data:Object,config?:any)=>Promise<any>
// export default:{
//     get,
//     post,
// }
// import axios, { AxiosPromise } from 'axios'
export const get: (url:string,data?:Object,config?:Object) => Promise<any>
export const post: (url:string,data?:Object,config?:Object) => Promise<any>
export const CancelToken:any
// export default axios;