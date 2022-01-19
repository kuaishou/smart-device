
import mergeOptions from '../../utils/mergeOptions'
import config from './config'
// import {isMobile} from '../../utils/browser'
import _console from './console'
import _event from './event'
const win = window, doc = document;
console.log('common-import-core:', win.logCore)
var logCore = mergeOptions(true, config, win.logCore);
//初始化日志
logCore.init = function (opt) {
    mergeOptions(logCore, opt)

    let isShowLog = location.search.indexOf('isLog=true') > -1;
    if (isShowLog) {
        this.loadDebug();
    }
    //不是电脑的
    if ('Win32' == navigator.platform) {
        _console.init();
    }
    _event.init();
}

logCore.loadDebug = function () {
    logCore.isStartupLog = true;
    let s = document.createElement('script');
    s.src = 'https://s.sinosafe.com.cn/eb-web/libs/log/vconsole.min.js'
    document.body.append(s)
}
win.logCore = logCore
export default logCore;