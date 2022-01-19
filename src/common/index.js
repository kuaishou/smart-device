
import logCore from './log-core'

import { isProduction } from './config/env'
const FastClick = require('fastclick');
const win = window, doc = document;
FastClick.attach(doc.body);

//百度统计
function initBaidu() {
    win._hmt = win._hmt || [];
    let hm = doc.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?d6471f45d65f7b64ba334e3c4a25d830";
    let s = doc.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
}
//百度监听
function initBaiduEvent() {
    doc.addEventListener('click', function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target && target.getAttribute('_bdEvent')) {

            var _bdArr = [
                e.target.getAttribute('_bdEvent'),
                e.target.getAttribute('_bdCategory'),
                e.target.getAttribute('_bdAction'),
                e.target.getAttribute('_bdLabel'),
                e.target.getAttribute('_bdValue')
            ];
            if (!isProduction) {
                //事件名称不加前缀
                for (var i = 1; i < _bdArr.length; i++) {
                    _bdArr[i] = "测试环境-" + _bdArr[i];
                }
            }
            bdTrigger(_bdArr);
        }
    })
}
function bdTrigger(array) {
    win._hmt = win._hmt || [];
    win._hmt.push(array);
}
let common = {

    init: function () {
        logCore.init();
        initBaidu();
        initBaiduEvent();
    }
}
export default common;