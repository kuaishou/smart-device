/*
 * @Author: xinghaodong@sinosafe.com.cn 
 * @Date: 2020-08-12 14:35:10 
 * @Last Modified by: xinghaodong@sinosafe.com.cn
 * @Last Modified time: 2020-10-13 11:21:39
 */
import { setCookie, getCookie ,removeCookie} from '@/common/utils/browser';
import { isProduction} from '@/common/config/env';
import { isFunction } from '@/common/utils/jsType'

/**
 * 录制开始
 * data:录制信息
 */
export function Sitstart(data) {//带参数录制
    if(window.SituRecorder){
        let isEnv =isProduction ? 'prd':'test' ;
        let initParams = {
            publicKey: '',                                // 公钥，string，可选
            timeout: 20,                                // 单次录制超时时间，单位：秒，number，不少于10秒，可选
            videoMaxSize: 3,                              // 录制视频最大容量限制，单位：M，number，不少于1M，可选
            recordPerTime: 6,                            // 定时推送录制内容时长，单位：秒，number，不少于5秒，可选，未传时请使用stopRecord方法终止录制
            taskId: '',                                    // 任务ID，string，可选
            first: 1 ,                                       //否是否为首次启动录制，1=是；如taskId未传值或为空，first为1，则生成新的taskId   
            env:isEnv                                   //环境变量声明test为测试环境  prd生产环境
        }                                               // 不需要的参数请不要传
        initParams = Object.assign(initParams, data)
        try {
            var res = SituRecorder.startRecord(initParams);
            if (res.code === 10000) {
                setCookie('taskId',  res.result.taskId);
                console.log('带参启动录制返回结果：'+res)
            }
            return res;
        } catch (error) {
            return false;
        }
    }
    return false;
}
/**
 * 结束录制视频
 * num：number是否为最后一个视频，1=是，0=非
 * stopData：产品信息
 */
export function Sitstop(num,stopData) {//结束录制(最后一个)
    let data = {}
    let orderInfo = {}
    let orderId = getCookie('taskId')
    let callback;
    orderInfo={
        orderId : orderId || '' ,
        insuranceNo:'',// 保单号
        businessType:'非车',//业务类型
        channel:'飞航终端机', // 渠道
        platform:'H5',// 平台：web、微信、小程序、app、H5
        productName:'', // 产品名称
        productCode:'', // 产品编码
        account:'',  // 当前客户账号，可能是微信ID、手机号
        policyHolder:'',  // 投保人
        success:1, // 是否购买成功，0=失败，1=成功
        extraInfo:'' // 额外信息
      }
    orderInfo.createTime=Date.now() ; // 提交时间，时间戳
    if(stopData.callback){//回调函数
        callback=stopData.callback
    }
    orderInfo = Object.assign(orderInfo, stopData)
    data.orderInfo = orderInfo
    data.last = num                                              // 是否为最后一个视频，1=是，0=非
    if (!window.SituRecorder) {
        isFunction(callback) && callback();
        return false;
    }
    try {
        return SituRecorder.stopRecord(data).then(function(res) {
            if (data.last) {
                removeCookie('taskId');
            }
            isFunction(callback) && callback(res);
        }).catch(function(er){
            isFunction(callback) && callback(res);
        });
    } catch(e) {
        isFunction(callback) && callback({});
        return false;
    }
}
/**
* 发送log记录
* type: string LOAD_PAGE载入页面 | CLICK_ENTER 点击输入 | CLICK_BUTTON 点击按钮 | CLICK_SELECT 点击选中 | CLICK_CLOSE 点击关闭
* title: string 条款名称
*/
export function Sitlog(title,type) {
    if (!window.SituRecorder) {
        return false;
    }
    try {
        let data = {}
        let orderId = getCookie('taskId')
        data.orderId = orderId                             // 订单ID
        data.type = type || 'CLICK_BUTTON'                                 // 操作类型code，INPUT等
        data.description = title                  // 客户自定义操作描述
        return SituRecorder.createOperation(data) 
    } catch (error) {
        return false;
    }
    
}

