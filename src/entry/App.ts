/*
 * @Author: ex_liangshengde@sinosafe.com.cn
 * @Date: 2019-07-17 15:44:10
 * @LastEditTime: 2019-08-10 08:37:51
 * @LastEditors: ex_liangshengde@sinosafe.com.cn
 * @Description: 描述
 */

import { Component, Vue, Watch } from 'vue-property-decorator';
import { getStorage, setStorage } from "@/utils";
import { mapState, mapMutations } from "vuex";
import Alert from "@/common/vui/components/Alert/index.vue";
import { printTerminalCount } from "@/api";
import { ELECTRICITY_CUE, NFC_LOGOUT, INIT_LISTEN,EVENT_LOGIN_POS, EVENT_PRINT, EVENT_PRINT_BILL, EVENT_PRINT_SUCCESS, EVENT_CALLBACK, EVENT_CALLBACK_OK, CACHE_IMEI_KEY, READ_CARD_DONE, ELECTRIC_PROGRESS, ELECTRIC_UP, ELECTRIC_DOWN } from "@/constant";
import { Mutation, State } from 'vuex-class/lib/bindings';
import LogCode from '@/lib/LogCore';
const logCode = new LogCode('App.ts---');

@Component({
    components: {
        Alert
    }
})
export default class Home extends Vue {
    @State toolbarLeftText!: string
    @State toolbarRightText!: string
    @State title!: string
    @State toolbarShow!: boolean
    
    @Mutation SET_IMEI!: (e: Payload) => 0;
    @Mutation SET_VERSION!: (e: Payload) => 0;
    confirmText:string = '';
    @Watch('$route')
    onRouteChange(){
        logCode.log('路由改变')
        this.$loading.hide();
    }
    created() {
        this.SET_IMEI({
            content: getStorage(CACHE_IMEI_KEY)
        });
        // LogCode.log("LogCode.log")
        // LogCode.debug("LogCode.debug")
        // LogCode.warn("LogCode.warn")
        // LogCode.error("LogCode.error")

        this.connectWebViewJavascriptBridge((bridge: any) => {
            bridge.init(function (message: any, responseCallback: Function) { });

            this.$bus.$on(NFC_LOGOUT, function () {
                bridge.callHandler(NFC_LOGOUT);
            });
            this.$bus.$on(INIT_LISTEN, function () {
                bridge.callHandler(INIT_LISTEN);
            });

            this.$bus.$on(EVENT_PRINT, function (data: any) {
                
                logCode.log("打印数据", data);
                
                console.log(data)
                bridge.callHandler(EVENT_PRINT, data);
            });
            // 更新安装包
             this.$bus.$on(EVENT_LOGIN_POS, function (data: any) {
                
                logCode.log("更新安装包", data);
                bridge.callHandler(EVENT_LOGIN_POS, data);
            });
            this.$bus.$on(EVENT_PRINT_BILL, function (data: any) {
                logCode.log("打印统计", data);
                bridge.callHandler(EVENT_PRINT_BILL, data);
            });
            this.$bus.$on(ELECTRIC_PROGRESS, (data: any) => {
                logCode.debug('电量提示',data);
                // {\"electricity\"：\"20\",\"type\":\"down\"}
                if (data.type == ELECTRIC_UP) {
                    this.showElectricTip = false;
                } else if (data.type == ELECTRIC_DOWN) {
                    if(data.electricity == 10){
                        
                        this.electricTip = ELECTRICITY_CUE['001'];
                        this.confirmText ='';
                    }else if(data.electricity == 20){
                        this.electricTip = ELECTRICITY_CUE['002'];
                        this.confirmText ='确定';
                    }
                    this.showElectricTip = true;
                }


            })
         

            bridge.registerHandler(EVENT_PRINT_SUCCESS, (data: any, responseCallback: Function) => {
                data = JSON.parse(data);
                logCode.debug("打印成功=", data);
                this.addPrintPolicyAppNoCount(data);
            });
            bridge.registerHandler(ELECTRIC_PROGRESS, (data: any, responseCallback: Function) => {
                logCode.debug('收到电量',data)
                data = JSON.parse(data);
                logCode.debug('格式化',data)
                this.$bus.$emit(ELECTRIC_PROGRESS, data);
            })
            bridge.registerHandler(EVENT_CALLBACK, (data: any, responseCallback: Function) => {
                data = JSON.parse(data);
                logCode.log("收到funcJS");
                if (data.type == EVENT_CALLBACK_OK) {
                    this.$bus.$emit(READ_CARD_DONE, data);
                } else if (data.imei) {
                    setStorage(CACHE_IMEI_KEY, data.imei);
                    this.SET_IMEI({
                        content: data.imei
                    });
                    this.SET_VERSION({
                        content: data.version
                    });
                } else if (!!data.type) {
                    logCode.log("收到安卓事件", data);
                    this.$bus.$emit(data.type, data);
                }
            });
        });

    }
    toolbarLeftClick() {
        let page: any = this.$refs.Page
        if (page.toolbarLeftClick) {
            page.toolbarLeftClick();
        } else {
            this.$router.back();
        }
    }
    toolbarRightClick() {
        let page: any = this.$refs.Page
        if (page.toolbarRightClick) {
            page.toolbarRightClick();
        }
    }
    addPrintPolicyAppNoCount(data: Array<any>) {
        data.forEach(v => {
            printTerminalCount({
                policyAppNo: v
            });
        });
    }
    electricTip: string = ELECTRICITY_CUE['001'];
    showElectricTip: boolean = false
    connectWebViewJavascriptBridge(callback: Function) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener(
                "WebViewJavascriptBridgeReady",
                function () {
                    callback(WebViewJavascriptBridge);
                },
                false
            );
        }
    }

}
