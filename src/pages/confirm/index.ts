/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-17 15:44:11
 * @LastEditTime: 2019-08-12 15:37:41
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue ,Watch } from 'vue-property-decorator';
import api, { confirmPolicy, apply, queryPolicyInfo, checkFeiHangBeforeUnderwrite, getHtm,quotePrice } from '@/api';

import { State, Mutation, Getter, Action } from 'vuex-class'
import { cdnUrl } from '@/common/config/env';

import { getCookie } from '@/common/utils/browser';
import Alert from '@/common/vui/components/Alert/index.vue'
import MInput from '@/common/vui/components/MInput/index.vue'
import AgreementList from '@/components/AgreementList/index.vue'
import { noNormalDate, normalDate, setStorage, getStorage, removeStorage, getConfig, getCustomerData } from '@/utils';
import UDate from '@/utils/UDate';
import { getProduct, switchHS } from '@/data/productConfig';

import Verify from '@/common/verify';
import Print from '@/model/Print';
import { getCertificates } from '@/data/certificatesConfig';
import { EVENT_PRINT, ID_CARD_TYPE, ONLINE_PAYMENT, CASH_PAYMENT, CASH_ONLINE_PAYMENT, NEED_CONFIRM_INSURANCE } from '@/constant';
//生成保单等待时间（毫秒）
const POLICY_WAIT_TIME: number = 10000;
import LogCode from '@/lib/LogCore';

import { Sitstop } from '@/common/SituRecorder';
const logCode = new LogCode('pages/confirm')
// warnCode特别说明
// 100000	-- 	该保险期间无有效保单，请直接购买
// 100001	--	该保险期间已有相同保单，不允许继续购买
// 100002	--	该保险期间已有相似保单，是否继续购买其他套餐

/**
 * 检查产品成功通过
 */
const checkProductSuccess = (data: any) => {
  let arr: any[] = data.checkFeiHangBeforeUnderwriteBOList;
  return arr.every(v => v.warnCode == '100000')
}
/**
 * 是否有限购
 * @param data 
 */
const hasLimitBuy = (data: any) => {
  return !data.checkFeiHangBeforeUnderwriteBOList;
}
/**
 * 获取购买类型相同的
 * @param data 
 */
const getBuySimilarProductTipText = (data: any) => {
  let arr: any[] = data.checkFeiHangBeforeUnderwriteBOList;
  return arr.filter(v => v.warnCode == '100002').map(v => `${v.insuredName}[${v.idcartNo}]`).join(',') + data.returnMsg;
}
//等待id
let POLICY_WAIT_ID: any = -1;
Component.registerHooks(['beforeRouteLeave'])

@Component({
  components: {
    Alert,
    MInput,
    AgreementList
  }
})
export default class Home extends Vue {
  @State insure!: FeiHang.InsureParam
  @State queryPolicyObject!: any


  @Action resetFlow!: () => 0;
  // @Mutation RESET_FLOW!: () => 0;
  @Mutation SET_INSURE!: (e: Payload) => 0;
  @Mutation SET_HOLDER!: (e: Payload) => 0;
  @Mutation SET_PREMIUM!: (e: Payload) => 0;
  @Mutation SET_INSURANCE_START_DATE!: (e: Payload) => 0;
  @Mutation SET_INSURANCE_END_DATE!: (e: Payload) => 0;
  @Mutation SET_PAY_TYPE!: (v: Payload) => 0;
  @Mutation REMOVE_INSURED_BY_INDEX!: (v: Payload) => 0;


  @Getter insuredBgnTime!: string
  @Getter insuredEndTime!: string
  @Getter boardingDate!: string
  @Getter productCode!: string


