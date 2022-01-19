import { Component, Vue } from 'vue-property-decorator';
import { getProducts, switchHS } from '@/data/productConfig';
import { Mutation, State, Action, Getter } from 'vuex-class';
import Alert from '@/common/vui/components/Alert/index.vue'
import MyDialog from '@/components/MyDialog/index.vue'
import { getConfig, clearConfig } from '@/utils';
import LogCode from '@/lib/LogCore';
import { isProduction } from '@/common/config/env';
const logCode = new LogCode('pages/product')
Component.registerHooks(['beforeRouteLeave'])

@Component({
  components: {
    Alert,
    MyDialog
  }
})
export default class Page extends Vue {
  products: Array<ProductConfigOpt> = [];
  switchHS = switchHS
  showDialog: Boolean = false;
  @State insure!: FeiHang.InsureParam
  @State name!: string
  /**
   * 版本
   */
  @State version!: string
  /**
   * 标题
   */
  @State title!: string
  /**
   * 推广员名称
   */
  @Getter promoteName!: string
  @Action setProduct!: (v: Payload) => 0;
  /**
   * 设置标题
   */
  @Mutation SET_TITLE!: (v: Payload) => 0;
  /**
   * 设置是否更新版本
   */
  @Mutation SET_PULL_VERSION!: (v: Payload) => 0;
  /**
   * 清除产品信息
   */
  @Mutation CLEAR_PRODUCT!: () => void;
  /**
   * 显示设置
   */
  showAccountSettings: boolean = false;
  isDev: boolean = !isProduction
  /**
   * 设置名称
   */
  @Mutation SET_NAME!: (v: Payload) => 0;
  /**
   * 设置推广员信息
   */
  @Mutation SET_PROMOTE_INFO!: (v: Payload) => 0;
  goBuy(v: any) {
    this._setPackage(v)
    this.$router.push({
      path: '/identify',
      query: {
        code: v.code,
        packageCode: v.packageCode
      }
    })
  }
  get shelvesProduct() {
    let pro = getConfig('putawayProduct');
    if (!pro) {
      this.$toast.show('后台管理上架产品配置错误，请重新登陆')
      return [];
    }
    try {
      //根据产品配置的先后顺序显示产品达到产品显示顺序可配置
      let productsCode: any[] = pro.split(',');//业务配置的产品ID
      let ProductsList: any = this.products;//所有产品配置
      let showProducts: any[] = [];//获取要显示产品的配置
      let product: any;
      productsCode.forEach(function (vs: any) {
        product = ProductsList.filter((v: ProductConfigOpt) => vs == v.code || vs == v.packageCode);
        if (product[0]) {
          showProducts.push(product[0]);
        }
      });
      if (showProducts.length == 0) {
        this.$toast.show('没有查询到后台配置的产品，请重新配置');
        return [];
      }
      return showProducts;
    } catch (error) {
      this.$toast.show('后台管理上架产品配置错误，请重新登陆');
      return [];
    }
  }
  toolbarLeftClick() {
    this.showAccountSettings = true;
  }
  logout() {
    clearConfig();
    // 通过跳转实现刷新，获取最新代码
    this.SET_PULL_VERSION({
      content: true
    });
    // this.$loading.show();
    this.$router.push({
      path: "/",
      query: {
        logout: 'true'
      }
    });
  }
  changePassword() {
    this.$router.push({
      path: "/changePassword"
    });
  }
  _setPackage(v: any) {
    this.CLEAR_PRODUCT();
    this.setProduct({
      content: {
        packageCode: v.packageCode,
        insureCompany: '',
        productCode: v.code,
        originalPremiumAmt: v.originalPremiumAmt,
        actualPremiumAmt: v.actualPremiumAmt,
        totalInsuredAmt: v.totalInsuredAmt
      }
    })
  }
  goProduct(v: any) {
    this._setPackage(v)

    logCode.debug('vv')
    logCode.debug(v)
    // logCode.debug(this.in)
    this.$router.push({
      path: '/detail',
      query: {
        code: v.code,
        packageCode: v.packageCode
      }
    })
  }
  toolbarRightClick() {
    this.$router.push({
      path: '/policy'
    })
  }
  created() {
    this.products = getProducts()

    this.fillInfo();
    // let isSitu = this.$route.query.isSitu;
    // if (isSitu != '1') {
    //   (window as any).SituRecorder = null;
    // }
  }
  mounted() {
    // console.log(switchHS,111111111);
    // console.log(getConfig());
    let promote = getConfig();
    if (promote && promote.tracBackFlag) {
      if (promote.tracBackFlag == 0) { // 是否可回溯开关 0关 1开
        this.switchHS = false;
        (window as any).SituRecorder = null;
      } else {
        this.switchHS = true;
      }
    }
    this.switchHS && (this.showDialog = true)
  }
  fillInfo(): boolean {
    let promote = getConfig();

    if (promote) {
      this.SET_TITLE({
        content: promote.promoteName
      })
      this.SET_NAME({
        content: promote.promoteName
      });
      this.SET_PROMOTE_INFO({
        content: {
          subChannelCode: promote.subChannelCode,
          promoteCode: promote.promoteCode,
          promoteName: promote.promoteName,
          salesCode: promote.salesCode,
          cooperateCode: promote.cooperateCode,
          airportCode: promote.airportCode
        }
      })

    } else {
      this.logout();
    }
    return false;
  }
}
