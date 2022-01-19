import { MutationTree } from 'vuex';
// import * as _ from 'lodash'
import * as types from './mutation-types'
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('store/insure/mutations')

export const mutations: MutationTree<FeiHang.InsureParam> = {
    //重置流程
    [types.SET_INSURE](state: FeiHang.InsureParam, payload: Payload) {
        // state = payload.content;
        Object.assign(state,payload.content);
        // state.insureds = payload.content.insureds;
        // state.holder = payload.content.holder;
        // state.payment = payload.content.payment;
        // state.policy = payload.content.policy;
        // state.product = payload.content.product;
        // state.source = payload.content.source;
        // state.policyExt = payload.content.policyExt;
        // state.saleInfo= payload.content.saleInfo;
       
        // state.trans = payload.content.trans;
    },
    [types.CLEAR_INSURED](state: FeiHang.InsureParam) {
        state.insureds = [];

    },
    [types.RESET_FLOW](state: FeiHang.InsureParam, payload: Payload) {
        // state.policy.appTime = noNormalDate(UDate.now(0, 'yyyy-MM-dd hh:mm:ss'))
        // state.policy.businessNo = uuid()
        state.policy.appTime = payload.content.appTime;
        state.policy.businessNo = payload.content.businessNo;
    },
    [types.SET_HOLDER](state: FeiHang.InsureParam, payload: Payload) {
        console.log('设置投保人');
        // state.holder.age = payload.content.age;
        // state.holder.bornDate = payload.content.bornDate;
        // state.holder.holderName = payload.content.holderName;
        // state.holder.idcartNo = payload.content.idcartNo;
        // state.holder.idcartType = payload.content.idcartType;
        // state.holder.mail = payload.content.mail;
        // state.holder.mobile = payload.content.mobile;
        // state.holder.sex = payload.content.sex;
        state.holder = payload.content;

    },
    [types.SET_PREMIUM](state: FeiHang.InsureParam, payload: Payload) {
        logCode.debug('设置保费')
        state.policy.totalInsuredAmt = payload.content.totalInsuredAmt;
        state.policy.actualPremiumAmt = payload.content.actualPremiumAmt;
        state.policy.originalPremiumAmt = payload.content.originalPremiumAmt;

    },
    // 设置保险开始
    [types.SET_INSURANCE_START_DATE](state: FeiHang.InsureParam, payload: Payload) {
        // logger.log('设置开始时间', payload.content)

        state.policy.insuredBgnTime = payload.content;
    },
    // 设置推广员信息
    [types.SET_PROMOTE_INFO](state: FeiHang.InsureParam, payload: Payload) {
        
        state.policyExt.airportCode = payload.content.airportCode;
        state.policyExt.promoteCode = payload.content.promoteCode;
        state.policyExt.promoteName = payload.content.promoteName;
        state.saleInfo.salesCode =  payload.content.salesCode;
        state.saleInfo.subChannelCode =  payload.content.subChannelCode;
        state.source.cooperateCode =  payload.content.cooperateCode;
        
    },
    // 添加投保人
    [types.ADD_INSURED](state: FeiHang.InsureParam, payload: Payload) {
        state.insureds.push(payload.content);
    },
    [types.REMOVE_INSURED_BY_INDEX](state: FeiHang.InsureParam, payload: Payload) {
        
        state.insureds.splice(payload.content, 1);
    },
    // 设置保险止期
    [types.SET_PAY_TYPE](state: FeiHang.InsureParam, payload: Payload) {
        state.payment.payType = payload.content;
    },
    // 设置保险止期
    [types.SET_INSURANCE_END_DATE](state: FeiHang.InsureParam, payload: Payload) {
        state.policy.insuredEndTime = payload.content;
    },
    //设置套餐
    [types.SET_PACKAGE](state: FeiHang.InsureParam, payload: Payload) {

        state.product.packageCode = payload.content.packageCode;
        state.product.productCode = payload.content.productCode;

        // state.policy.totalInsuredAmt = payload.content.totalInsuredAmt;
        // state.policy.actualPremiumAmt = payload.content.actualPremiumAmt;
        // state.policy.originalPremiumAmt = payload.content.originalPremiumAmt;


    },
    //清除产品信息
    [types.CLEAR_PRODUCT](state: FeiHang.InsureParam) {
        state.policy.insuredBgnTime = '';
        state.policy.insuredEndTime = '';
        // state.riskExt.cjmdd =''
        state.policy.originalPremiumAmt = 0
        state.riskExt.hbh = ''
        state.riskExt.hbqfsj = ''
        state.insureds = [];
        state.payment.payType = '1'
     
        state.holder.holderName = '';
        state.holder.bornDate = '';
        state.holder.idcartNo = '';
        state.holder.mail = '';
        state.holder.mobile = '';
        state.holder.sex = '';
    },
    [types.SET_IMEI](state: FeiHang.InsureParam, payload: Payload) {
        state.source.saleTerminalId = payload.content;
    }
    
};