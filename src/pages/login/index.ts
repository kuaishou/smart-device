/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-10 10:34:05
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue } from 'vue-property-decorator';

import { getPromoteInfo } from '@/data/promoteConfig';
import Verify from '@/common/verify';
import { Mutation, Action, State } from 'vuex-class';
import { getProducts } from '@/data/productConfig';
import { loadImage, getStorage, setStorage, setConfig, getConfig } from '@/utils';
const md5 = require('md5')
import api, { terminalManage } from '@/api';
import { EVENT_LOGIN_POS } from '@/constant';
import texts from '@/config/texts';
import { CACHE_IMEI_KEY } from '@/constant';
import LogCode from '@/lib/LogCore';
import { baseUrl } from '@/common/config/env';
const logCode = new LogCode('pages/login')
@Component({
  components: {
  }
})
export default class Page extends Vue {
  @State pullVersion!: boolean
  visible: boolean = false
  promoteCode: string = '';
  promotePassword: string = '';
  promoteName: string = '';
  @Action setInsureCompany!: (v: Payload) => 0;
  @Action setSalesCode!: (v: Payload) => 0;

  @Action setPayType!: (v: Payload) => 0;

  @Mutation SET_PROMOTE_INFO!: (v: Payload) => 0;
  @Mutation SET_NAME!: (v: Payload) => 0;
  created() {
    logCode.debug(this.$route)
    logCode.debug('更新=', this.pullVersion)
    if (this.pullVersion) {
      location.reload(true);
    } else {
      this.fillInfo();
      this.preloading();
    }

  }
  get showLogin() {
    return !this.pullVersion;
  }
  preloading() {
    setTimeout(() => {
      let products = getProducts()
      products.forEach((v: any) => {
        loadImage(v.hot);
        // logCode.debug('loadImage')
      });
      // for (let i in products) {
      //   loadImage(products[i].hot);
      // }
    }, 0);

  }
  verify() {
    // return true;
    return new Verify()
      .test(this.promoteCode)
      .required('请输入员工编号')
      .test(this.promotePassword)
      .required('请输入员工密码')
      .end((res: any) => {
        if (!res) {
          return false;
        }
        this.$toast.show(res[0]);
      });

  }

  mounted() {

  }
  fillInfo(): boolean {
    let promote = getConfig();
    if (promote) {
      // logCode.debug('promote=', promote)
      // this.SET_NAME({
      //   content: promote.promoteName
      // });
      // this.SET_PROMOTE_INFO({
      //   content: {
      //     promoteCode: promote.promoteCode,
      //     promoteName: promote.promoteName,
      //     sale-sCode: promote.salesCode,
      //     cooperateCode: promote.cooperateCode,
      //     airport: promote.airportName
      //   }
      // })
      this.$router.push({
        path: '/product',
        query: {
          backExit: 'true'
        }
      })
      return true;
    }
    return false;
  }
  async goNext() {
    // const hash = crypto.createHash('md5');
    // hash.update(this.promotePassword);
    let passWord = md5(this.promotePassword).toLocaleUpperCase();
    // logCode.debug(hash.digest('hex'));
    if (this.verify()) {
      // this.$loading.show();
      let res = await terminalManage({
        // newPassWord: '',
        version: '2019-01-16',
        imei: getStorage(CACHE_IMEI_KEY),
        passWord,
        userCode: this.promoteCode
      })
      // .catch(res => {

      //   this.$toast.show(res.errMsg || texts.error);
      // })
      // this.$loading.hide();
      if (res.errCode == 0) {
        //设置配置
        setConfig(res.data)
         //发送机场代码
          this.$bus.$emit(EVENT_LOGIN_POS, {"airport":res.data.airportCode});
        if (['2'].indexOf(res.data.airportCode) > -1) {
          api.changeApiUrl(baseUrl)
        }
        this.$router.push({
          path: '/product',
          query: {
            backExit: 'true'
          }
        })
        // this.$router.push({
        //   path: '/product'
        // })
      } else {
        this.$toast.show(res.errMsg || texts.fail);
      }

      return false;
    }

  }
}
