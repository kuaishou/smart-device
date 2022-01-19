/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-12 15:41:41
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { get, post, CancelToken } from '@/common/fetch'
import { apiUrl, cdnUrl, baseUrl } from '@/common/config/env';
import LogCode from '@/lib/LogCore';
const logCore = new LogCode('api')
let autoApiUrl = apiUrl;
let request: any = {};
const requestRecord = (name: string) => {

    return new CancelToken((fun: Function) => {

        request[name] = fun;
    })
}
export default {
    changeApiUrl(url: string) {
        autoApiUrl = url;
    },
    /**
     * 取消所有请求
     */
    cancelAll() {
        logCore.debug('终止所有请求')
        try {
            Object.keys(request).forEach(name => {
                request[name] && request[name]()
            })
        } catch (error) {

        }

    },
    /**
     * 取消请求
     * @param name 请求名称
     */
    cancel(name: string) {
        logCore.debug('取消', request[name]);
        if (typeof request[name] == 'function') {
            request[name]();
            delete request[name];
        }

    }
}
//提核
export const confirmPolicy = (data: Object) => {

    // return post(`http://10.11.29.174:3804/underwriteConfirmPolicy`, data)
    return post(`${autoApiUrl}/fc/nsp-underwrite/underwriteConfirmPolicy`, data, {
        cancelToken: requestRecord('confirmPolicy'),
    })

}
export const apply = (data: Object) => {

    // return post(`http://10.11.29.174:3804/simpleUnderwrite`, data)
    return post(`${autoApiUrl}/fc/nsp-underwrite/simpleUnderwrite`, data, {
        cancelToken: requestRecord('apply'),
    })

}
//http://agenttest.sinosafe.com.cn/fc/nsp-query/channel/queryPolicyInfo
export const queryOpenidPolicyInfo = (data: Object) => {
    return post(`${autoApiUrl}/fc/nsp-confirm/queryOpenidPolicyInfo`, data, {
        cancelToken: requestRecord('queryOpenidPolicyInfo'),
        header: { 'content-type': 'application/x-www-form-urlencoded' }
    })

}

export const terminalCancelPolicy = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-confirm/terminalCancelPolicy`, data, {
        noAutoShowError: true,
        cancelToken: requestRecord('terminalCancelPolicy')
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}
export const checkBatchCancelPolicy = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-confirm/checkBatchCancelPolicy`, data, {
        // noAutoShowError: true,
        cancelToken: requestRecord('checkBatchCancelPolicy')
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}

export const terminalBatchCancelPolicy = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-confirm/terminalBatchCancelPolicy`, data, {
        noAutoShowError: true,
        cancelToken: requestRecord('terminalBatchCancelPolicy')
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}
export const cancelPolicy = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-confirm/cancelPolicy`, data, {
        noAutoShowError: true,
        cancelToken: requestRecord('cancelPolicy')
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}

export const queryPolicyInfo = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-query/channel/queryPolicyInfo`, data, {
        cancelToken: requestRecord('queryPolicyInfo')
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}
export const queryTerminalPolicyList = (data: Object, config?: any) => {

    return post(`${autoApiUrl}/fc/nsp-query/channel/queryTerminalPolicyList`, data, Object.assign({
        cancelToken: requestRecord('queryTerminalPolicyList')
    }, config))
}
export const queryCommonPolicyList = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-query/channel/queryCommonPolicyList`, data, {
        cancelToken: requestRecord('queryCommonPolicyList')
        // return post(`http://10.11.29.228:3808/channel/queryCommonPolicyList`, data, {
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}
export const queryCommonPolicyStat = (data: Object) => {
    return post(`${autoApiUrl}/fc/nsp-query/channel/queryCommonPolicyStat`, data, {
        cancelToken: requestRecord('queryCommonPolicyStat')
        // return post(`http://10.11.29.228:3808/channel/queryCommonPolicyStat`, data, {
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}
export const queryTerminalPolicyStat = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-query/channel/queryTerminalPolicyStat`, data, {
        cancelToken: requestRecord('queryTerminalPolicyStat')
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}
export const terminalManage = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-query/terminalManage`, data, {
        cancelToken: requestRecord('terminalManage'),
        header: { 'content-type': 'application/x-www-form-urlencoded' }
    })
}
export const printTerminalCount = (data: Object) => {

    return post(`${autoApiUrl}/fc/nsp-query/printTerminalCount`, {}, {
        noAutoShowError: true,
        loading: false,
        params: data
    })
}
//报价
export const quotePrice = (data: Object) => {
    return post(`${autoApiUrl}/fc/nsp-query/quote`, data, {
        cancelToken: requestRecord('quotePrice'),
    })
}
export const  queryPayStatus = (applyNo: string) => {

    return get(`${baseUrl}/payment/paystatus?applyNo=${applyNo}`, {
        cancelToken: requestRecord('paystatus'),
        loading: false,
    })
}
export const terminalUpdateCustomer = (data: FeiHang.CustomerInfo) => {
    // debugger
    return post(`${autoApiUrl}/fc/nsp-underwrite/terminalUpdateCustomer`, data, {
        loading: false,
    });
    // return post(`http://10.11.29.174:3804/terminalUpdateCustomer`,data);
    // return post(`${autoApiUrl}/fc/nsp-underwrite/terminalUpdateCustomer`,data);
}

export const payQRCode = (data: Object) => {
    return get(`/payment/payOnline/payQRCode`, {
        loading: false,
        params: data
    })
}
/**
 * 检查限购或相似产品
 * @param data 
 */
export const checkFeiHangBeforeUnderwrite = (data: Object) => {
    // debugger
    return post(`${apiUrl}/fc/nsp-underwrite/checkFeiHangBeforeUnderwrite`, data, {

    });
  
}
//获取协议文件
export const getHtm = (url: string) => { 
    return get( url, {
        loading: true,
    })
}