import { setCookie, $location, getCookie, isWeiXin, getUrlValue } from '../../utils/browser'
import minFetch from '../../minFetch'

let { appCode = 'wsc' } = getUrlValue();
let prefix = `${appCode}_`
// if (appCode = 'wsc') {
// prefix = `${prefix}_${appCode}_`
// }
class memberModule {
    constructor() {
        this.url = '/eb-web/vue/member/index.html'
    };

    setLogin(token) {

        setCookie(`${prefix}token`, token, {
            expires: 60 * 60 * 2
        })
    }
    getToken() {

        return getCookie(`${prefix}token`);
    }
    isLogin() {
        return !!this.getToken()
    }
    checkLogin(success, fail, error) {
        if (!this.isLogin()) {
            fail({
                errCode: '-1',
                errMsg: '没登录'
            })
            return false;
        }
        minFetch({
            method: 'post',
            url: `/pup/usercenter/sso/getUserByToken`,
            success: function (res) {
                if (res.errCode === 0) {
                    success(res.data);
                } else {
                    fail(res);
                }
            },
            error: function () {
                error ? error() : alert('抱歉，网络可能有点堵车，请稍后重试！');
            },
            params: {
                token: this.getToken()
            }
        })
    }
    toLogin(loginBackUrl) {
        loginBackUrl = loginBackUrl || location.href;
        // let params = getUrlValue();
        let p = [];
        // if(params.appCode){}
        // params.appCode && p.push(`appCode=${params.appCode}`);
        // params.appCode||p.push(params.appCode);
        appCode && p.push(`appCode=${appCode}`);
        // let appCode = params.appCode;
        let loginUrl = location.origin + `/eb-web/vue/member/login.html?${p.join('&')}&loginBackUrl=${encodeURIComponent(loginBackUrl)}`
        if (isWeiXin()) {
            $location(`/eb-web/vue/oAuth/index.html?${p.join('&')}&source=login&oAuthBackUrl=${encodeURIComponent(loginUrl)}`)
        } else {
            $location(loginUrl);
        }
    }
    toWxAuthorize(authInfo) {
        // let params = getUrlValue();
        // let { appCode } = getUrlValue();
        let scope = 'snsapi_base',
            replace = false;
        // appCode = appCode || 'wsc';
        if (authInfo === true) {
            scope = 'snsapi_userinfo'
        } else if (typeof authInfo === 'object') {
            if (authInfo.userinfo) {
                scope = 'snsapi_userinfo'
            }
        }
        let data = {
            oAuthBackUrl: encodeURIComponent(location.href),
            appCode,
            scope
        }
        let url = `/eb-web/vue/oAuth/index.html`;
        if (replace) {
            $location(url, data, true);
        } else {
            $location(url, data, false);
        }

    }


    setWxToken(token) {

        setCookie(`${prefix}wx_token`, token, {
            expires: 60
        });
    }
    getWxToken(token) {

        return getCookie(`${prefix}wx_token`);
    }
    setWeiXinInfo(weiXinInfo) {
        setCookie(`${prefix}openid`, weiXinInfo.openid);
        if (weiXinInfo.headimgurl) {
            setCookie(`${prefix}headimgurl`, weiXinInfo.headimgurl);
        }
        if (weiXinInfo.nickname) {
            setCookie(`${prefix}nickname`, weiXinInfo.nickname);
        }
    }
    getWeiXinInfo() {
        return {
            openid: this.getOpenID(),
            nickname: getCookie(`${prefix}nickname`),
            headimgurl: getCookie(`${prefix}headimgurl`)
        }
    }
    getOpenID() {
        return getCookie(`${prefix}openid`);
    }

}
export default new memberModule;