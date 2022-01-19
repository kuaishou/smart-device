type a = {
    method: 'get' | 'post',
    url: string
    data?: any,
    success?: Function,
    error?: Function,
    params?: any,
    header?: any
};
declare const minFetch: (a: a) => {}
 
export default minFetch;