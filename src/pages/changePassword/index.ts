/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-01-17 17:34:22
 * @LastEditTime: 2019-08-12 15:36:26
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import api, {  terminalManage } from '@/api';

import Alert from '@/common/vui/components/Alert/index.vue'
import Verify from '@/common/verify';
import { removeStorage, clearConfig, getConfig } from '@/utils';
const md5 = require('md5')
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('pages/changePassword')
import texts from '@/config/texts';
type changFormData = {
    password: string
    newPassword: string
    newConfirmPassword: string
}
Component.registerHooks(['beforeRouteLeave'])
@Component({
    components: {
        Alert
    }
})

export default class Page extends Vue {
    @State cancelPolicy!: Array<any>
    @Getter promoteCode!: string;
    // changeSuccess:boolean = false;
    // promotePassword: string = ''
    // promoteNewPassword: string = ''
    // promoteNewConfirmPassword: string = ''
    changForm: changFormData = {
        password: '',
        newPassword: '',
        newConfirmPassword: '',
    }
    created() {
        logCode.debug('created', this.cancelPolicy)
        if(!getConfig('promoteName')){
            this.backHome();
        }
    }
    backHome(){
        this.$router.push({
            path: '/',
            query:{
                backExit:'true'
            }
        })
    }
    destroyed() {
        api.cancel('terminalManage')
    }
    async  changePassword() {
        if (this.verify()) {
            // const hash = crypto.createHash('md5');
            // hash.update(this.changForm.newPassword);
            // hash.update(this.changForm.password);
            let newPassWord = md5(this.changForm.newPassword).toLocaleUpperCase();
            // hash./
            // hash.update(this.changForm.password);
            let passWord = md5(this.changForm.password).toLocaleUpperCase();
            let res = await terminalManage({
                newPassWord,
                passWord,
                userCode: getConfig('promoteCode')

            }).catch(res => {
                this.$toast.show(res.errMsg||texts.error);
              })
            if (res.errCode == 0) {
                clearConfig();
                this.$alert.show({
                    width:'80%',
                    iconType:'icon-success',
                    content:'修改成功',
                    confirmText:'重新登录',
                    confirm:()=>{this.$alert.hide();this.backHome()}
                })
                // this.changeSuccess = true;
                // this.$toast.show(texts.changeSccess);
              //  setTimeout(() => {
                  
                  
              //  }, 2000)

            } else {
                this.$toast.show(res.errMsg || texts.fail);
            }
        }
    }
    verify() {
        // return true;
        return new Verify()
            .test(this.changForm.password)
            .required('请输入原密码')
            .test(this.changForm.newPassword)
            .required('请输入新密码')

            .test(this.changForm.newConfirmPassword)
            .required('请输入确认密码')
            .equals(this.changForm.newPassword, '确认密码和新密码不对')
            .end((res: any) => {
                if (!res) {
                    return false;
                }
                this.$toast.show(res[0]);
            });

    }
}