  certificatesConfig: any = getCertificates()
  product: ProductConfigOpt = {} as ProductConfigOpt;
  success: boolean = false;
  paySelectShow: boolean = false;
  isDelIndex: number = -1;
  printModel: any;
  policyAppNos: Array<string> = []
  switchHS: boolean = switchHS; //2020-09-15版本录屏开关
  agreements: any = {
    show: false,
    isChecked: false,
    isAllRead: false,
    list: [
      { key: 'notice', title: '投保须知', url: '', footer: true, show: false, content: '' },
      { key: 'clause', title: '保险条款', url: '', footer: true, show: false, content: '' },
      { key: 'guide', title: '理赔指南', url: '', footer: true, show: false, content: `<img style="width: 100%;" src="${require('../../assets/img/guid.png')}"/>` }
    ]    
  }
  isbaojia:boolean=false;//是否是报价产品
  yibao:number=1;//医保
  isgaozi:string = '0';//是否是投保告知页/0不是投保告知，1是投保告知页

  promoteInfo: any = '';
  created() {
    console.log('this.$data----------------', this.$data)
    POLICY_WAIT_ID = -1;
    logCode.debug(this.insure)
    this.promoteInfo = getConfig();
    let applyNo: string = this.$route.query.payApplyNo;
    if (this.promoteInfo && this.promoteInfo.tracBackFlag) {
      if (this.promoteInfo.tracBackFlag == 0) { // 是否可回溯开关 0关 1开
        this.switchHS = false;
        (window as any).SituRecorder = null;
      } else {
        this.switchHS = true;
      }
    }
    if (applyNo) {
      this.$loading.show();
      this.SET_INSURE({
        content: getStorage('insure')
      })
      this.product = getProduct(this.insure.product.productCode) as ProductConfigOpt;
      this.getAgreementList()
      POLICY_WAIT_ID = setTimeout(() => {
        POLICY_WAIT_ID = -1;
        this.$loading.hide();
        this.$router.push({
          path: '/error'
        })
      }, POLICY_WAIT_TIME);

      this.printModel = new Print(this.printOpt());

      this.policyAppNos = getStorage(applyNo);
      if (this.policyAppNos) {
        this.queryPolicyAppNos(this.policyAppNos)
      }
    } else {
      this.scrollToBottom();
      if (!this.productCode) {
        this.$router.push({
          path: '/'
        })
        return false;
      }
      this.product = getProduct(this.insure.product.productCode) as ProductConfigOpt;
      this.getAgreementList()
      this.setInsuredTime(UDate.now(this.product.dateMinDay || 0))
      this.quote();
      if(!this.needConfirmInsurance){
        this.next();
      }
    }
    if(['P133201'].indexOf(this.insure.product.productCode)>=0){
      this.isbaojia = true;
      this.isgaozi = '1';
      this.quotePrice(this.yibao)
    }  
  }
  getAgreementList() {
    const { noticeUrl, clauseUrl } = this.product
    this.agreements.list[0].url = `${cdnUrl}${noticeUrl}`
    this.agreements.list[1].url = `${cdnUrl}${clauseUrl}`
  }
  get needConfirmInsurance() {
    return (getConfig('confirmInsurance') == NEED_CONFIRM_INSURANCE);
  }
  onAgreementSubmit() { //全部协议都看完
    this.agreements.isAllRead = true
    this.agreements.show = false
    this.apply()
  }
  scrollToBottom() {

    let el: any = document.getElementById('app');
    if (el) {

      this.$nextTick(() => {
        window.scrollTo(0, el.offsetHeight);
      })

    }
  }
  printOpt(): PrintOpt {
    return {
      insureCompany: this.promoteInfo.insureCompany,
      airportCode: this.promoteInfo.airportCode,
      infos: [],
      code: this.product.code,
      isCash: this.insure.payment.payType == CASH_PAYMENT ? true : false,
      sName: this.product.sName,
      totalInsuredAmt: this.product.actualPremiumAmt,
      originalPremiumAmt: this.product.originalPremiumAmt,
      promoteCode: this.promoteInfo.promoteCode,
      promoteName: this.promoteInfo.promoteName
    };
  }
  queryPolicyAppNos(pANos: any) {
    pANos.forEach((v: any, i: number) => {
      this.queryPolicyAppNo(v, i);
    });
  }
  async queryPolicyAppNo(pANo: string, index: number) {
    let res = await queryPolicyInfo(Object.assign({}, this.queryPolicyObject, {
      policy: {
        policyAppNo: pANo
      }
    }));
    logCode.debug('queryPolicyAppNo')
    let policyNo = res.data.policy.policyNo;
    if (res.errCode == 0 && policyNo) {

      let v = this.insure.insureds[index] as InsuredParam;

      this.printModel.addInfo(this.insuredToPrintInfo(v, res.data.policy))

      if (this.printModel.infoSize() == this.policyAppNos.length) {
        clearTimeout(POLICY_WAIT_ID);
        this.$bus.$emit(EVENT_PRINT, [this.printModel]);

        removeStorage(this.$route.query.payApplyNo);
        this.$loading.hide();
        this.backHome();
      }

    } else {
      if (POLICY_WAIT_ID != -1) this.queryPolicyAppNo(pANo, index);
    }
  }
  insuredToPrintInfo(v: InsuredParam, p: any) {
    return {
      beneficiary: '法定',
      cardNo: v.idcartNo,
      cardType: this.certificatesConfig[v.idcartType],
      endTime: normalDate(this.insuredEndTime).format('yyyy-MM-dd hh:mm'),
      insured: v.insuredName,
      policyNo: p.policyNo,
      applyPolicyNo: p.policyAppNo,
      startTime: normalDate(this.insuredBgnTime).format('yyyy-MM-dd hh:mm'),
    }
  }
  quote() {
    let quantity = this.insure.insureds.length;
    this.SET_PREMIUM({
      content: {
        totalInsuredAmt: this.product.totalInsuredAmt * quantity,
        actualPremiumAmt: this.product.actualPremiumAmt * quantity,
        originalPremiumAmt: this.product.originalPremiumAmt * quantity
      }
    })
  }
  beforeRouteLeave(to: any, from: any, next: any) {
    this.$loading.hide();
    next()

  }
  backHome() {

    this.$router.push({
      path: '/'
    })
  }
  setInsuredTime(sDate: string) {
    this.insure.riskExt.hbqfsj = sDate
    let bgnTime = normalDate(sDate);

    if (UDate.diffDay(bgnTime, UDate.now(0)) == 0) {
      logCode.debug('选择今天')
      this.SET_INSURANCE_START_DATE({
        content: noNormalDate(UDate.addMinute(UDate.now(0, 'yyyy-MM-dd hh:mm'), this.product.delay || 15))
      })
    } else {
      logCode.debug('选择不是今天')
      this.SET_INSURANCE_START_DATE({
        content: noNormalDate(sDate)
      })
    }

    this.SET_INSURANCE_END_DATE({
      content: noNormalDate(UDate.minusSecond(UDate.addDay(this.insuredBgnTime, this.product.period, this.product.endDateFormat), this.product.endDateFormat ? 0 : 1))
    })
  }

