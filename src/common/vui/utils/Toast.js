import ToastComponent from '../components/Toast/index.vue'
import Vue from 'vue';
let $vm
const Toast = Vue.extend(ToastComponent)
if (!$vm) {
    $vm = new Toast({
        el: document.createElement('div')
    })
    document.body.appendChild($vm.$el)
}
export default {
    show: (opt) => {
        $vm.show = true;
        if (typeof opt == 'string') {
            $vm.text = opt;
        }
    },
    hide: () => {
        $vm.show = false;
    }
}