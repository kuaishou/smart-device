import LoadingComponent from '../components/Loading/index.vue'
import Vue from 'vue';
let $vm

const Loading = Vue.extend(LoadingComponent)
if (!$vm) {
    $vm = new Loading({
        el: document.createElement('div')
    })
    document.body.appendChild($vm.$el)
}
export default {
    show: () => {
        
        $vm.show = true;
        // debugger
    },
    hide: () => {
        $vm.show = false;
    }
}