  boarding() {
    let vm = this;
    this.$datetime.show({
      value: UDate.value(this.insuredBgnTime),
      startDate: UDate.now(0),
      endDate: UDate.now(79),
      onConfirm(val: any) {
        vm.setInsuredTime(val);
      }
    })
  }

  selectStartDate() {
    let vm = this;
    this.$datetime.show({
      value: UDate.value(this.insuredBgnTime),
      startDate: UDate.now(this.product.dateMinDay || 0),
      endDate: UDate.now(this.product.dateMaxDay || 90),
      onConfirm(val: any) {
        logCode.debug(val)
        vm.setInsuredTime(val);

      }
    })
  }
  del(index: number) {
    this.$alert.show({
      content: '是否确定删除？',
      width: '80%',
      confirm: () => {
        this.$alert.hide();
        this.REMOVE_INSURED_BY_INDEX({
          content: index
        })
        this.quote();
      },
      confirmText: '确定',
      cancelText: '取消',
      iconType: 'icon-tip',
      cancel: () => this.$alert.hide(),
    })
  }
  verify() {
    return new Verify()

      .test(this.insure.insureds.length)
      .gt(0)
      .errMsg('请选择被保人')
      .test(this.insure.holder.holderName)
      .required(['P060152'].indexOf(this.insure.product.productCode) > -1?'投保人没有满18周岁' : '投保人没有满16周岁')
      .test(this.insure.riskExt.hbh)
      .required('请输入航班号')
      .check(this.insure.product.productCode == 'P061702')
      .end((res: any) => {
        // logCode.debug('res', res)
        if (!res) {
          return false;
        }
        this.$toast.show(res[0]);
      })
  }
  errMsgDeal(err: string) {
    if (err) {
      let errMsgArr = err.split(/:|,/);
      err = errMsgArr[errMsgArr.length - 1];
    }

    this.$toast.show(err);
  }
  calcHolder() {
    for (let i = 0; i < this.insure.insureds.length; i++) {
      let v: InsuredParam = this.insure.insureds[i];
      let date;
      if (v.idcartType == ID_CARD_TYPE) {
        date = v.idcartNo;
      } else {
        date = v.bornDate
      }
      let age = UDate.getAge(date, normalDate(this.insuredBgnTime).format())
      if (age >= 16) {
        v.releation="0";//多个被保人被保人关系与投保人关系为本人
        this.SET_HOLDER({
          content: getCustomerData(v)
        })
        return true;
      };
    }
    return false;
  }
  async quotePrice(yDate:number) {//报价
    this.yibao=yDate;
    let qData = {
      productCode:this.insure.product.productCode,
      packageCode:this.insure.product.packageCode,
      discountKey: "",
      channelCode: 'feihang',
      priceFactor: [
          {
              itemFieldCode: "age",
              itemFieldValue: UDate.getAge(this.insure.insureds[0].bornDate, normalDate(this.insuredBgnTime).format()),
              itemType: "insured"
          },
          {
            itemFieldCode: "shebao",
            itemFieldValue: this.yibao,
            itemType: "insured_field"
        }
      ]
  }
    let res = await quotePrice(qData);
    this.$loading.hide();
    if (res.errCode != 0) {
      this.errMsgDeal(res.errMsg);
      return false;
    }
    this.product.price = (res.data.packageQuote[0].actualPremiumAmt/100);
    this.product.totalInsuredAmt = res.data.packageQuote[0].totalInsuredAmt;
    this.product.actualPremiumAmt= res.data.packageQuote[0].actualPremiumAmt;
    this.product.originalPremiumAmt = res.data.packageQuote[0].originalPremiumAmt;
    this.quote();
  }
  async onlinePayment() {
    this.SET_PAY_TYPE({
      content: 2
    })
    this.insure.policyExt.taskId= getCookie('taskId')||'';
    let res = await apply(this.insure);
    this.$loading.hide();
    if (res.errCode != 0) {
      this.errMsgDeal(res.errMsg);
      return false;
    }
    let applyNo: string = res.data.payApplyNo;
    setStorage('insure', this.insure);
    if(['P133201'].indexOf(this.insure.product.productCode)>=0){//单人投保
      setStorage(applyNo, [res.data.policyAppNo]);
    }else{
      setStorage(applyNo, res.data.policyAppNos);
    }  


    let orderInfo:any={
      success:1, // 是否购买成功，0=失败，1=成功
    //  extraInfo:this.insure, // 额外信息
    }
    Sitstop(0,orderInfo)//支付结束录制视频
    
    logCode.debug('返回数据:', res)
    this.$loading.show();
    this.$router.push({
      path: '/scanPay',
      query: {
        payApplyNo: applyNo,
        qrcoode: res.data.qrcodePaymentUrl,
        isgaozi:this.isgaozi
      }
    })
    return false;
  }
  async cashPayment() {
    this.SET_PAY_TYPE({
      content: 1
    })
    let res = await confirmPolicy(this.insure);
    this.$loading.hide();
    if (res.errCode != '0') {
      this.errMsgDeal(res.errMsg);
      return false;
    }
    let orderInfo:any={
      insuranceNo:'',// 保单号
      productName:this.product.name, // 产品名称
      productCode:this.insure.product.packageCode, // 产品编码
      account:this.insure.saleInfo.salesCode,  // 当前客户账号，可能是微信ID、手机号
      policyHolder:this.insure.holder.holderName,  // 投保人
      success:1, // 是否购买成功，0=失败，1=成功
    //  extraInfo:this.insure, // 额外信息
    }
    orderInfo.insuranceNo=res.data.results && res.data.results[0] && res.data.results[0].policyNo;
    Sitstop(1,orderInfo)//特殊支付结束录制视频
    
    this.backHome();
    this.printModel = new Print(this.printOpt());
    //添加打印信息
    this.insure.insureds.forEach((v: InsuredParam, i: number) => {

      this.printModel.addInfo(this.insuredToPrintInfo(v, res.data.results[i]))
    })
    //发送打印数据
    this.$bus.$emit(EVENT_PRINT, [this.printModel]);
  }

