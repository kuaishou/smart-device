(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.memberModule = factory());
}(this, (function () { 'use strict';

    var device = navigator.platform + '---' + navigator.userAgent;
    var lDev = device.toLowerCase();
    function getUrlValue(url) {
        url = url ? url : window.location.href;
        if (url.indexOf('#') > -1) {
            url = url.split('#')[0];
        }
        var variable = url.split('?')[1];
        if (!variable) {
            return {};
        } else {
            var value = {};
            variable = variable.split('&');
            for (var i = 0, m = variable.length; i < m; i++) {
                var tempv = variable[i].split('=')[1];
                if (typeof (tempv) != 'undefined') {
                    if (tempv == 'null' || tempv == 'undefined') {
                        tempv = '';
                    }
                    tempv = decodeURIComponent(tempv).replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    value[variable[i].split('=')[0]] = tempv;
                }
            }
            return value;
        }
    }
    function isWeiXin() {
        return lDev.match(/micromessenger\/([\d\.]+)/i);
    }
    function $location(url, data, replaceFlag) {
        var p = getUrlValue();
        if (p.isLog == 'true') {
            data ? data = data.isLog = true : data = { isLog: true };
        }
        if (data) {
            if (url.indexOf('?') > -1) {
                url = url + "&" + (serialize(data));
            } else {
                url = url + "?" + (serialize(data));
            }
            // return false;
        }
        if (replaceFlag) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }

    }
    function serialize(data) {
        var arr = [];
        for (var name in data) {
            arr.push(name + "=" + data[name]);
        }
        return arr.join("&");
    }
    function setCookie(key, value, options) {
        options = options || {};

        typeof (options.path) == 'undefined' && (options.path = '/');//将默认cookie路径设置为域名根目录,否则默认是当前页面目录。cookie不能全站共享

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var time = options.expires, t = options.expires = new Date();
            t.setTime(t.getTime() + time*1000);
        }
        value = String(value);

        //ie11 does not accepts domain
        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.secure ? '; secure' : ''].join(''));
    }
    function getCookie(key, options) {
        if ( options === void 0 ) options = {};

        //  options = value || {};

        var decode = options.raw ? function (s) {
            return s;
        } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key)
                { return decode(pair[1] || ''); }
        }
        return null;
    }

    var getProto = Object.getPrototypeOf,
        class2type = {},
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object);
    function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    }
    function isPlainObject(obj) {
        var proto, Ctor;

        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }

        proto = getProto(obj);

        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if (!proto) {
            return true;
        }

        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    }

    function mergeOptions() {
        var arguments$1 = arguments;

        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }


        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments$1[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = mergeOptions(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    var minFetch = function (config) {
        config = mergeOptions({
            method: 'get',
            success: function () { },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            error: function () { }
        }, config);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            var status = xhr.status;
            if (xhr.readyState == 4) {
                if (status == 200) {
                    var text = xhr.response;
                    try {
                        text = JSON.parse(text);
                    } catch (error) {

                    }
                    config.success(text);
                }
            }
        };
        if ('application/json' === config.header["content-type"]) {
            config.data = JSON.stringify(config.data);
        } else {
            config.data = serialize$1(config.data);
        }
        if (config.params) {
            if (config.url.indexOf('?') > -1) {
                config.url = (config.url) + "&" + (serialize$1(config.params));
            } else {
                config.url = (config.url) + "?" + (serialize$1(config.params));
            }

        }

        xhr.open(config.method, config.url);
        xhr.setRequestHeader("Content-Type", config.header["content-type"]);
      
        xhr.send(config.data);
        
    };
    function serialize$1(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        return arr.join("&");
    }

    var ref = getUrlValue();
    var appCode = ref.appCode; if ( appCode === void 0 ) appCode = 'wsc';
    var prefix = appCode + "_";
    // if (appCode = 'wsc') {
    // prefix = `${prefix}_${appCode}_`
    // }
    var memberModule = function memberModule() {
        this.url = '/eb-web/vue/member/index.html';
    };
    memberModule.prototype.setLogin = function setLogin (token) {

        setCookie((prefix + "token"), token, {
            expires: 60 * 60 * 2
        });
    };
    memberModule.prototype.getToken = function getToken () {

        return getCookie((prefix + "token"));
    };
    memberModule.prototype.isLogin = function isLogin () {
        return !!this.getToken()
    };
    memberModule.prototype.checkLogin = function checkLogin (success, fail, error) {
        if (!this.isLogin()) {
            fail({
                errCode: '-1',
                errMsg: '没登录'
            });
            return false;
        }
        minFetch({
            method: 'post',
            url: "/pup/usercenter/sso/getUserByToken",
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
        });
    };
    memberModule.prototype.toLogin = function toLogin (loginBackUrl) {
        loginBackUrl = loginBackUrl || location.href;
        // let params = getUrlValue();
        var p = [];
        // if(params.appCode){}
        // params.appCode && p.push(`appCode=${params.appCode}`);
        // params.appCode||p.push(params.appCode);
        appCode && p.push(("appCode=" + appCode));
        // let appCode = params.appCode;
        var loginUrl = location.origin + "/eb-web/vue/member/login.html?" + (p.join('&')) + "&loginBackUrl=" + (encodeURIComponent(loginBackUrl));
        if (isWeiXin()) {
            $location(("/eb-web/vue/oAuth/index.html?" + (p.join('&')) + "&source=login&oAuthBackUrl=" + (encodeURIComponent(loginUrl))));
        } else {
            $location(loginUrl);
        }
    };
    memberModule.prototype.toWxAuthorize = function toWxAuthorize (authInfo) {
        // let params = getUrlValue();
        // let { appCode } = getUrlValue();
        var scope = 'snsapi_base';
        // appCode = appCode || 'wsc';
        if (authInfo === true) {
            scope = 'snsapi_userinfo';
        } else if (typeof authInfo === 'object') {
            if (authInfo.userinfo) {
                scope = 'snsapi_userinfo';
            }
        }
        var data = {
            oAuthBackUrl: encodeURIComponent(location.href),
            appCode: appCode,
            scope: scope
        };
        var url = "/eb-web/vue/oAuth/index.html";
        {
            $location(url, data, false);
        }

    };


    memberModule.prototype.setWxToken = function setWxToken (token) {

        setCookie((prefix + "wx_token"), token, {
            expires: 60
        });
    };
    memberModule.prototype.getWxToken = function getWxToken (token) {

        return getCookie((prefix + "wx_token"));
    };
    memberModule.prototype.setWeiXinInfo = function setWeiXinInfo (weiXinInfo) {
        setCookie((prefix + "openid"), weiXinInfo.openid);
        if (weiXinInfo.headimgurl) {
            setCookie((prefix + "headimgurl"), weiXinInfo.headimgurl);
        }
        if (weiXinInfo.nickname) {
            setCookie((prefix + "nickname"), weiXinInfo.nickname);
        }
    };
    memberModule.prototype.getWeiXinInfo = function getWeiXinInfo () {
        return {
            openid: this.getOpenID(),
            nickname: getCookie((prefix + "nickname")),
            headimgurl: getCookie((prefix + "headimgurl"))
        }
    };
    memberModule.prototype.getOpenID = function getOpenID () {
        return getCookie((prefix + "openid"));
    };
    var index = new memberModule;

    return index;

})));
