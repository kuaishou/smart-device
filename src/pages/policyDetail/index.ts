import { Component, Vue } from 'vue-property-decorator';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/policyDetail')
@Component({
  components: {
  }
})
export default class Page extends Vue {
  policy: any = {};

  created() {
    logCode.debug(this.$route)
    this.policy = this.$route.params.policy;

  }

}
