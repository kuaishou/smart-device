import wx from './sdk/jweixin-1.4.0'

import minFetch from '../minFetch'
function init() {

    minFetch({
        url: '/micro-plat/commonData/getWeiXinTicket.do',
        method: 'post',
        data: { reqURL: location.href.split('#')[0] },
        success: function (res) {
            // wx.c
            wx.config({
                debug: false,
                appId: res.appid,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    // 'hideMenuItems',
                    // 'showMenuItems',
                    // 'hideAllNonBaseMenuItem',
                    // 'showAllNonBaseMenuItem',
                    // 'translateVoice',
                    // 'startRecord',
                    // 'stopRecord',
                    // 'onVoiceRecordEnd',
                    // 'playVoice',
                    // 'onVoicePlayEnd',
                    // 'pauseVoice',
                    // 'stopVoice',
                    // 'uploadVoice',
                    // 'downloadVoice',
                    // 'chooseImage',
                    // 'previewImage',
                    // 'uploadImage',
                    // 'downloadImage',
                    // 'getNetworkType',
                    // 'openLocation',
                    // 'getLocation',
                    // 'hideOptionMenu',
                    // 'showOptionMenu',
                    // 'closeWindow',
                    // 'scanQRCode',
                    // 'chooseWXPay',
                    // 'openProductSpecificView',
                    // 'addCard',
                    // 'chooseCard',
                    // 'openCard'
                ]
            });

        }
    });


}
let wxModule = {
    init
};
//对于用户触发时才调用的接口，则可以直接调用，需要放在ready函数中
//后续自己用到的方法放到相对应的实现上
[
    'updateTimelineShareData',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
].forEach(v => {
    wxModule[v] = function (p) {
        console.log(v + '参数', p)
        wx.ready(() => {
            wx[v](p);
        })
    }

});
//对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
//后续自己用到的方法放到相对应的实现上
[
    'checkJsApi',
    'ready',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getLocalImgData',
    'startRecord',
    'stopRecord',
].forEach(v => {
    wxModule[v] = function (p) {
        console.log(v + '参数', p)
        //wx.ready(() => {
            wx[v](p);
       // })
    }

})

export default wxModule;

