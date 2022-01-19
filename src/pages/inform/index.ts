/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-13 22:27:33
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue } from 'vue-property-decorator';
import { State,Mutation} from 'vuex-class'
import Alert from '@/common/vui/components/Alert/index.vue'
import { baseUrl ,cdnUrl} from '@/common/config/env';
@Component({
    components: {
        Alert
        // MScroll
    }
})
export default class Page extends Vue {
    @State insure!: FeiHang.InsureParam;
    @Mutation REMOVE_INSURED_BY_INDEX!: (v: Payload) => 0;
    /**
     * 投保告知内容
     */
    html:any
    /**
     * 支付号
     */
    applyNo:any
    
    created() {
        this.html=require('../../assets/file/P133201/healthy.js');
        this.applyNo=this.$route.query.applyNo;
    }
    goPay(){
        window.location.href=baseUrl+"/pay/m/index.html?applyNo="+this.applyNo
    }
    alertshow() {
        this.$alert.show({
          content: '很抱歉被保人的情况不符合承保条件，感谢您关注华安保险，祝您旅途愉快！',
          width: '80%',
          confirm: () => {
            this.$alert.hide();
          },
          confirmText: '确定',
          iconType: 'icon-tip'
        })
      }

}