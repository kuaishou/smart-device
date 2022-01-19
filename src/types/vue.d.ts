// import { CommitOptions } from "vuex";
import Vue from "vue";
// declare module "vue/types/options" {
//     interface ComponentOptions<V extends Vue> {
//         $picker?:Function
//       }
// }
declare module 'vue/types/vue' {
    interface Vue {
        $datetime: {
            show:Function
            hide:Function
        }
       
    }
}