  async paySelect() {
   
    this.$loading.show();
    //重置流程
    if (this.insure.payment.payType == ONLINE_PAYMENT) { //见费
      this.onlinePayment();
    } else {
      this.cashPayment();
    }
    this.paySelectShow = false;
  }

  getCheckUnderwriteData() { //获取检查核保数据
    return {
      checkFeiHangBeforeUnderwriteVOList: this.insure.insureds.map(v => {
        return {
          insuredName: v.insuredName,
          idcartNo: v.idcartNo,
          idcartType: v.idcartType,
          packageCode: this.product.packageCode,
          packageCost: this.product.actualPremiumAmt,
          productCode: this.product.code,
          startTime: this.insuredBgnTime,
          endTime: this.insuredEndTime
        }
      })
    }
  }

  async next() {
    if (this.product.isCheckProduct) {
      let res = await checkFeiHangBeforeUnderwrite(this.getCheckUnderwriteData());

      if (res.errCode == 0) {
        if (hasLimitBuy(res.data)) {
          this.$toast.show(res.data.returnMsg);
        } else if (checkProductSuccess(res.data)) {
          this.apply();
        } else {
          this.$alert.show({
            width: '80%',
            confirmText: '确定',
            cancelText: '取消',
            confirm: () => { this.$alert.hide(); this.apply() },
            cancel: () => this.$alert.hide(),
            content: getBuySimilarProductTipText(res.data)
          })
        }
      }
    } else {
      this.apply();
    }

  }
  destroyed() {
    api.cancelAll();
  }
  apply() {

    this.calcHolder();
    if (this.verify()) {
      if (this.switchHS && !this.$route.query.payApplyNo) { //正常流程 && 协议开关开启, 需要强制阅读完协议信息, payApplyNo有值指从scanPay路由页面返回的证明之前看过了协议
        const _needConfirmInsurance = !this.$route.query.payApplyNo && !this.needConfirmInsurance //特殊情况,配置进来不需要勾选协议就可直接投保
        if (_needConfirmInsurance) {
          this.agreements.isChecked = true
        }
        if (!this.agreements.isChecked) {
          this.$toast.show('请勾选确认相关条款内容')
          return
        }
        if (!this.agreements.isAllRead) {
          this.agreements.show = true
          return
        }
      }
      this.resetFlow();
      let payType = getConfig('payType');
      if(['P133201'].indexOf(this.insure.product.productCode)>=0){//该产品只能见费线上支付
        payType = ONLINE_PAYMENT;
        this.insure.insureds[0].insuredExt={//有无医保标识
          shebao : this.yibao
        }
        this.insure.policyExt.sysCodeHealthTold='1'//投保告知二维码标识
      }  
      if (payType == CASH_ONLINE_PAYMENT) {
        this.paySelectShow = true;
        //见费
      } else if (payType == ONLINE_PAYMENT) {
        this.onlinePayment();
      } else if (payType == CASH_PAYMENT) {
        this.cashPayment();
      } else {
        this.$toast.show('支付方式配置错误');
      }
    }
  }
  toAdd() {
    this.$router.push({
      path: '/identify',
      query: { noDel: "true" }
    })
  }

  @Watch('insuredBgnTime')
  getInsuredBgnTime(newVal: string,oldVal:string) {
    if (newVal !== oldVal && this.isbaojia) {
      this.quotePrice(this.yibao)
    }
  }
}
