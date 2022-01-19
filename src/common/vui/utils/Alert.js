import DialogComponent from '../components/MDialog/index.vue'
import Vue from 'vue';
let $vm

const Dialog = Vue.extend(DialogComponent)
if (!$vm) {
    $vm = new Dialog({
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