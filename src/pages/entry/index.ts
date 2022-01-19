import { Component, Vue } from 'vue-property-decorator';
import Verify from '@/common/verify';
import { State, Mutation, Action } from 'vuex-class';
import { getProduct } from '@/data/productConfig';
import UDate from '@/utils/UDate';
import { normalDate, noNormalDate, hasInsured, getIDCard, getCustomerData } from '@/utils';
import MInput from '@/common/vui/components/MInput/index.vue'
import { ID_CARD_TYPE, PASSPORT_TYPE, OTHER_RELATION, OTHER_CERTIFICATES } from '@/constant';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/entry')
@Component({
  components: {
    MInput
  }
})
export default class Page extends Vue {
  @State('insure') insure!: FeiHang.InsureParam
  @Action addInsured!: (v: Payload) => 0
  product: any
  created() {
    this.product = getProduct(this.insure.product.productCode);
    if(this.product.code=='P133201'){
      this.insured.idcartType=ID_CARD_TYPE;
    }
    if(['P060152'].indexOf(this.product.code) > -1) {
      this.insured.bornDate=noNormalDate(UDate.addYear(UDate.now(0), -18),'yyyyMMdd');
    }
  }
  get bornDate() {
    return normalDate(this.insured.bornDate).format()
  }
  insured: InsuredParam = {
    bornDate: noNormalDate(UDate.addYear(UDate.now(0), -16),'yyyyMMdd'),
    idcartNo: "",
    idcartType: OTHER_CERTIFICATES,
    insuredName: "",
    mobile: "",
    releation: OTHER_RELATION,
    sex: "",
    // identifyExpiry:'',
    // residentialAddr:'',
    // authority:'',
    // nationalityCode:'',
    // nationalityName:'',
    // occupationCode:'',
    // occupationName:'',
    // occupationLeve:'',
    // occupationLevelName:'',
  }
  selectBornDate() {
    let vm = this;
    this.$datetime.show({
      value: this.bornDate,
      startDate: UDate.now(-100 * 365),
      endDate: ['P060152'].indexOf(this.product.code) > -1 ? UDate.now(-18 * 365) : UDate.now(0),
      onConfirm(val: any) {
        logCode.debug(val)
        vm.insured.bornDate = noNormalDate(val).substring(0, 8);
        logCode.debug('信息选择：', vm.insured.bornDate)
        // logCode.debug(vm.insured.bornDate)
      }
    })
  }
  verify() {
    logCode.debug(new Verify())
    return new Verify()

      .test(this.insured.insuredName)
      .name()

      // .test(this.insured.insuredEname)
      // .required('请输入投保人拼音')

      .test(this.insured.idcartNo)
      .idCard()
      .check(this.insured.idcartType == ID_CARD_TYPE)
      .or()
      .passport('请输入准确的护照号')
      .check(this.insured.idcartType == PASSPORT_TYPE)
      .or()
      .required('请输入证件号')
      .check(this.insured.idcartType != PASSPORT_TYPE && this.insured.idcartType != ID_CARD_TYPE)
      .test(this.insured.sex)
      .required('请选择性别')
      .check(this.insured.idcartType != ID_CARD_TYPE)
      // .errMsg('请输入性别')

      .test(this.insured.bornDate)
      .required('请输入出生日期')
      .check(this.insured.idcartType != ID_CARD_TYPE)
      // .errMsg('请输入出生日期')

      .test(this.insured.mobile)
      .phone()
      .check(this.insured.mobile != '')
      .test(this.insured.mail)
      .email()
      .check(this.insured.mail != '')
      .end((res: any) => {

        if (!res) {
          return false;
        }
        this.$toast.show(res[0]);
      })
  }
  goConfirm() {
    // this.insured
    if (this.verify()) {
      logCode.debug('填写信息', this.insured)
      if (hasInsured(this.insured.idcartNo, this.insure.insureds)) {
        this.$toast.show('该被保人已存在');

        return false;
      }

      this.insured.idcartNo = this.insured.idcartNo.toLocaleUpperCase()

      this.addInsured({
        content: getCustomerData(this.insured, '02')
      });
      this.$router.push({
        path: '/confirm'
      })
    }

  }
}
