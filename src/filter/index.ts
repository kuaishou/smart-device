import Vue from "vue";
import UDate from '@/utils/UDate';
import { PAY_TYPE } from '@/constant';

Vue.filter('policyStatus', (v: any) => {
    if (v.status == '7' || v.status == '6') {
        return '已退保';
    }
    // v.insuredEndTime = "2018-09-19 19:35:00"
    let now: string = UDate.now(0, 'yyyy-MM-dd hh:mm:ss')
    if (UDate.diff(now, v.insuredBgnTime) > 0) {
        return '未生效';
    }
    if (UDate.diff(v.insuredEndTime, now) > 0) {
        return '已失效';
    }
    // return UDate.diff(UDate.now(0), v.insuredEndTime) > 0 ? '生效中' : '已失效';
    return '生效中';
    // }
})
Vue.filter('payType', (v: any) => {
    return PAY_TYPE[v]
})