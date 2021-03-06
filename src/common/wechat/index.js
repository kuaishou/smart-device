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
//??????????????????????????????????????????????????????????????????????????????ready?????????
//??????????????????????????????????????????????????????
[
    'updateTimelineShareData',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
].forEach(v => {
    wxModule[v] = function (p) {
        console.log(v + '??????', p)
        wx.ready(() => {
            wx[v](p);
        })
    }

});
//?????????????????????????????????????????????????????????????????????????????????ready?????????
//??????????????????????????????????????????????????????
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
        console.log(v + '??????', p)
        //wx.ready(() => {
            wx[v](p);
       // })
    }

})

export default wxModule;

