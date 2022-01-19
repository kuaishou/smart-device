import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation, Action } from 'vuex-class';
import { hasInsured, getConfig } from '@/utils';
import { Sitstart,Sitstop } from '@/common/SituRecorder';
import Alert from '@/common/vui/components/Alert/index.vue'

import { READ_CARD_DONE, INIT_LISTEN, READ_CARD_FAIL, NFC_LOGOUT, READ_CARD_START, ID_CARD_TYPE, OTHER_RELATION, READ_CARD_FAIL_CN } from '@/constant';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/identify')
function replaceDate(str: string) {
  return str && str.replace(/\./g, '-').replace(/[年|月]/g, '-').replace(/日/g, '')
}
let READ_FAIL_TEXT = `设备检测不到您的身份证，请<br>重新识别并将身份证紧贴顶部`,
  READ_FAIL_CH_TEXT = `身份证读取不成功，请手动<br>录入信息`;
//读卡定时器id
let READ_CARD_ID: any = -1;

//临时给下面三个机场添加刷身份证页面定时返回上一页；防止APP调用NFC耗电
let time: number;
let TIME_OUT_BACK: any;//设置定时
@Component({
  components: {
    Alert
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (from && (from.path != '/detail' && from.path != '/entry' && from.path != '/confirm')) { //初始化变量,管控不要开始录屏，这三个页面跳转过来重新开始录屏
        let stopData:any={}
        stopData.callback=function(){
          Sitstart()
        }
        Sitstop(0,stopData)
      }
    })
  }
})
export default class Page extends Vue {
  @State('insure') insure!: FeiHang.InsureParam
  @State cancelPolicy!: Array<any>
  // @Mutation ADD_INSURED!: (v: Payload) => 0
  @Action addInsured!: (v: Payload) => 0
  @Mutation SET_POLICY_VERIFY!: (v: Payload) => 0
  // progressId: any = -1;
  fail: boolean = false;
  failText: string = ''
  showProgress: boolean = false;
  progress: number = 0;
  progressDom: any = null;
  vailFail: boolean = false;

  mounted() {
    this.progressDom = this.$refs['progress'] as HTMLElement;
    this.timeoutBack()//启动定时
    this.$bus.$on(READ_CARD_START, (data: any) => {
      // logCode.debug('读卡')
      clearInterval(TIME_OUT_BACK);

      this.resetProgress();
      this.showProgress = true;
      // logCode.debug('进度条=', this.$refs)
      // logCode.debug('进度条=', this.progressDom)
      this.cardProgress(true);

    })


    // setTimeout(this.verification, 2000);
    // this.resetProgress();
    // this.showProgress = true;
    // this.cardProgress(true);
  }
  get isAuthentication() {
    // logCode.debug('this.$route.query.verifyIndex', this.$route.query.verifyIndex, this.cancelPolicy)
    return this.$route.query.verifyIndex === undefined ? false : true;
  }
  back() {
    this.$router.back();
  }
  cardProgress(random: boolean) {
    // logCode.debug('读卡')
    //30 50 
    this.$toast.hide();//隐藏弹框提示
    READ_CARD_ID = setTimeout(() => {
      // logCode.debug('进度条....')
      let num = 0;
      if (random) {
        num = +(Math.random() * 20).toFixed(0);
        if (this.progress + num >= 90) {
          num = 90 - this.progress;
        }
      } else {
        num = 1;
      }

      this.progressDom.style.width = this.progress + '%'
      this.progress = (this.progress + num);
      if (this.progress >= 90) {
        if (this.progress >= 99) {
          clearInterval(READ_CARD_ID);
        } else {
          this.cardProgress(false);
        }
      } else {
        // 1000/90
        this.cardProgress(true);
      }

    }, random ? 1 : 1000)

  }
  resetProgress() {
    this.showProgress = false;
    this.progress = 0;
  }
  resetNFC(force?: boolean) {
    if (this.fail || force) {
      clearInterval(TIME_OUT_BACK);
      this.timeoutBack()//启动定时
      logCode.debug('重新读卡');
      this.resetProgress();
      this.fail = false;
      this.$bus.$emit(INIT_LISTEN)
    }

  }
  verification(data: ReadIDCardOpt) {
    let { verifyIndex } = this.$route.query;
    logCode.debug('验证通过')
    if (data.cardNo != this.cancelPolicy[+verifyIndex].idcartNo) {
      //该身份证信息与客户信息不符，请核对身份证后重试
      this.vailFail = true;
      return false;
    }
    this.SET_POLICY_VERIFY({
      content: {
        index: verifyIndex,
        value: true
      }
    })
    this.$router.back();
  }
  toAddInsured(data: ReadIDCardOpt) {

    if (hasInsured(data.cardNo, this.insure.insureds)) {
      this.$toast.show('该被保人已存在');
      setTimeout(() => {
        this.resetNFC(true);
      }, 2000)

      return false;
    }
    this.addInsured({
      content: {
        bornDate: '',
        residentialAddr: data.address,
        authority: data.police,
        identifyExpiry: replaceDate(data.endTime),
        idcartNo: data.cardNo,
        idcartType: ID_CARD_TYPE,
        insuredName: data.name,
        mobile: "",
        releation: OTHER_RELATION,
        sex: ''
      }
    })
    this.$router.push({
      path: '/confirm'
    })
  }
  timeoutBack() {
    let airportCode: string = getConfig('airportCode');//获取机场编码
    let isAirporCode: boolean = ['6', '7', '14'].indexOf(airportCode) > -1;
    //航旅项目APP识别超时优化;app停留在该页面会调用NFC读卡模式导致耗电严重；现设置60秒现在；该页面停留超过60秒，页面跳转到主页
    if (isAirporCode) {
      //this.$toast.show("定时开始");
      time = 60;
      TIME_OUT_BACK = setInterval(() => {
        if (time == 5) {
          this.$toast.show("因您长时间未操作，系统为了节省电量，将在5秒后自动返回上一页");
          time--;
        } else if (time <= 0) {
          clearInterval(TIME_OUT_BACK);
          this.$router.back();
        } else {
          time--
        };

      }, 1000);
    }

  }
  created() {
    
    
    this.$bus.$emit(INIT_LISTEN)
    this.$bus.$on(READ_CARD_FAIL, () => {
      clearInterval(READ_CARD_ID);
      this.fail = true;
      this.failText = READ_FAIL_TEXT;
      this.resetProgress();
    })
    this.$bus.$on(READ_CARD_FAIL_CN, () => {
      clearInterval(READ_CARD_ID);
      this.fail = true;
      this.failText = READ_FAIL_CH_TEXT;
      this.resetProgress();
    })
    this.$bus.$on(READ_CARD_DONE, (data: any) => {
      // logCode.debug('读卡完成')
      this.showProgress = false;
      if (this.isAuthentication) {
        this.verification(data);
      } else {
        this.toAddInsured(data);
      }


    })
  }

  beforeDestroy() {

    this.$bus.$emit(NFC_LOGOUT);
    this.$bus.$off(READ_CARD_DONE)
    this.$bus.$off(READ_CARD_FAIL_CN)
    clearInterval(TIME_OUT_BACK);

  }
  goEntry() {
    this.$router.push({
      path: '/entry'
    })
  }
}
