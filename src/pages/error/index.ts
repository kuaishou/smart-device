import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import PolicyErrorTip from '@/components/PolicyErrorTip.vue'
@Component({
  components: {
    PolicyErrorTip
  }
})
export default class Page extends Vue {
  @State insure!: FeiHang.InsureParam
  code: string = ''
  created() {
    this.code = this.$route.query.code || '001'
  }
  back() {
    this.$router.push({
      path: '/'
    })
  }
}
