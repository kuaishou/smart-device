import { Component, Vue } from 'vue-property-decorator';

Component.registerHooks(['beforeRouteLeave'])
@Component({
    components: {
        // Alert
    }
})
export default class Page extends Vue {
  
    errCode:string = '';
    payType:string = '';
    created() {
        // debugger
        this.errCode =  this.$route.query.errCode;
        this.payType =  this.$route.query.payType;
    }
    backCancel() {
        // this.$router.replace
        this.$router.replace({
          path:'/policy'  
        })
        // this.$router.back();
    }
   
}