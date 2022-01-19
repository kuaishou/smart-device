/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-12 15:34:43
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue, Watch } from 'vue-property-decorator';

// import MScroll from '@/components/MScroll/Index.vue'
import api, { queryTerminalPolicyList, checkBatchCancelPolicy, terminalCancelPolicy } from '@/api';
import Verify from '@/common/verify';
import Print from '@/model/Print';
import { getProduct } from '@/data/productConfig';
import { getStorage, normalDate, noNormalDate, getConfig, uuid, loadImage } from '@/utils';
import { getCertificates } from '@/data/certificatesConfig';
import UDate from '@/utils/UDate';
import { Mutation, Getter } from 'vuex-class';
import { PAY_TYPE, CACHE_IMEI_KEY, CASH_PAYMENT, ONLINE_PAYMENT, CAN_NOT_CANCEL_POLICY } from '@/constant';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/policy');
//最大打印次数
const MAX_PRINT_COUNT = 1,
  //取消保单状态
  CANCEL_POLICY_STATUS: any = {
    "6": true,
    "7": true
  },
  //页面请求大小
  PAGE_SIZE = 10;


Component.registerHooks(['beforeRouteLeave'])
@Component({
  components: {
    // MScroll
  }
})
export default class Page extends Vue {
  list: Array<any> = [];
  certificatesConfig: any = getCertificates()
  q: string = '';
  insuredName: string = '';
  idcartNo: string = '';
  pageNum: number = 1
  total: number = 0
  hasMore: boolean = false;
  loadDone: boolean = false
  qFocus: boolean = false;
  createTime:string='';//后端定位一个账户多人登录添加参数
  createTimeFlag:boolean=true;
  promoteInfo: any = ''; 
  startDate: string = UDate.now(-30, 'yyyy-MM-dd 00:00:00'); // 查询开始时间
  endDate: string = UDate.now(0, 'yyyy-MM-dd 23:00:00'); // 查询结束时间
  @Mutation SET_CANCEL_POLICY!: (v: Payload) => {}

