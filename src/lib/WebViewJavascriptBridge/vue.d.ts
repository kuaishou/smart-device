import Vue from 'vue'
declare module 'vue/types/vue' {
    interface Vue {
       
        $bridge: {
            registerhandler:Function
            callhandler:Function
        }
       
    }
}