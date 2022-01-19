/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-10 13:24:36
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import { terminalBatchCancelPolicy, terminalCancelPolicy } from '@/api';

import Alert from '@/common/vui/components/Alert/index.vue'
import UDate from '@/utils/UDate';
import { uuid, normalDate } from '@/utils';
import { ID_CARD_TYPE, CASH_PAYMENT } from '@/constant';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/cancelConfirm')
Component.registerHooks(['beforeRouteLeave'])
/**
 * 需要验证的年龄
 */
const VERIFY_AGE = 16;
@Component({
    components: {
        Alert
    }
})
export default class Page extends Vue {
    /**
     * 取消保单集合
     */
    @State cancelPolicy!: Array<any>
    /**
     * 推广员工号
     */
    @Getter promoteCode!: string;
    /**
     * 设置通过验证的信息
     */
    @Mutation SET_POLICY_VERIFY!: (v: Payload) => 0
    /**
     * 取消失败
     */
    // cancelFail: boolean = false;
    created() {
        logCode.debug('created', this.cancelPolicy)
    }
    get isCashPayment() {
        return this.cancelPolicy[0].payType == CASH_PAYMENT;
    }
    backCancel() {
        this.$router.back();
    }
    toAuthentication(v: any, verifyIndex: any) {
        if (v.verify) {
            return;
        }
        if (this.needVerify(v)) {
            this.$router.push({
                path: '/identify',
                query: {
                    verifyIndex
                }
            })
        } else {
            this.SET_POLICY_VERIFY({
                content: {
                    index: verifyIndex,
                    value: true
                }
            })
        }

    }
    needVerify(v: any) {
        logCode.debug('需要：', v);
        // return false
        if (v.idcartType == ID_CARD_TYPE) {
            let age = UDate.getAge(v.idcartNo, normalDate(v.insuredBgnTime).format());
            return age >= VERIFY_AGE;
        }
        return false;
    }
    allVerifyDone() {

        return !this.cancelPolicy.some(v => !v.verify);
    }
    async cancel() {

        if (!this.allVerifyDone() && this.isCashPayment) {
            this.$toast.show('请先验证客户身份证或确认已收回客户打印凭证');
            return;
        }
        // this.$loading.show();
        // let hasFail = false;
        // let failCount = 0;
        let code = '';
        let payType = this.cancelPolicy[0].payType;
        let policys = [];
        for (let i = 0; i < this.cancelPolicy.length; i++) {
            let v = this.cancelPolicy[i];
            // await this.cancelPolicy.forEach(async v => {
            policys.push({

                packageCode: v.packageCode,
                payType: v.payType,
                policyNo: v.policyNo,
                productCode: v.productCode

            })
            // logCode.debug('terminalCancelPolicy')
        }
        // terminalCancelPolicy({})
        let res = await terminalBatchCancelPolicy({
            channel: {
                accessPassword: "micro123",
                accessUser: "micro",
                channelCode: "feihang"
            },
            businessNo: uuid(),
            policys
        })

        this.$router.replace({
            path: '/cancelStatus',
            query: {
                errCode: res.errCode,
                payType: payType
            }
        })
        // }
        // this.$loading.hide();
    }
}