  created() {
    //选择checkbox背景预加载
    loadImage(require('../../assets/img/checkbox-1.png'))
    this.promoteInfo = getConfig();
    // if (['1', '2', '3'].indexOf(this.promoteInfo.airportCode) > -1) {
    //   this.canPrint = false;
    // }
    this.queryTerminalPolicyList(true, false);
    let clientHeight = document.documentElement && document.documentElement.clientHeight
    window.addEventListener('resize', () => {
      // let width = document.documentElement.clientWidth
      let height = document.documentElement && document.documentElement.clientHeight
      if (clientHeight != height) {
        this.qFocus = true;
      } else {
        this.qFocus = false;
      }

    })

  }
  // get canPrint() {
  //   //全部放开
  //   return true;
  //   // return ['1', '2', '3'].indexOf(this.promoteInfo.airportCode) == -1;
  // }
  noCanPrintMany() {
    return ['1', '2', '3'].indexOf(this.promoteInfo.airportCode) > -1;
  }
  @Watch('q')
  search() {

    if (this.verify()) {
      this.insuredName = this.q;
      this.idcartNo = '';
    } else {
      this.idcartNo = this.q;
      this.insuredName = '';
    }
    this.pageNum = 1;
    this.queryTerminalPolicyList(false, true);
  }
  verify() {
    return new Verify().test(this.q).isChinese().end();
  }
  toDetail(v: any) {
    let pro = getProduct(v.productCode);
    let policy = Object.assign({}, v, pro)
    this.$router.push({
      name: 'policyDetail',
      params: {
        policy
      }
    })
  }
  checke(v: any) {

    this.$set(v, 'checked', !v.checked);
  }
  get canCancel() {
    return !(getConfig('retreatPay') == CAN_NOT_CANCEL_POLICY);
  }
  get sDate() {
    return UDate.value(this.startDate, 'yyyy-MM-dd')
  }
  get eDate() {
    return UDate.value(this.endDate, 'yyyy-MM-dd')
  }
  async toCancel() {

    let retreatPay: string = getConfig('retreatPay'); //获取允许退保的支付方式
    // retreatPay = '2'
    let cancelArr: Array<string> = [];//要取消的投保名称
    let hasOnlinePay = false,//存在在线支付保单
      hasCashPay = false,//存在现金支付保单
      hasCancelPolicy = false,//存在已退保保单
      _cancelPolicy: Array<any> = [],//下个页面取消保单信息
      policys: Array<any> = [];//要退保的保单

    for (let i = 0; i < this.list.length; i++) {
      let v = this.list[i]
      if (v.checked) {

        cancelArr.push(v.holderName)
        //在线支付

        if (v.payType == ONLINE_PAYMENT) {
          hasOnlinePay = true;
          // 现金支付
        } else if (v.payType == CASH_PAYMENT) {
          hasCashPay = true;
        }
        //退保保单
        if (CANCEL_POLICY_STATUS[v.status]) {
          hasCancelPolicy = true;
        }
        _cancelPolicy.push(v);
        let cancelData = {
          // packageCode: v.packageCode,
          payType: v.payType,
          policyNo: v.policyNo,
          productCode: v.productCode
        };
        policys.push(cancelData);
      }
    }

    let s = new Set(cancelArr);
    if (s.size === 0) {
      this.$toast.show('请选择你要退的保单')
      return false;
    }
    // /
    if (hasCancelPolicy && cancelArr.length == 1) {
      this.$toast.show('该保单已退保');
      return false;
    }
    if (hasCancelPolicy) {
      this.$toast.show('存在已退保的保单，请检查')
      return false;
    }
    //存在现金退保保单，后台设置只能在线支付才能投保
    if (hasCashPay && retreatPay == ONLINE_PAYMENT) {
      this.$toast.show('该保单通过现金支付，暂不支持退保')
      return false;
    }
    if (hasOnlinePay && retreatPay == CASH_PAYMENT) {
      this.$toast.show('该保单通过在线支付，暂不支持退保')
      return false;
    }
    if (s.size !== 1) {
      this.$toast.show('您选择的不是一起投保的保单，不可同时退保')
      return false;
    }

    let res: ResponseObject = await checkBatchCancelPolicy({
      channel: {
        accessPassword: "micro123",
        accessUser: "micro",
        channelCode: "feihang"
      },
      businessNo: uuid(),
      policys
    })

    if (res.errCode == 0) {
      this.SET_CANCEL_POLICY({
        content: _cancelPolicy
      })
      this.$router.push({
        path: '/cancelConfirm'
      })
    }

  }
  toPrint() {

    let printObj: any = {},
      noPrintPolicy = [],
      payType = '',
      policyBatch = new Set();

    for (let i = 0; i < this.list.length; i++) {
      let v = this.list[i];
      if (v.checked) {

        if ((v.printCount) >= MAX_PRINT_COUNT && this.noCanPrintMany()) {

          noPrintPolicy.push(v.insuredName)

        }
        policyBatch.add(v.policyBatchNo || +new Date());
        // v.policyBatchNo = 

        // printFlag = true;
        if (!printObj[v.productCode]) {
          printObj[v.productCode] = [];
        }
        payType = v.payType;
        printObj[v.productCode].push({

          beneficiary: '法定',
          cardNo: v.idcartNo,
          cardType: this.certificatesConfig[v.idcartType],
          endTime: normalDate(v.insuredEndTime).format('yyyy-MM-dd hh:mm'),
          insured: v.insuredName,
          policyNo: v.policyNo,
          applyPolicyNo: v.policyAppNo,
          startTime: normalDate(v.insuredBgnTime).format('yyyy-MM-dd hh:mm'),
        });
      }
    }

    if (policyBatch.size < 1) {
      this.$toast.show('请选择打印单');
      return false;
    }
    if (policyBatch.size > 1) {
      this.$toast.show('您选择的不是一起投保的被保人，不可一起打印');
      return false;
    }
    if (noPrintPolicy.length > 0) {
      // this.$toast.show('请选择打印单');

      this.$alert.show({
        content:`被保人${noPrintPolicy.join('、')}已打印过凭证，不可再次打印`,
        iconType:'icon-tip',
        width:'80%',
        cancelText:'确定',
        cancel:()=>this.$alert.hide()
      })
      return false;
    }
    let printModel = [];
    for (let item in printObj) {

      let p = new Print(this.printOpt(item, payType));
      printObj[item].forEach((v: any) => {

        p.addInfo(v)

      });

      printModel.push(p);
    }

    this.$bus.$emit('print', printModel);
    //增加打印次数
    this.addPrintCount();

  }
  addPrintCount() {
    this.list.forEach(v => {
      if (v.checked) {
        this.$set(v, 'printCount', v.printCount + 1);
      }
    })
  }
  getProductName(v: any) {
    let pro = getProduct(v.productCode);
    return (pro ? pro.sName : v.productName) + `-${PAY_TYPE[v.payType]}`;
  }
  printOpt(code: string, payType: string): PrintOpt {

    let pro = getProduct(code) as ProductConfigOpt;

    return {
      insureCompany: this.promoteInfo.insureCompany,
      airportCode: this.promoteInfo.airportCode,
      infos: [],
      code: pro.code,
      sName: pro.sName,
      isCash: payType === CASH_PAYMENT ? true : false,
      totalInsuredAmt: pro.actualPremiumAmt,
      originalPremiumAmt: pro.originalPremiumAmt,
      promoteCode: this.promoteInfo.promoteCode,
      promoteName: this.promoteInfo.promoteName
    };
  }
  destroyed(){
    api.cancel('queryTerminalPolicyList')
  }
  async queryTerminalPolicyList(loading: boolean, bSearch: boolean) {

    if (loading) {
      this.$loading.show();
    }

    let res: any = await queryTerminalPolicyList({
      appBeginDate:normalDate(this.startDate).format('yyyy-MM-dd ')+'00:00:00',//查询时间范围（开始日期）(不传值默认往前推三个月),
      appEndDate:normalDate(this.endDate).format('yyyy-MM-dd ')+'23:59:59',//查询时间范围（结束日期）(不传值默认为当前时间),  
      createTime:this.createTime,//后端定位一个账户多人登录添加参数
      pageNum: this.pageNum,
      pageSize: PAGE_SIZE,
      insuredName: this.insuredName,
      idcartNo: this.idcartNo,
      promoteCode: this.promoteInfo.promoteCode,
      imei: getStorage(CACHE_IMEI_KEY)
    }, {
        loading: bSearch ? false : true
      })

    if (res) {
      if (res.errCode == 0) {


        this.total = res.data.total;
        if(res.data.list.length >= 1 && this.createTimeFlag){
          this.createTime=res.data.list[0].createTime;
          this.createTimeFlag=false;
        }
        
        if (this.list.length == 0 || bSearch) {

          this.list = res.data.list;

        } else {
          this.list = this.list.concat(res.data.list);
        }
        if (this.list.length == 0 || this.pageNum * PAGE_SIZE >= this.total) {
          this.hasMore = false;
        } else {
          this.hasMore = true;
        }
        this.loadDone = true;
      } else {
        this.$toast.show(res.errMsg);
      }
    }
    this.$loading.hide();
  }
  loadMore() {

    if (!this.hasMore) {
      logCode.debug('没有更多数据');
      return false;
    }
    this.pageNum++;
    this.queryTerminalPolicyList(true, false)

  }


  toolbarRightClick() {
    this.$router.push({
      path: '/statistics'
    })
  }
  toolbarLeftClick() {
    this.$router.push({
      path: '/product'
    })
  }

  selectStartDate() {  // 时间选择开始
    let vm = this;
    this.$datetime.show({
      format: 'YYYY-MM-DD',
      value: UDate.value(this.startDate, 'yyyy-MM-dd'),
      startDate: UDate.now(-365),
      endDate: UDate.now(0),
      onConfirm(val: any) {
        vm.startDate = `${val} 00:00:00`;
        vm.endDate = UDate.addDay(new Date(vm.startDate), 30, 'yyyy-MM-dd 00:00:00');
        // vm.endDate = UDate.now(0, 'yyyy-MM-dd 00:00:00');
        logCode.debug(vm.startDate)
      }
    })
  }

  selectEndDate() {  // 时间选择结束
    let vm = this;
    this.$datetime.show({
      format: 'YYYY-MM-DD',
      value: UDate.value(this.endDate, 'yyyy-MM-dd'),
      startDate: this.startDate,
      endDate: UDate.now(0),
      onConfirm(val: any) {
        vm.endDate = `${val} 23:59:59`;
      }
    })
  }
}
