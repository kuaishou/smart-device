import { Component, Vue } from 'vue-property-decorator';
import { getProduct } from '@/data/productConfig';
import { baseUrl, cdnUrl } from '@/common/config/env';
import LogCode from '@/lib/LogCore';
import { getHtm } from '@/api';

import { Sitstart ,Sitlog, Sitstop } from '@/common/SituRecorder';//录屏开始
const logCode = new LogCode('pages/detail')
Component.registerHooks(['beforeRouteLeave'])
@Component({
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (from && (from.path != '/identify')) { //初始化变量,管控不要开始录屏
        let stopData:any={}
        stopData.callback=function(){
          Sitstart()
        }
        Sitstop(0,stopData)
      }
    })
  },
  filters: {
    zdy(v: string) {
      if (/(年|月|天)$/.test(v)) {
        return v;
      } else {
        return v + '天';
      }
    }
  }
})
export default class Home extends Vue {
  product: ProductConfigOpt | null = {} as ProductConfigOpt;
  productCode: string = '';
  packageCode: string = '';
  productDetail: boolean = true;
  agreementData: any = {
    show: false,
    content: '',
    title: ''
  }
  goBuy() {
    this.$router.push({
      path: '/identify',
      query: {
        // code: v.code
      }
    })
  }
  beforeRouteLeave(to: any, from: any, next: any) {
    // logCode.debug('页面小孩')
    // this.$bus.$emit('logout');
    this.$dialog.hide();
    next()

  }
  readNotice(t: any, title: string) {
    logCode.debug(t, title)
    Sitlog(title,'CLICK_BUTTON')

    if (t == 'guide') {
      this.agreementData.title = title
      this.agreementData.content = `<img style="width: 100%;" src="${require('../../assets/img/guid.png')}"/>`
      this.agreementData.show = true
    } else {
      let pro: any = this.product ? this.product : {};
      getHtm(cdnUrl + pro[`${t}Url`]).then(htmlStr => {
        this.agreementData.title = title
        this.agreementData.content = htmlStr
        this.agreementData.show = true
      })
    }

  }
  created() {
    // logCode.debug(this.$route.query.code)
    this.productCode = this.$route.query.code
    this.packageCode = this.$route.query.packageCode
    this.product = getProduct(this.productCode)
  }
}
