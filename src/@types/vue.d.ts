// import { CommitOptions } from "vuex";
import Vue from "vue";

// import wx from '@/common/wechat/index.d';
import { wxUitls } from "@/common/wechat";
import {LoadingUtils} from "@/common/ui/loading";
import {ToastUtils} from "@/common/ui/toast";
import { AlertUtils } from "@/common/vui/plugins/Alert/alert";


declare module 'vue/types/vue' {

    interface Vue {
        $datetime: {
            show: Function
            hide: Function
        }
        $bus:any
        $loading: LoadingUtils
        $toast: ToastUtils
        $alert: AlertUtils
        $dialog: {
            show: Function
            hide: Function
        }
        $wx: wxUitls
    }
}
