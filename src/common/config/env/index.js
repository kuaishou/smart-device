
let baseUrl = 'https://m.sinosafe.com.cn'
let apiUrl = 'https://agent.sinosafe.com.cn'
let cdnUrl = 'https://s.sinosafe.com.cn'
let appid = `wx57cc5818cd87508d`
// baseUrl = 'https://mtest.sinosafe.com.cn'
// apiUrl = 'https://agenttest.sinosafe.com.cn'
// cdnUrl = 'https://stest.sinosafe.com.cn'
let host = window.location.hostname;
let isProduction = true;
let routerMode = '';
if (/10|127|localhost/.test(host)) {//本地环境
    isProduction = false;
} else if (/stg|test/.test(host)) {//测试环境
    isProduction = false;;
}
// isProduction = true;
if (!isProduction) {
    // process.
    baseUrl = 'https://mtest.sinosafe.com.cn';
    cdnUrl = 'https://stest.sinosafe.com.cn';
    apiUrl = 'https://agenttest.sinosafe.com.cn'
    appid = `wx554f9515ada6c15c`
    // baseUrl = 'http://192.168.56.1:8080';
    // cdnUrl = 'http://192.168.56.1:8080';
    // apiUrl = 'http://192.168.56.1:8080'
}

export {
    baseUrl,
    apiUrl,
    cdnUrl,
    appid,
    isProduction,
    routerMode
}