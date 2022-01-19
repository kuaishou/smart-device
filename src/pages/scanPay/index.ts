/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-13 22:27:33
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue, Watch } from 'vue-property-decorator';
import api, { queryPayStatus, payQRCode } from '@/api';
import { State} from 'vuex-class'
import { $location, getUrlValue } from '@/common/utils/browser';
import { baseUrl } from '@/common/config/env';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/scanPay')
// 请求id
let REQUEST_TIMEOUT_ID: any = null,
    //毫秒
    REQUEST_INTERVAL = 1000,
    // 停止查询支付状态
    STOP_QUERY_PAY_STATUS = false,
    // 最长等待时间(秒)
    WAIT_TIME: number = 60,
    // 等待id
    WAIT_ID: any = -1,
    // 支付完成状态
    PAY_DONE_STATUS = '1',
    //处理成功状态
    STATUS_OK = '0000';

@Component({
    components: {
        // MScroll
    }
})
export default class Page extends Vue {
    @State insure!: FeiHang.InsureParam
    /**
     * 支付宝二维码地址
     */
    alipayCodeUrl: string = '';
    /**
     * 微信二维码地址
     */
    weixinCodeUrl: string = '';
    loading: boolean = true
    /**
     * 支付申请号
     */
    payApplyNo: string = '';
    /**
     * 投保告知二维码标识
     */
    isgaozi:string=''
    // sId: any = -1;
    // isDestroyed: boolean = false
    created() {
        console.log(this.insure)
        STOP_QUERY_PAY_STATUS = false;
        this.weixinCodeUrl = this.$route.query.qrcoode;
        this.payApplyNo = this.$route.query.payApplyNo;
        this.isgaozi = this.$route.query.isgaozi;
        if(this.isgaozi=='1'){
            REQUEST_INTERVAL=5000;
            WAIT_TIME=120
        }
        this.queryPayStatus();
        // this.queryAliPayCodeImg();
        // this.queryWeiXinCodeImg();
        this.createWait();
    }
    get aliPayCodeImg() {
        let { data } = getUrlValue(this.$route.query.qrcoode)
        return `${baseUrl}/payment/payOnline/scaleQrcode?data=${data.split('/')[1]}`;
    }
    // async queryWeiXinCodeImg(){
    //     let res = await payQRCode({
    //         applyNo: this.payApplyNo,
    //         terminalCode: 'weixinsm'
    //     })
    //     this.weixinCodeUrl = `/payment/payOnline/scaleQrcode?data=${res.data}`
    //     this.loading = false;
    // }
    // async  queryAliPayCodeImg() {

    //     let res = await payQRCode({
    //         applyNo: this.payApplyNo,
    //         terminalCode: 'alipaysm'
    //     })
      
    //     // if(res.data){
    //     let { data } = getUrlValue(this.$route.query.qrcoode)
    //     // let 
    //     // logCode.debug('sss=',getUrlValue(this.$route.query.qrcoode))
    //     // this.alipayCodeUrl = `/payment/payOnline/scaleQrcode?data=` + data.split('/')[1] + '&'
    //     this.alipayCodeUrl = `/payment/payOnline/scaleQrcode?data=${res.data}`
        
    //     // }else{
    //     //     this.$toast.show(res.errorMsg)
    //     // }


    // }
    aliPayLoad(){
        this.loading = false;
    }
    createWait() {
        WAIT_ID = setTimeout(() => {
            clearTimeout(REQUEST_TIMEOUT_ID);
            STOP_QUERY_PAY_STATUS = true;
            // this.$toast.show('时间到');
            this.toError();
        }, WAIT_TIME * 1000)
    }
    destroyed() {
        api.cancel('paystatus')
    }
    beforeDestroy() {
        logCode.debug('页面销毁');
        STOP_QUERY_PAY_STATUS = true;
        clearTimeout(REQUEST_TIMEOUT_ID);
        clearTimeout(WAIT_ID);
    }
    toError() {
        this.$router.push({
            path: '/error',
            query: {
                code: '002'
            }
        })
    }
    queryPayStatus() {

        if (!this.payApplyNo || STOP_QUERY_PAY_STATUS) {
            return false;
        }
        REQUEST_TIMEOUT_ID = setTimeout(async () => {
            // setInterval(async () => {
            let res: any = await queryPayStatus(this.payApplyNo)
                .catch(v => {
                    this.queryPayStatus();
                });
            if (res.returnCode == STATUS_OK && res.businessDto.status == PAY_DONE_STATUS) {
                logCode.debug('支付完成');
                // if(res.businessDto.backUrl){
                this.$router.push({
                    path: '/confirm',
                    query: {
                        payApplyNo: this.payApplyNo
                    }
                })
                // $location(res.businessDto.backUrl)
                // }
            } else {
                this.queryPayStatus();
            }

        }, REQUEST_INTERVAL)
        // }, 1000)

    }
}