/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-12 15:34:23
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue } from 'vue-property-decorator';
import api, { queryTerminalPolicyStat } from '@/api';
import UDate from '@/utils/UDate';
import { getStorage, normalDate, noNormalDate, getConfig, formatPremium, toNumber } from '@/utils';
import { Getter, State } from 'vuex-class';
import { getProduct } from '@/data/productConfig';
import { EVENT_PRINT_BILL } from '@/constant';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/statistics');
Component.registerHooks(['beforeRouteLeave'])

@Component({
  components: {
    // HelloWorld
  }
})
export default class Page extends Vue {
  list: Array<any> = [];
  /**
   * 查询开始时间
   */
  startDate: string = UDate.now(0, 'yyyy-MM-dd hh:00:00');
  /**
   * 查询结束时间
   */
  endDate: string = UDate.now(0, 'yyyy-MM-dd hh:59:59');
  promoteInfo: any = {};
  /**
   * 现金实收（元）
   */
  totalCash: number = 0;
  /**
   * 线上实收（元）
   */
  totalElc: number = 0;;
  /**
   * 合计实收（元）
   */
  total: number = 0;
  /**
   * 现金实收（件）
   */
  totalCashCount: number = 0;
  /**
   * 线上实收（件）
   */
  totalElcCount: number = 0;
  /**
   * 合计实收（件）
   */
  totalCount: number = 0;


  created() {
    this.promoteInfo = getConfig();

    this.queryTerminalPolicyStat();

  }
  get sDate() {
    return UDate.value(this.startDate, 'yyyy-MM-dd hh时')
  }
  get eDate() {
    return UDate.value(this.endDate, 'yyyy-MM-dd hh时')
  }
  getProductPrice(code: string) {
    let product = getProduct(code);
    return product && product.price;
  }
  selectStartDate() {
    let vm = this;

    this.$datetime.show({
      // cancelText: '取消',
      // confirmText: '确定',
      format: 'YYYY-MM-DD HH',
      value: UDate.value(this.startDate, 'yyyy-MM-dd hh'),
      // value: this.startDate,
      startDate: UDate.now(-365),
      endDate: UDate.now(0),
      onConfirm(val: any) {

        vm.startDate = `${val}:00:00`;
        // vm.startDate = val;
        logCode.debug(vm.startDate)
      }
    })
  }
  selectEndDate() {
    let vm = this;
    // alert(this.startDate)
    this.$datetime.show({
      // cancelText: '取消',
      // confirmText: '确定',
      format: 'YYYY-MM-DD HH',
      value: UDate.value(this.endDate, 'yyyy-MM-dd hh'),
      // value: this.endDate,
      startDate: UDate.now(-365),
      endDate: UDate.now(0),
      onConfirm(val: any) {

        vm.endDate = `${val}:59:59`;

      }
    })
  }
  toPrint() {

    this.$bus.$emit(EVENT_PRINT_BILL, {
      totalCash: this.totalCash,
      totalElc: this.totalElc,
      total: this.total,
      totalCashCount: this.totalCashCount,
      totalElcCount: this.totalElcCount,
      totalCount: this.totalCount,
      promoterNo: this.promoteInfo.promoteCode,
      promoter: this.promoteInfo.promoteName,
      beginTime: this.startDate,
      endTime: this.endDate,
      products: this.list
    });
  }
  destroyed(){
    api.cancel('queryTerminalPolicyStat')
  }
  async queryTerminalPolicyStat() {

    // this.$loading.show();
    let res: any = await queryTerminalPolicyStat(
      {
        appBeginDate: noNormalDate(this.startDate, 'yyyyMMddhh0000'),
        appEndDate: noNormalDate(this.endDate, 'yyyyMMddhh5959'),
        promoteCode: this.promoteInfo.promoteCode,
        saleTerminal: '0003'
      }
    );
    let totalCash = 0,
      totalElc = 0,
      total = 0,
      totalCashCount = 0,
      totalElcCount = 0,
      totalCount = 0;

    this.list = res.data.map((v: any) => {
      let product = getProduct(v.productCode);
      v.productName = product ? product.sName : v.productName;

      totalCash += toNumber(v.actualPremiumAmt1);
      totalElc += toNumber(v.actualPremiumAmt2);
      total += toNumber(v.actualPremiumAmt);

      totalCashCount += toNumber(v.actualCount1);
      totalElcCount += toNumber(v.actualCount2);
      totalCount += toNumber(v.actualCount);

      return v;
    });

      this.totalCash = formatPremium(totalCash, 2);
      this.totalElc = formatPremium(totalElc, 2);
      this.total = formatPremium(total, 2);
      this.totalCashCount = formatPremium(totalCashCount);
      this.totalElcCount = formatPremium(totalElcCount);
      this.totalCount = formatPremium(totalCount);

    // if (this.list.length > 0) {

    //   this.totalCash = formatPremium(totalCash, 2)
    //   this.totalElc = formatPremium(totalElc, 2)
    //   this.total = formatPremium(total, 2)
    //   this.totalCashCount = formatPremium(totalCashCount)
    //   this.totalElcCount = formatPremium(totalElcCount)
    //   this.totalCount = formatPremium(totalCount)
    // }

    // this.cashPremiumAmt = cashPremiumAmt;
    // this.onLinePremiumAmt = onLinePremiumAmt;
    // this.totalPremiumAmt = totalPremiumAmt;
    // this.list = res.data;
    // logCode.debug(this.list)
    // if (res&&res.errCode==0) {
    //   let o: any = {};

    //   res.data.forEach((v: any) => {
    //     // o[v.CREATETIME] || o[v.CREATETIME] =[];
    //     if (!o[v.CREATETIME]) {
    //       o[v.CREATETIME] = {
    //         title: UDate.value(v.CREATETIME, 'yyyy年MM月'),
    //         list: []
    //       };
    //     }
    //     o[v.CREATETIME].list.push({
    //       ORDERS: v.ORDERS,
    //       PRODUCTCODE: v.PRODUCTCODE,
    //       PRODUCTNAME: v.PRODUCTNAME,
    //       SUMPRM: v.SUMPRM
    //     })

    //   });

    //   this.list = o;
    // }
    // this.$loading.hide();
  }

}
